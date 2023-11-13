/* eslint-disable react/jsx-no-target-blank */
import React,{ useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../helpers'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../../../setup/redux/RootReducer'


export function AsideMenuMain() {
  const [role,setRole]=useState<number>(0)
  const intl = useIntl()

  const userData: any = useSelector<RootState>(
    ({ auth }) => auth?.user,
    shallowEqual,

  )
  //console.log(userData.data.role.id);

  useEffect(() => {
    if (userData) {
      console.log(userData)
      setRole(userData?.data?.role?.role_id)
    }
  }, [userData])
  return (
    <>
      <AsideMenuItem
        to="/dashboard"
        icon="/media/icons/duotune/sidebarIcon/dashboard.svg"
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon="bi-app-indicator"
      />

      <AsideMenuItemWithSub
        to="/users"
        title="All User"
        fontIcon="bi-chat-left"
        icon="/media/icons/duotune/sidebarIcon/user.svg"
      >
         <AsideMenuItem to="/users/parents" title="Parents" hasBullet={true} />
         <AsideMenuItem to="/users/childs" title="Teens" hasBullet={true} />
         <AsideMenuItem to="/users/admins" title="Admins" hasBullet={true} />
      </AsideMenuItemWithSub>

      { role === 1 &&
            <AsideMenuItem
              to="/module"
              icon="/media/icons/duotune/sidebarIcon/module.svg"
              title="Features"
              fontIcon="bi-layers"
            />
      }

      <AsideMenuItem
        to="/package"
        icon="/media/icons/duotune/sidebarIcon/package.svg"
        title="Package List"
        fontIcon="bi-layers"
      />

      <AsideMenuItem
        to="/skill"
        icon="/media/icons/duotune/sidebarIcon/skill.svg"
        title="Skill Sets"
        fontIcon="bi-layers"
      />

      <AsideMenuItem
        to="/daily-tips"
        icon="/media/icons/duotune/sidebarIcon/dailyTips.svg"
        title="Daily Tips"
        fontIcon="bi-layers"
      />

      <AsideMenuItem
        to="/course"
        icon="/media/icons/duotune/sidebarIcon/course.svg"
        title="Course"
        fontIcon="bi-layers"
      />

      {/* <AsideMenuItem
        to="/workshop"
        icon="/media/icons/duotune/general/gen005.svg"
        title="workshop"
        fontIcon="bi-layers"
      /> */}

      <AsideMenuItemWithSub
        to="/workshop"
        title="Workshop"
        fontIcon="bi-chat-left"
        icon="/media/icons/duotune/sidebarIcon/workshop.svg"
       >
          <AsideMenuItem to="workshop/workshop-topic" title="Workshop topic" hasBullet={true} />
          <AsideMenuItem to="workshop/workshop-list" title=" All Workshop" hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to="/group"
        title="Groups"
        fontIcon="bi-chat-left"
        icon="/media/icons/duotune/sidebarIcon/group.svg"
      >

         <AsideMenuItem to="group/group-topic" title="Group Topic" hasBullet={true} />
         <AsideMenuItem to="group/group-list" title=" All Group" hasBullet={true} />

      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to="/expert"
        title="Experts"
        fontIcon="bi-chat-left"
        icon="/media/icons/duotune/sidebarIcon/expert.svg"
      >

          <AsideMenuItem to="expert/expert-topic" title="Expert Topic" hasBullet={true} />
          <AsideMenuItem to="expert/expert-list" title="All Expert" hasBullet={true} />

      </AsideMenuItemWithSub>

      <AsideMenuItem
        to="/sos"
        icon="/media/icons/duotune/sidebarIcon/sos.svg"
        title="SOS"
        fontIcon="bi-layers"
      />

      { role === 1 &&
            <AsideMenuItem
              to="/quiz"
              icon="/media/icons/duotune/sidebarIcon/quiz.svg"
              title="Quiz"
              fontIcon="bi-layers"
            />
      }


      <AsideMenuItemWithSub
        to="/game"
        title="Game"
        fontIcon="bi-chat-left"
        icon="/media/icons/duotune/sidebarIcon/game.svg"
      >

          <AsideMenuItem to="game/cross-word" title="Cross Word" hasBullet={true} />
          <AsideMenuItem to="game/mcq" title="MCQ" hasBullet={true} />

      </AsideMenuItemWithSub>

      <AsideMenuItem
        to="/config"
        icon="/media/icons/duotune/sidebarIcon/configuration.svg"
        title="Configuration"
        fontIcon="bi-layers"
      />


      <div className="menu-item">
        <div className="menu-content">
          <div className="separator mx-2 my-4"></div>
        </div>
      </div>
      {/* <AsideMenuItem to="/my-page" title="My Page" /> */}

    </>
  )
}
