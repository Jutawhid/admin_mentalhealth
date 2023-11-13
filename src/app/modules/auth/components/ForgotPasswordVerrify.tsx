import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { forgetPassworVerrify } from '../redux/AuthCRUD'
import { resetPassword } from '../redux/AuthCRUD'
import { toast } from 'react-toastify'

const initialValues = {
  new_password: '',
  confirm_password: '',
}

const forgotPasswordSchema = Yup.object().shape({
  new_password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .max(50, 'Maximum 50 characters')
    .required('New Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Password do not match')
    .required('Confirm Password is required'),
})

export function ForgotPasswordVerrify() {
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string>('')

  const navigate = useNavigate()
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      //   setHasErrors(undefined)
      setTimeout(() => {
        resetPassword(values.new_password, values.confirm_password, token)
          .then(
            (res: any) => {
              if (res?.data?.success === true) {
                setLoading(false)
                formik.resetForm()
                // redirect to login page
                navigate('/')
                // success message
                toast.success(res?.data?.message, {
                  theme: 'dark',
                })
              } else {
                // setIsSuccess(false)
                toast.success(res?.data?.message, {
                  theme: 'dark',
                })
              }
            },
            (err: any) => {
              console.log(err)
              if (err?.response?.data?.success === false) {
                setLoading(false)
                setSubmitting(false)
              }
            },
          )
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })
      }, 100)
    },
  })

  useEffect(() => {
    let url = window.location.href
    var tokenData = url.substring(url.lastIndexOf('/') + 1)
    forgetPasswordVerrify(tokenData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setToken])

  const forgetPasswordVerrify = (tokenData: string) => {
    if (tokenData) {
      forgetPassworVerrify(tokenData).then(
        (res: any) => {
          //   console.log(res)
          if (res?.data?.success === true) {
            setToken(tokenData)
            // setIsSuccess(true)
          } else {
            // setIsSuccess(false)
            setToken('')
            toast.error(res?.data?.message, {
              theme: 'dark',
            })
          }
        },
        (err: any) => {
          if (err?.response?.data?.success === false) {
            setToken('')
            // setIsSuccess(false)
            navigate('/auth/forgot-password')
            toast.error(err?.response?.data?.message, {
              theme: 'dark',
            })
          }
        },
      )
    }
  }
  return (
    <>
      <form
        className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        noValidate
        id="kt_login_password_reset_form"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center mb-10">
          <h1 className="text-dark mb-3">Setup New Password</h1>
          <div className="text-gray-400 fw-bold fs-4">
            Already have reset your password ?
            <Link to="/" className="mx-1 link-primary fw-bolder">
              Sign in here
            </Link>
          </div>
        </div>

        {/* begin::Form group */}
        <>
          <div className="fv-row mb-10">
            <label className="form-label fw-bolder text-gray-900 fs-6">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              {...formik.getFieldProps('new_password')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid':
                    formik.touched.new_password && formik.errors.new_password,
                },
                {
                  'is-valid':
                    formik.touched.new_password && !formik.errors.new_password,
                },
              )}
            />
            {formik.touched.new_password && formik.errors.new_password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert" className="alert">
                    {formik.errors.new_password}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
          <div className="fv-row mb-10">
            <label className="form-label fw-bolder text-gray-900 fs-6">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Enter Confirm Password"
              autoComplete="off"
              {...formik.getFieldProps('confirm_password')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid':
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password,
                },
                {
                  'is-valid':
                    formik.touched.confirm_password &&
                    !formik.errors.confirm_password,
                },
              )}
            />
            {formik.touched.confirm_password && formik.errors.confirm_password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert" className="alert">
                    {formik.errors.confirm_password}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Form group */}
          <div className="d-flex flex-wrap justify-content-center pb-lg-0">
            <button
              type="submit"
              id="kt_password_reset_submit"
              className="btn btn-lg btn-primary fw-bolder me-4"
            >
              <span className="indicator-label">Submit</span>
              {loading && (
                <span className="indicator-progress">
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
            <Link to="/auth/login">
              <button
                type="button"
                id="kt_login_password_reset_form_cancel_button"
                className="btn btn-lg btn-light-primary fw-bolder"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Cancel
              </button>
            </Link>{' '}
          </div>
        </>
      </form>
    </>
  )
}
