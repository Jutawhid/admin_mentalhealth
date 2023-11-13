import React from "react";
import {Routes,Route, Navigate} from "react-router-dom";
import { SOSList } from "./SOSList";
import { AddNewSOS } from "./AddNewSOS";
import { EditSOS } from "./EditSOS";

const SOSPage:React.FC = ()=>{

    return(
        <>
            <Routes>
                  <Route path="/" element={<SOSList/>} />
                  <Route path="/create" element={<AddNewSOS/>} />
                  <Route path="/edit/*" element={<EditSOS/>} />
                  <Route path='/*' element={<Navigate to='/error/404' />} />
                  
            </Routes>
        </>
    )
   
}

export default SOSPage;