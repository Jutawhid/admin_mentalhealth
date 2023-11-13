import React from "react";
import { Routes,Route, Navigate}  from "react-router-dom"
import { WorkshopList } from "./WorkshopList";
import { WorkshopParticipantList } from "./WorkshopParticipantList";
import { AddNewWorkshop } from "./AddNewWorkshop";
import { EditWorkshop } from "./EditWorkshop";
import { WorkshopDetails } from "./WorkshopDetails";


const WorkShopList:React.FC = ()=>{
    
    return (
        <>
           <Routes>
               <Route path="/" element={<WorkshopList/>} />
               <Route path="participant/*" element={<WorkshopParticipantList/>} />
               <Route path="create" element={<AddNewWorkshop/>} />
               <Route path="edit/*" element={<EditWorkshop/>} />
               <Route path="details/*" element={<WorkshopDetails />} />
               <Route path='*' element={<Navigate to='/error/404' />} />

           </Routes>
        </>
    )
}

export default WorkShopList;