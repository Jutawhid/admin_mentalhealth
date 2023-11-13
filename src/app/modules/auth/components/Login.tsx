/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as auth from '../redux/AuthRedux'
import { login } from '../redux/AuthCRUD'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toAbsoluteUrl } from '../../../../_jutemplate/helpers/AssetHelpers'
import './auth.css'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 30 symbols')
    .email('Wrong email format')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 character required')
    .max(50, 'Maximum 50 character required')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setTimeout(() => {
        login(values.email, values.password)
          .then(
            (res) => {
              setLoading(false)
              let roleID = res?.data?.data?.role?.role_id
              if (roleID === 1 || roleID === 2) {
                if (res?.data?.data) {
                  let token = res?.data?.data?.token
                  // dispatch user
                  dispatch(auth.actions.login(token))
                } else {
                  console.log('adadad')
                  toast(res.data.message, {
                    theme: 'dark',
                  })
                }
                setStatus(res.data.message)
              } else {
                toast.warning("You dont have permission to access Admin panel",{
                  theme: 'dark'
                })
              }

              setSubmitting(false)
            },
            (err) => {
              setStatus(err.message)
              if (err.response.data.success === false) {
                toast.error(err.response.data.message, {
                  theme: 'dark',
                })
                setStatus(err.response.data.message)
              } else {
                toast.error('Service Unavailable', {
                  theme: 'dark',
                })
              }
              setSubmitting(false)
              setLoading(false)
            },
          )
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })
      }, 1000)
    },
  })

  return (
    <>
      {/* alert */}
      <ToastContainer />

      {/* form */}
      <form
        className="form w-100"
        onSubmit={formik.handleSubmit}
        noValidate
        id="kt_login_signin_form"
      >
        {/* begin::Heading */}
        <div className="text-center mb-10">
          <h1 className="text-dark mb-10">
            <img
              alt="Logo"
              src={toAbsoluteUrl('/media/logos/logo-1.svg')}
              className="h-30px"
            />
          </h1>
        </div>
        {/* begin::Heading */}

        {/* begin::Form group */}
        <div className="fv-row mb-10">
          <label className="form-label fs-6 fw-bolder text-dark">Email</label>
          <input
            placeholder="Email"
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.email && formik.errors.email },
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              },
            )}
            type="email"
            name="email"
            autoComplete="off"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="fv-plugins-message-container">
              <span role="alert" className="error text-danger">{formik.errors.email}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className="fv-row mb-10">
          <div className="d-flex justify-content-between mt-n5">
            <div className="d-flex flex-stack mb-2 w-100">
              {/* begin::Label */}
              <label className="form-label fw-bolder text-dark fs-6 mb-0">
                Password
              </label>
              {/* end::Label */}
              {/* begin::Link */}
              <Link
                to="/auth/forgot-password"
                className="link-primary fs-6 fw-bolder"
                style={{ marginLeft: '5px' }}
              >
                Forgot Password ?
              </Link>
              {/* end::Link */}
            </div>
          </div>
          <input
            type="password"
            autoComplete="off"
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              },
            )}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert" className="error text-danger">{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Action */}
        <div className="text-center">
          <button
            type="submit"
            id="kt_sign_in_submit"
            className="loginbtn w-100 mb-5"
            // disabled={formik.isSubmitting || !formik.isValid}
            disabled={ loading ? true : false }
          >
            { !loading && <span className="indicator-label">Login</span>}
            { loading && (
              <span className="indicator-progress" style={{ display: 'block' }}>
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Action */}
      </form>
    </>
  )
}
