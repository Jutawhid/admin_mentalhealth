/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import { Outlet, Route, Routes, Navigate } from 'react-router-dom'
import { Registration } from './components/Registration'
import { ForgotPassword } from './components/ForgotPassword'
import { Login } from './components/Login'
import { toAbsoluteUrl } from '../../../_jutemplate/helpers'
import { ForgotPasswordVerrify } from './components/ForgotPasswordVerrify'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div className="bgGradient">
      <div
        className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
        style={{
          backgroundImage: `url(${toAbsoluteUrl(
            // '/media/illustrations/sketchy-1/14.png',
            '/media/bgImage.svg'
          )})`,
          height: '100vh',
        }}
      >
        {/* begin::Content */}
        <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
          {/* begin::Logo */}
          {/* <a href="#" className="mb-12">
            <img
              alt="Logo"
              src={toAbsoluteUrl('/media/logos/logo-1.svg')}
              className="h-45px"
            />
          </a> */}
          {/* end::Logo */}
          {/* begin::Wrapper */}
          <div className="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Content */}
        {/* begin::Footer */}
        {/* <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a href='#' className='text-muted text-hover-primary px-2'>
            About
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact Us
          </a>
        </div>
      </div> */}
        {/* end::Footer */}
      </div>
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route
        path="forgot-password/:id"
        element={<ForgotPasswordVerrify />}
      />
      <Route index element={<Login />} />
      <Route path='/*' element={<Navigate to='/error/404' />} />
    </Route>
  </Routes>
)

export { AuthPage }
