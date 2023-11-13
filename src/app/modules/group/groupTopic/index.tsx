import React from "react";
import {Routes,Route, Navigate}  from "react-router-dom"
import { GroupTopicList } from "./GroupTopicList";
import { AddNewGroupTopic } from "./AddNewGroupTopic";
import { EditGroupTopic } from "./EditGroupTopic";

const GroupTopic:React.FC = ()=>{
    return (
        <>
          <Routes>
              <Route path="/" element={<GroupTopicList/>}/>
              <Route path="/create" element={<AddNewGroupTopic/>}/>
              <Route path="/edit/*" element={<EditGroupTopic/>}/>
              <Route path='/*' element={<Navigate to='/error/404' />} />
          </Routes>
          
        </>
    )
}

export default GroupTopic;