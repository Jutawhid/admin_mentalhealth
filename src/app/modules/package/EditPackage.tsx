import React, { useState, useEffect } from "react";
import { PageTitle } from "../../../_jutemplate/layout/core";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import PackageAPI from "../../../api/package/packageAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const initialValues = {
  title: "",
  duration: null,
  price: null,
  discountAmount: null,
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
    //   return parseInt(value) > 0;
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

export const EditPackage: React.FC = () => {
  const [packageDetails, setPackageDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      //console.log(values);
      setButtonLoading(true);
      PackageAPI.updatePackage(packageDetails.id, values as any).then(
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
            setSubmitting(false);
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
    },
  });

  const getDetails = (id: number) => {
    setLoading(true);

    PackageAPI.getPackageDetail(id).then(
      (res: any) => {
        if (res.data.success === true) {
          setPackageDetails(res.data.data);
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

  //form field reset using formik resetForm function
  const handleReset = () => {
    formik.resetForm();
  };

  useEffect(() => {
    let url = window.location.href;
    var id = parseInt(url.substring(url.lastIndexOf("/") + 1));
    //console.log(id)
    getDetails(id);
  }, []);

  useEffect(() => {
    if (Object.keys(packageDetails).length !== 0) {
      setLoading(false); //set loading set false when moduleDetails Isnot empty
      initialValues.title = packageDetails.title;
      initialValues.duration = packageDetails.duration;
      initialValues.price = packageDetails.price;
      initialValues.discountAmount = packageDetails.discount_amount;
    }
  }, [packageDetails]);

  return (
    <>
      <PageTitle>Update Package</PageTitle>
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
                  autoComplete="off"
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
                  Duration
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  id="duration"
                  placeholder="Enter Duration Day"
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
                  placeholder="Enter Discount Amount "
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
