import React, { useState,useRef } from "react";
import { PageTitle } from "../../../_jutemplate/layout/core";
import * as Yup from "yup";
import clsx from "clsx";
import Select from "react-select";
import { useFormik } from "formik";
import courseAPI from "../../../api/course/courseAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import makeAnimated from "react-select/animated";
import "../../../_jutemplate/assets/css/custom.css";
import JoditEditor from 'jodit-react';
import { configEditor } from "../../utility/textEditorConfig";

const initialValues = {
  title: "",
  details: "",
  image: "",
  roleId: [],
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[a-zA-Z]/, "Title must be start with alphabet character")
    .required("Title is required")
    .min(2, "Title must be greater than or equal 2 character"),
    // .max(50, "Title must be less than 50 character"),
  roleId: Yup.array().min(1, "At least one Role is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "Unsupported File Size ! only  2 Mb image is required",
      (value) => {
        console.log(value);
        return value && value.size <= 2000000;
      }
    )
    .test(
      "fileType",
      "Unsupported File Format ! only png , jpg and jpeg required",
      (value) => {
        console.log(value);
        return (
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
        );
      }
    ),
});

const roleOptions = [
  { value: "4", label: "teen" },
  { value: "3", label: "Parent" },
];

export const AddNewCourse: React.FC = () => {
  const [buttonLoading, setbuttonLoading] = useState<boolean>(false);
  const [defaultRoleOptions, setDefaultRoleOptions] = useState<any>();
  const editor = useRef(null);
  const [ contentDetails, setContentDetails ] = useState<string>('')

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: (values) => {
      // console.log(values);
      // console.log(values.roleId);
      setbuttonLoading(true);
      const formData = new FormData();

      values.roleId.forEach((val: any) => {
        formData.append("role_id", val.toString());
      });

      formData.append("title", values.title);
      formData.append("details", values.details);
      formData.append("image", values.image);

      courseAPI.addNewCourse(formData as any).then(
        (res: any) => {
          setbuttonLoading(false);
          if (res?.data?.success === true) {
            formik.resetForm();
            navigate("../");
            toast.success(res?.data?.message, {
              theme: "dark",
            });
          } else {
            toast.error(res?.data?.message, {
              theme: "dark",
            });
          }
          //console.log(res)
        },
        (err: any) => {
          setbuttonLoading(false);
          toast.error(err?.response?.data?.message, {
            theme: "dark",
          });
        }
      );
    },
  });
  //console.log("formik values",formik.values);
  const fileChangeHandler = (e: any) => {
    if (e.target.files.length >= 0) {
      const file = e.target.files[0];
      formik.setFieldValue("image", file);
    }
  };
  //form field reset using formik resetForm function
  const handleReset = () => {
    formik.resetForm();
    setDefaultRoleOptions(null);
  };

  const selectValueChange = (value: any) => {
    const roleId = value.map((val: any) => val.value);
    formik.setFieldValue("roleId", roleId);
    setDefaultRoleOptions(value);
  };

  
  const handleDetailsChange = (contentDetails:string)=>{
    setContentDetails(contentDetails)
    formik.setFieldValue('details',contentDetails)
  }


  return (
    <>
      <PageTitle>Add Course</PageTitle>

      <div className="card shadow-sm py-8">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="required">
                Title
              </label>

              <textarea
                rows={4}
                placeholder="Enter Course Title"
                {...formik.getFieldProps("title")}
                className={clsx(
                  "form-control form-control-lg form-control-solid",
                  {
                    "is-invalid": formik.touched.title && formik.errors.title,
                  },
                  {
                    "is-valid": formik.touched.title && !formik.errors.title,
                  }
                )}
              />

              {formik.touched.title && formik.errors.title && (
                <div className="fv-plugins-message-container mt-2">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.title}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className=" row mt-5">
              <div className="form-group col-md-6">
                <label htmlFor="workshopTypeId" className="required">
                  Role
                </label>
                <Select
                  isClearable
                  isMulti
                  value={defaultRoleOptions}
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={roleOptions}
                  onChange={selectValueChange}
                  className="mt-1"
                />
                {formik.touched.roleId && formik.errors.roleId && (
                  <div className="fv-plugins-message-container mt-2">
                    <div className="fv-help-block">
                      <span role="alert" className="error text-danger">
                        {formik.errors.roleId}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group col-md-6 form-m-top_upto_md">
                <label htmlFor="image" className="required">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  //onBlur={formik.handleBlur}
                  onChange={fileChangeHandler}
                  className={clsx(
                    "form-control form-control-lg form-control-solid",
                    {
                      "is-invalid": formik.touched.image && formik.errors.image,
                    },
                    {
                      "is-valid": formik.touched.image && !formik.errors.image,
                    }
                  )}
                />

                {formik.touched.image && formik.errors.image && (
                  <div className="fv-plugins-message-container mt-2">
                    <div className="fv-help-block">
                      <span role="alert" className="error text-danger">
                        {formik.errors.image}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group mt-5">
              <label htmlFor="details">Details</label>
              {/* <textarea
                rows={3}
                id="details"
                placeholder="Enter Details"
                {...formik.getFieldProps("details")}
                className="form-control form-control-lg form-control-solid"
              /> */}
               <JoditEditor
                                    ref={editor}
                                    value={contentDetails}
                                    config={configEditor}
                                    // tabIndex={1} // tabIndex of textarea
                                    // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                    onChange={(newContent) => {handleDetailsChange(newContent)}}
                                />
            </div>

            <div className="d-flex justify-content-end mt-5">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-md btn-danger me-4 "
              >
                Reset
              </button>
              <button
                type="submit"
                id="kt_sign_in_submit"
                className="btn btn-md btn-primary "
                disabled={buttonLoading ? true : false}
                //style={{ backgroundColor: '#000000' }}
                // disabled={formik.isSubmitting || !formik.isValid}
              >
                {buttonLoading ? (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                ) : (
                  <span className="indicator-label">Submit</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
