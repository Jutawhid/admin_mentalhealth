import React, { useState } from "react";
import { PageTitle } from "../../../_jutemplate/layout/core";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import skillAPI from "../../../api/skill/skillAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const initialValues = {
  title: "",
  image: "",
  role_id: [],
};
//.min(2,'Title must be greater than 2 character').max(50,'Title must be less than 50 character'),
const ParentSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[a-zA-Z]/, "Title must be start with alphabet character")
    .required("Title is required")
    .min(2, "Title must be greater than 2 character")
    .max(50, "Title must be less than 50 character"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "Unsupported File Size ! only  2 Mb image is required",
      (value) => {
        return value && value.size <= 2000000;
      }
    )
    .test(
      "fileType",
      "Unsupported File Format ! only png , jpg and jpeg required",
      (value) => {
        return (
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
        );
      }
    ),
});
const roleOptions = [
  { value: 4, label: "Teen" },
  { value: 3, label: "Parent" },
];
export const AddNewSkill: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [defaultRoleOptions, setDefaultRoleOptions] = useState<any>([]);
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ParentSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      //console.log(values);
      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("image", values.image);
      values.role_id.forEach((val: any) => {
        formData.append("role_id", val.toString());
      });
      skillAPI.addSkill(formData as any).then(
        (res: any) => {
          setLoading(false);
          if (res.data.success === true) {
            formik.resetForm();
            navigate("../");
            toast.success(res?.data?.message, {
              theme: "dark",
            });
          } else {
            setStatus(res.data.message);
            setSubmitting(false);
            toast.error(res?.data?.message, {
              theme: "dark",
            });
          }
        },
        (err: any) => {
          setLoading(false);
          toast.error(err?.response?.data?.message, {
            theme: "dark",
          });
        }
      );
    },
  });
  //console.log("formik values",formik.values);
  //form field reset using formik resetForm function
  const handleReset = () => {
    formik.resetForm();
    setDefaultRoleOptions(null);
  };

  const fileChangeHandler = (e: any) => {
    if (e.target.files.length >= 0) {
      const file = e.target.files[0];
      formik.setFieldValue("image", file);
    }
  };

  const selectValueChange = (value: any) => {
    //console.log(value)
    setDefaultRoleOptions(value);
    const selectRole = value.map((val: any) => val.value);
    formik.setFieldValue("role_id", selectRole);
  };

  return (
    <>
      <PageTitle>Add Skill</PageTitle>
      {/* card start */}
      <div className="card shadow-sm py-8">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="required">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter Title "
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
                <div className="fv-plugins-message-container mt-2 mb-5">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.title}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className=" row mt-5">
            <div className="form-group mt-4 col-md-6">
              <label htmlFor="workshopTypeId" className="required">
                Role
              </label>
              <Select
                isMulti
                value={defaultRoleOptions}
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={roleOptions}
                onChange={selectValueChange}
              />
              {formik.touched.role_id && formik.errors.role_id && (
                <div className="fv-plugins-message-container mt-2">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.role_id}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="form-group mt-4 col-md-6">
              <label htmlFor="image" className="required">
                Skill Image
              </label>
              <input
                type="file"
                id="image"
                placeholder="image"
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
                <div className="fv-plugins-message-container mt-2 mb-5">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.image}
                    </span>
                  </div>
                </div>
              )}
            </div>
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
                disabled={loading ? true : false}

                //style={{ backgroundColor: '#000000' }}
                // disabled={formik.isSubmitting || !formik.isValid}
              >
                {loading ? (
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
      {/* card end */}
    </>
  );
};
