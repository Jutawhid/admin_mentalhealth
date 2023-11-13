import React from "react";
import {Routes,Route, Navigate} from "react-router-dom";
import { CongfigurationListANDUpdate } from "./configurationListAndUpdate";

const ConfigurationPage:React.FC = ()=>{

    return(
        <>
            <Routes>
                
                  <Route path="/" element={<CongfigurationListANDUpdate/>} />
                  <Route path='*' element={<Navigate to='/error/404' />} />
                  
            </Routes>
        </>
    )
   
}

export default ConfigurationPage;