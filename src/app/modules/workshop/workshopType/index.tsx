import React from "react";
import { Routes,Route,Navigate }  from "react-router-dom"
import { WorkshopTpyeList } from "./WorkshopTypeList";
import { AddNewWorkshopType } from "./AddNewWorkshopType";
import { EditWorkshopType } from "./EditWorkshopType";


const WorkShopType:React.FC = ()=>{
    
    return (
        <>
           <Routes>

               <Route path="/" element={<WorkshopTpyeList/>} />
               <Route path="/create" element={<AddNewWorkshopType/>}/>
               <Route path="/edit/*" element={<EditWorkshopType />}/>
               <Route path='/*' element={<Navigate to='/error/404' />} />
               
           </Routes>
        </>
    )
}

export default WorkShopType;