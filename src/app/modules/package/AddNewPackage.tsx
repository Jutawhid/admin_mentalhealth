import React, { useState } from "react";
import { PageTitle } from "../../../_jutemplate/layout/core";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import PackageAPI from "../../../api/package/packageAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
  duration: "",
  price: "",
  discountAmount: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[a-zA-Z]/, "Title must be start with alphabet character")
    .required("Title is required")
    .min(2, "Title must be greater than or equal 2 character")
    .max(50, "Title must be less than 50 character"),
  duration: Yup.string()
    .matches(/^[0-9]+$/, "Please enter numeric value only")
    .required("Duration is required")
    .test("duration", "Duration must be less than 3 year", (value: any) => {
      return value <= 1095;
    }),
  price: Yup.string()
    .matches(/(^[0-9]+\.?[0-9]+$)|(^[0-9]+$)/, "Please enter valid number only")
    .required("Price is required")
    .max(10, "Price must be less than or equal 10 digit"),
    // .test("Price", "Price must be greater than 0 $", (value: any) => {
    //   return value >= "0";
    // }),
  discountAmount: Yup.string()
    .matches(/(^[0-9]+\.?[0-9]+$)|(^[0-9]+$)/, "Please enter valid number only")
    .required("Discount Amount is required")
    .max(10, "Discount Amount must be less than or equal 10 digit"),
    // .test(
    //   "discount",
    //   "Discount Amount must be less than actual price",
    //   (value: any, context: any) => {
    //     if (value && context.parent.price) {
    //       return parseInt(value) < parseInt(context.parent.price);
    //     } else {
    //       return false;
    //     }
    //   }
    // ),
});

export const AddNewPackage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      //console.log(values);
      setLoading(true);
      PackageAPI.addPackage(values as any).then(
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

  //form field reset using formik resetForm function
  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <>
      <PageTitle>Add Package</PageTitle>
      {/* card start */}
      <div className="card shadow-sm py-8">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="required">
                Title
              </label>
              <input
                autoComplete="off"
                type="text"
                id="title"
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
              <label htmlFor="duration" className="required">
                Duration (Day)
              </label>
              <input
                type="text"
                autoComplete="off"
                id="duration"
                placeholder="Enter Duration"
                {...formik.getFieldProps("duration")}
                className={clsx(
                  "form-control form-control-lg form-control-solid",
                  {
                    "is-invalid":
                      formik.touched.duration && formik.errors.duration,
                  },
                  {
                    "is-valid":
                      formik.touched.duration && !formik.errors.duration,
                  }
                )}
              />

              {formik.touched.duration && formik.errors.duration && (
                <div className="fv-plugins-message-container mt-2 mb-5">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.duration}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="form-group mt-5">
              <label htmlFor="price" className="required">
                Price $
              </label>
              <input
                type="text"
                autoComplete="off"
                id="price"
                step={1.5}
                placeholder="Enter Price "
                {...formik.getFieldProps("price")}
                className={clsx(
                  "form-control form-control-lg form-control-solid",
                  {
                    "is-invalid": formik.touched.price && formik.errors.price,
                  },
                  {
                    "is-valid": formik.touched.price && !formik.errors.price,
                  }
                )}
              />

              {formik.touched.price && formik.errors.price && (
                <div className="fv-plugins-message-container mt-2 mb-5">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.price}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="form-group mt-5">
              <label htmlFor="discountAmount" className="required">
                Discount Amount
              </label>
              <input
                type="text"
                autoComplete="off"
                id="discountAmount"
                placeholder="Discount Amount must be less than price value"
                {...formik.getFieldProps("discountAmount")}
                className={clsx(
                  "form-control form-control-lg form-control-solid",
                  {
                    "is-invalid":
                      formik.touched.discountAmount &&
                      formik.errors.discountAmount,
                  },
                  {
                    "is-valid":
                      formik.touched.discountAmount &&
                      !formik.errors.discountAmount,
                  }
                )}
              />

              {formik.touched.discountAmount && formik.errors.discountAmount && (
                <div className="fv-plugins-message-container mt-2 mb-5">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.discountAmount}
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
