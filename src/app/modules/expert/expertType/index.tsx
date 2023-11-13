import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import { ExpertTypeList } from "./ExpertTypeList";
import { AddNewExpertType } from "./AddNewExpertType";
import { EditExpertType } from "./EditExpertType";

const ExpertType = ()=>{

    return(

        <>
           <Routes>

               <Route path="/"  element={<ExpertTypeList/>}/>
               <Route path="create"  element={<AddNewExpertType />}/>
               <Route path="edit/*"  element={<EditExpertType/>}/>
               <Route path='/*' element={<Navigate to='/error/404' />} />
               
           </Routes>
        </>
    )
}

export default ExpertType;