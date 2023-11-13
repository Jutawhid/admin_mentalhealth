import React from "react";
import {  Route, Routes, Navigate } from "react-router-dom";
import { AddNewMCQ } from "./AddNewMCQ";
import { McqList } from "./McqList";
import { EditMCQ } from "./EditMCQ";
import { DetailsMCQ } from "./DetailsMCQ";

const MCQPage:React.FC = ()=>{

    return(
            <>
               <Routes>

                  <Route path="/" element={<McqList/>}/>
                  <Route path="/create" element={<AddNewMCQ/>}/>
                  <Route path="/edit/*" element={<EditMCQ/>}/>
                  <Route path="/details/*" element={<DetailsMCQ/>}/>
                  <Route path='/*' element={<Navigate to='/error/404' />} />
                  
               </Routes>
               
            </>
    )
}

export default MCQPage;