import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_jutemplate/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
//import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import { DashBoard } from '../pages/NewDashboard'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from "../../_jutemplate/assets/ts/_utils";
import {MyPage} from "../pages/MyPage"

const PrivateRoutes = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const DataTableWrapper = lazy(() => import('../pages/data-table/dataTableWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const Users  = lazy(()=> import("../modules/users/UserPage"))
  const Module = lazy(()=> import("../modules/module"))
  const Skill = lazy(()=> import("../modules/skill") )
  const Package = lazy(()=> import("../modules/package"))
  const WorkshopPage = lazy(()=> import("../modules/workshop/WorkshopPage"))
  const GroupPage = lazy(()=> import("../modules/group/GroupPage"))
  const ExpertPage = lazy(()=> import("../modules/expert/ExpertPage"))
  // const ProfileUpdate = lazy(()=> import("../modules/profileNew/profileUpdate"))
  const QuizPage = lazy(()=> import("../modules/quiz"))
  const ConfigurationPage = lazy(()=> import("../modules/configuration"))
  const SOSPage = lazy(()=> import("../modules/sos"))
  const DailyTipsPage = lazy(()=> import("../modules/dailyTips"))
  const GamePage = lazy(()=> import("../modules/game"))
  const CoursePage = lazy(()=> import("../modules/course"))
  const AccountSetting = lazy(()=> import("../modules/profileNew"))


  //const AddNewParents =lazy(()=>import('../modules/users/parents/AddNewParent'));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashBoard/>} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        {/*<Route path='users' element={<MyPage />} />*/}
        <Route path="my-page" element={<MyPage />} />
        <Route path="games" element={<MyPage />} />
        <Route path="courses" element={<MyPage />} />
        <Route path="workshops" element={<MyPage />} />
        <Route path="experts" element={<MyPage />} />
        <Route path="groups" element={<MyPage />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
         {/* start kratos routing */}
        <Route
          path='users/*'
          element={
            <SuspensedView>
               <Users/>
            </SuspensedView>
          }
        />

         <Route
           path='module/*'
           element={
            <SuspensedView>
               <Module/>
            </SuspensedView>
          }
          />
         <Route
           path='skill/*'
           element={
            <SuspensedView>
               <Skill/>
            </SuspensedView>
          }
          />

          <Route
           path='package/*'
           element={
            <SuspensedView>
               <Package/>
            </SuspensedView>
          }
          />

         {/* <Route
           path='profile/update'
           element={
            <SuspensedView>
               <ProfileUpdate/>
            </SuspensedView>
          }
          />  */}

          <Route
              path='profile/account-setting/*'
              element={
              <SuspensedView>
                <AccountSetting/>
              </SuspensedView>
              }
          />

         <Route
            path='workshop/*'
            element={
            <SuspensedView>
                <WorkshopPage/>
            </SuspensedView>
            }
          />

          <Route
            path='group/*'
            element={
            <SuspensedView>
                <GroupPage/>
            </SuspensedView>
          }
          />

          <Route
            path='expert/*'
            element={
            <SuspensedView>
                <ExpertPage/>
            </SuspensedView>
          }
          />

          <Route
            path='quiz/*'
            element={
            <SuspensedView>
                <QuizPage/>
            </SuspensedView>
          }
          />

          <Route
            path='config/*'
            element={
            <SuspensedView>
                <ConfigurationPage/>
            </SuspensedView>
           }
          />

          <Route
            path='sos/*'
            element={
            <SuspensedView>
                <SOSPage/>
            </SuspensedView>
           }
          />
          <Route
            path='daily-tips/*'
            element={
            <SuspensedView>
                <DailyTipsPage/>
            </SuspensedView>
           }
          />

          <Route
             path='game/*'
             element={
            <SuspensedView>
                <GamePage/>
            </SuspensedView>
           }
          />

          <Route
             path='course/*'
             element={
            <SuspensedView>
                <CoursePage/>
            </SuspensedView>
           }
          />

         {/* <Route
            path='crop'
            element={
            <SuspensedView>
                <ImgCrop/>
            </SuspensedView>
           }
          />  */}

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<{ children: React.ReactNode }> = ({children}) => {
    const baseColor = getCSSVariableValue('--bs-primary')
    TopBarProgress.config({
        barColors: {
            '0': baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    });
    return <Suspense fallback={<TopBarProgress/>}>{children}</Suspense>
}

export {PrivateRoutes}
