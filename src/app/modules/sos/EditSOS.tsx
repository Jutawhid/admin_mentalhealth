import React, { useState, useEffect } from "react";
import { PageTitle } from "../../../_jutemplate/layout/core";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import sosAPI from "../../../api/sos/sosAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const initialValues = {
  title: "",
  number: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    // .matches(/^[a-zA-Z]/, "Title must be start with alphabet character")
    .required("Title is required"),
    // .min(2, "Title must be greater than or equal 2 character")
    // .max(50, "Title must be less than 50 character"),
  number: Yup.string()
    // .matches(
    //   /^[0-9]+$/,
    //   "Number must be numeric value ! No alphabet character and special character allowed"
    // )
    .required("Number is required"),
});

export const EditSOS: React.FC = () => {
  const [buttonLoading, setbuttonLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      //console.log(values);
      setbuttonLoading(true);
      sosAPI.updateSOS(details.id, values).then(
        (res: any) => {
          setbuttonLoading(false);
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
          setbuttonLoading(false);
          toast.error(err?.response?.data?.message, {
            theme: "dark",
          });
        }
      );
    },
  });

  const getDetails = (id: number) => {
    setLoading(true);

    sosAPI.getSOSDetail(id).then(
      (res: any) => {
        if (res.data.success === true) {
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
      initialValues.number = details.number;
    }
  }, [details]);

  //console.log("formik values",formik.values);
  //form field reset using formik resetForm function
  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <>
      <PageTitle>Update SOS</PageTitle>
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
                  autoComplete="off"
                  placeholder="Enter Title"
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

              <div className="form-group mt-5">
                <label htmlFor="number" className="required">
                  Number
                </label>
                <input
                  type="text"
                  id="question"
                  autoComplete="off"
                  placeholder="Enter Number "
                  {...formik.getFieldProps("number")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid",
                    {
                      "is-invalid":
                        formik.touched.number && formik.errors.number,
                    },
                    {
                      "is-valid":
                        formik.touched.number && !formik.errors.number,
                    }
                  )}
                />

                {formik.touched.number && formik.errors.number && (
                  <div className="fv-plugins-message-container mt-2 mb-5">
                    <div className="fv-help-block">
                      <span role="alert" className="error text-danger">
                        {formik.errors.number}
                      </span>
                    </div>
                  </div>
                )}
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
