import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_jutemplate/layout/core'
import ParentPage from "./parents/ParentsPage";
import AllAdminPage from './admins/AllAdminPage';
import ChildPage from './childs/ChildsPage';
import * as React from 'react'

const chatBreadCrumbs: Array<PageLink> = [
  {
    title: 'Parents',
    path: '/user/',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },

]
const UserPage: React.FC = () => {

  return (
    <> 
      <Routes>
        {/*<Route element={<Outlet />}>*/}
        <Route
          path='parents/*'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Parents</PageTitle>
              <ParentPage />
            </>
          }
        />

        <Route
          path='childs/*'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Child</PageTitle>
              <ChildPage />
            </>
          }
        />

        <Route
          path='admins/*'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>All Admin</PageTitle>
              <AllAdminPage />
            </>
          }
        />

        <Route index element={<ParentPage/>} />
        {/*</Route>*/}
      </Routes>
    </>
  )
}

export default UserPage;