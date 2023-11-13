import React, { useState, useEffect } from "react";
import { PageTitle } from "../../../_jutemplate/layout/core";
import * as Yup from "yup";
import clsx from "clsx";
import Select from "react-select";
import { useFormik } from "formik";
import dailyTipsAPI from "../../../api/dailyTips/dailyTipsAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import makeAnimated from "react-select/animated";
import Loading from "../../components/Loading";
import moment from "moment";
import { imageValidation } from "../../utility/customValidation/fileValidation";

const initialValues = {
  title: "",
  details: "",
  image: "",
  publishDate: "",
  role_id: [],
};
const today = new Date();

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[a-zA-Z]/, "Title must be start with alphabet character")
    .required("Title is required")
    .min(2, "Title must be greater than 2 character")
    .max(50, "Title must be less than 50 character"),
  details: Yup.string()
    .required("Details is required")
    .min(10, "Must be greater than 10 character"),
  publishDate: Yup.string()
    .required("Publish Date is required")
    .test(
      "publishDate",
      "Please select the current year or a year within next 5 year ",
      (value: any) => {
        //console.log(value);
        if (value) {
          const date = moment(value).format("yyyy-MM-DD");

          const userInputYear: number = parseInt(date.split("-")[0]);
          if (
            today.getFullYear() <= userInputYear &&
            today.getFullYear() + 5 >= userInputYear
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    )
    .test(
      "publishDate",
      "Please select today or upcoming days",
      (value: any) => {
        if (value) {
          const date = moment(value).format("yyyy-MM-DD");

          const userInputDate: number = parseInt(date.split("-")[2]);
          const userInputMonth: number = parseInt(date.split("-")[1]);
          const userInputYear: number = parseInt(date.split("-")[0]);

          if (today.getFullYear() < userInputYear) {
            return true;
          } else if (
            today.getMonth() + 1 < userInputMonth &&
            today.getFullYear() === userInputYear
          ) {
            return true;
          } else if (
            today.getMonth() + 1 === userInputMonth &&
            today.getDate() <= userInputDate &&
            today.getFullYear() === userInputYear
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    ),
  role_id: Yup.array().min(1, "At least one role is required"),
});

const roleOptions = [
  { value: 4, label: "teen" },
  { value: 3, label: "parent" },
];

export const EditDailyTips: React.FC = () => {
  const [buttonLoading, setbuttonLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<any>({});
  const [defaultRoleOptions, setDefaultRoleOptions] = useState<any>([]);
  const [imageError, setImageError] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: (values, { setStatus, setSubmitting }) => {
      console.log(values);

      if (!imageError) {
        setbuttonLoading(true);
        const formData = new FormData();

        values.role_id.forEach((val: any) => {
          formData.append("role_id", val.toString());
        });

        formData.append("id", details.id);
        formData.append("title", values.title);
        formData.append("details", values.details);
        formData.append("image", values.image);
        formData.append("publish_date", values.publishDate);

        dailyTipsAPI.updateDailyTips(formData as any).then(
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
          },
          (err: any) => {
            setbuttonLoading(false);
            toast.error(err?.response?.data?.message, {
              theme: "dark",
            });
          }
        );
      }
    },
  });

  const getDetails = (id: number) => {
    setLoading(true);

    dailyTipsAPI.getDailyTipsDetails(id).then(
      (res: any) => {
        if (res.data.success === true) {
          console.log(res.data.data);
          setDetails(res.data.data);
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
    getDetails(id);
  }, []);

  useEffect(() => {
    if (Object.keys(details).length !== 0) {
      setLoading(false);
      initialValues.title = details.title;
      initialValues.details = details.details;
      initialValues.publishDate = moment(details.published_date).format(
        "yyyy-MM-DD"
      );
      const initialRoleOption = details.roleDetails.map((val: any) => {
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
  }, [details]);

  // not required field onChange image validation start
  const fileChangeHandler = (e: any) => {
    if (e.target.files.length >= 0) {
      const file = e.target.files[0];
      setImage(file);
      console.log(file);
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

  //form field reset using formik resetForm function
  const handleReset = () => {
    formik.resetForm();
    const initialRoleOption = details.roleDetails.map((val: any) => {
      return {
        value: val.id,
        label: val.title,
      };
    });
    setDefaultRoleOptions(initialRoleOption);
    const initialRoleOptionId = initialRoleOption.map((val: any) => val.value);
    formik.setFieldValue("role_id", initialRoleOptionId);
  };

  const selectValueChange = (value: any) => {
    console.log(value);
    setDefaultRoleOptions(null);
    setDefaultRoleOptions(value);
    const selectRole = value.map((val: any) => val.value);
    formik.setFieldValue("role_id", selectRole);
  };

  return (
    <>
      <PageTitle>Update Daily Tips</PageTitle>
      {loading ? (
        <Loading />
      ) : (
        <div className="card shadow-sm py-8">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className=" row mt-5">
                <div className="form-group col-md-6 ">
                  <label htmlFor="title" className="required">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter Title Name"
                    {...formik.getFieldProps("title")}
                    className={clsx(
                      "form-control form-control-lg form-control-solid",
                      {
                        "is-invalid":
                          formik.touched.title && formik.errors.title,
                      },
                      {
                        "is-valid":
                          formik.touched.title && !formik.errors.title,
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

                <div className="form-group col-md-6 ">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    id="image"
                    //onBlur={formik.handleBlur}
                    onChange={fileChangeHandler}
                    className="form-control form-control-lg form-control-solid"
                  />
                  <p className="text-danger">{imageError ? imageError : ""}</p>
                </div>
              </div>

              <div className="form-group mt-5">
                <label htmlFor="details" className="required">
                  Details
                </label>
                <textarea
                  rows={3}
                  id="details"
                  placeholder="Enter Details"
                  {...formik.getFieldProps("details")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid",
                    {
                      "is-invalid":
                        formik.touched.details && formik.errors.details,
                    },
                    {
                      "is-valid":
                        formik.touched.details && !formik.errors.details,
                    }
                  )}
                />

                {formik.touched.details && formik.errors.details && (
                  <div className="fv-plugins-message-container mt-2">
                    <div className="fv-help-block">
                      <span role="alert" className="error text-danger">
                        {formik.errors.details}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="row mt-5">
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
                  <label htmlFor="publishDate" className="required">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    id="publishDate"
                    {...formik.getFieldProps("publishDate")}
                    className={clsx(
                      "form-control form-control-lg form-control-solid",
                      {
                        "is-invalid":
                          formik.touched.publishDate &&
                          formik.errors.publishDate,
                      },
                      {
                        "is-valid":
                          formik.touched.publishDate &&
                          !formik.errors.publishDate,
                      }
                    )}
                  />

                  {formik.touched.publishDate && formik.errors.publishDate && (
                    <div className="fv-plugins-message-container mt-2 mb-5">
                      <div className="fv-help-block">
                        <span role="alert" className="error text-danger">
                          {formik.errors.publishDate}
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
    </>
  );
};
