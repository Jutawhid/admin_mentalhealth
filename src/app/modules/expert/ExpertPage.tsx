import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import Expert from "./allExpert";
import ExpertType from "./expertType";

const ExpertPage = ()=>{

    return(

        <>
           <Routes>
                <Route path="expert-topic/*" element={<ExpertType/>} />
                <Route path="expert-list/*" element={<Expert/>} />
                <Route path='*' element={<Navigate to='/error/404' />} />
           </Routes>
        </>
    )
}

export default ExpertPage;