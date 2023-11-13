import React from "react";
import {Routes,Route, Navigate}  from "react-router-dom"
import Group from "./allGroups";
import GroupTopic from "./groupTopic";

const GroupPage:React.FC = ()=>{
    return (
        <>
           <Routes>
              <Route path="group-topic/*" element={<GroupTopic/>}/>
              <Route path="group-list/*" element={<Group/>}/>
              <Route path='*' element={<Navigate to='/error/404' />} />
           </Routes>
          
        </>
    )
}

export default GroupPage