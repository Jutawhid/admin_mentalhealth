import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import { AccountSetting } from "./AccountSetting";
import { ChangePassword } from "./ChangePassword";

const NewProfile:React.FC = ()=>{

    return (
        <>
           <Routes>
                <Route path="/" element={<AccountSetting/>} />
                <Route path="/update-profile" element={<ChangePassword/>} />
                <Route path='/*' element={<Navigate to='/error/404' />} />
                  
           </Routes>
        </>
    )
}

export default NewProfile;