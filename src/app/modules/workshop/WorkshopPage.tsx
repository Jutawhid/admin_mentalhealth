import React from "react";
import {Routes, Route, Navigate}  from "react-router-dom"
import WorkShopList from "./workshopList";
import WorkShopType from "./workshopType";

const WorkshopPage:React.FC = ()=>{
    return (
        <>
           <Routes>
              <Route path="workshop-list/*" element={<WorkShopList/>}/>
              <Route path="workshop-topic/*" element={<WorkShopType/>}/>
              <Route path='*' element={<Navigate to='/error/404' />} />
           </Routes>
          
        </>
    )
}

export default WorkshopPage;