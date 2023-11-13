import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import { ExpertList } from "./ExpertList";
import { AddNewExpert } from "./AddNewExpert";
import { EditExpert } from "./EditExpert";
import { ExpertDetails } from "./ExpertDetails";
const Expert:React.FC = ()=>{

    return(

        <>
           <Routes>
               <Route path="/" element={<ExpertList/>} />
               <Route path="/create" element={<AddNewExpert/>} />
               <Route path="/edit/*" element={<EditExpert/>} />
               <Route path="/details/*" element={<ExpertDetails/>} />
               <Route path='/*' element={<Navigate to='/error/404' />} />
           </Routes>
        </>
    )
}

export default Expert;