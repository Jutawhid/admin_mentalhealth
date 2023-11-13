import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { I18nProvider } from '../_jutemplate/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_jutemplate/layout/core'
import { MasterInit } from '../_jutemplate/layout/MasterInit'
import AuthInit from './modules/auth/redux/AuthInit'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <ToastContainer />
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export { App }
