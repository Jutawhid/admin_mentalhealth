import React, { useState, useEffect } from "react";
import { PageTitle } from "../../../_jutemplate/layout/core";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import skillAPI from "../../../api/skill/skillAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { imageValidation } from "../../utility/customValidation/fileValidation";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const initialValues = {
  title: "",
  image: "",
  role_id: [],
};

const ParentSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[a-zA-Z]/, "Title must be start with alphabet character")
    .required("Title is required")
    .min(2, "Title must be greater than 2 character")
    .max(50, "Title must be less than 50 character"),
});
const roleOptions = [
  { value: 4, label: "teen" },
  { value: 3, label: "Parent" },
];
export const EditSkill: React.FC = () => {
  const [skillDetails, setSkillDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string>("");
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [defaultRoleOptions, setDefaultRoleOptions] = useState<any>([]);
  const animatedComponents = makeAnimated();
  const [details, setDetails] = useState<any>({});
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ParentSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      //console.log(values);

      if (!imageError) {
        const formData = new FormData();
        setButtonLoading(true);
        values.role_id.forEach((val: any) => {
          formData.append("role_id", val.toString());
        });

        formData.append("id", skillDetails.id);
        formData.append("title", values.title);
        formData.append("image", values.image);

        skillAPI.updateSkill(formData as any).then(
          (res: any) => {
            setButtonLoading(false);
            if (res.data.success === true) {
              formik.resetForm();
              navigate("../");
              toast.success(res?.data?.message, {
                theme: "dark",
              });
            } else {
              setStatus(res.data.message);
              toast.error(res?.data?.message, {
                theme: "dark",
              });
            }
          },
          (err: any) => {
            setButtonLoading(false);
            toast.error(err?.response?.data?.message, {
              theme: "dark",
            });
          }
        );
      }
    },
  });

  //form field reset using formik resetForm function
  const handleReset = () => {
    formik.resetForm();
    const role = details.roleDetails.map((val: any) => {
      return {
        value: val.id,
        label: val.title,
      };
    });
    setDefaultRoleOptions(role);
    const role_id = role.map((val: any) => val.value);
    formik.setFieldValue("role_id", role_id);
  };

  // not required field onChange image validation start
  const fileChangeHandler = (e: any) => {
    if (e.target.files.length >= 0) {
      const file = e.target.files[0];

      setImage(file);
      const err = imageValidation(
        file.type,
        file.size,
        ["image/jpg", "image/jpeg", "image/png"],
        2000000
      );

      if (err) {
        setImageError(err);
      } else {
        setImageError("");
        formik.setFieldValue("image", file);
      }
    } else {
      setImage("");
    }
  };

  useEffect(() => {
    if (!image) {
      setImageError("");
    }
  }, [image]);

  // not required field onChange image validation end

  const getDetails = (id: number) => {
    setLoading(true);

    skillAPI.getSkillDetail(id).then(
      (res: any) => {
        if (res.data.success === true) {
          setSkillDetails(res.data.data);
        } else {
          toast.error(res.data.message, {
            theme: "dark",
          });
        }
      },
      (err: any) => {
        if (err?.response?.data?.success === false) {
          setLoading(false);
          toast.error(err?.response?.data?.message, {
            theme: "dark",
          });
        }
      }
    );
  };

  useEffect(() => {
    let url = window.location.href;
    var id = parseInt(url.substring(url.lastIndexOf("/") + 1));
    //console.log(id)
    getDetails(id);
  }, []);

  useEffect(() => {
    if (Object.keys(skillDetails).length !== 0) {
      setLoading(false); //set loading set false when moduleDetails Isnot empty
      initialValues.title = skillDetails.title;
      const initialRoleOption = skillDetails.roleDetails.map((val: any) => {
        return {
          value: val.id,
          label: val.title,
        };
      });

      setDefaultRoleOptions(initialRoleOption);
      const initialRoleOptionId = initialRoleOption.map(
        (val: any) => val.value
      );
      formik.setFieldValue("role_id", initialRoleOptionId);
    }
  }, [skillDetails]);

  const selectValueChange = (value: any) => {
    //console.log(value)
    const role_id = value.map((val: any) => val.value);
    formik.setFieldValue("role_id", role_id);
    setDefaultRoleOptions(value);
  };
  return (
    <>
      <PageTitle>Update Skill Set</PageTitle>
      {/* card start */}
      {loading ? (
        <Loading />
      ) : (
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
              <div className="row mt-3">
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

                <div className="form-group col-md-6">
                  <label htmlFor="image">Skill Image</label>
                  <input
                    type="file"
                    id="image"
                    placeholder=" image"
                    onChange={fileChangeHandler}
                    className="form-control form-control-lg form-control-solid"
                  />
                  <p className="text-danger">{imageError ? imageError : ""}</p>
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
                    <span className="indicator-label">Update</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* card end */}
    </>
  );
};
