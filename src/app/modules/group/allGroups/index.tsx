import React from "react";
import {Routes, Route, Navigate}  from "react-router-dom"
import { AllGroupList } from "./AllGroupList";
import { AddNewGroup } from "./AddNewGroup";
import { EditGroup } from "./EditGroup";
import { GroupDetails } from "./GroupDetails";

const AllGroup:React.FC = ()=>{
    return (
        <>
          <Routes>
               <Route path="/" element={<AllGroupList/>}/>
               <Route path="/create" element={<AddNewGroup/>}/>
               <Route path="/edit/*" element={<EditGroup/>}/>
               <Route path="/details/*" element={<GroupDetails/>}/>
               <Route path='/*' element={<Navigate to='/error/404' />} />
          </Routes>
        </>
    )
}

export default AllGroup;