import React from "react";
import { Routes, Route , Navigate } from "react-router-dom";
import { PackageList } from "./PackageList";
import { AddNewPackage } from "./AddNewPackage";
import { EditPackage } from "./EditPackage";
import { PackageDetails } from "./PackageDetails";

const SkillPage:React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<PackageList/>} />
                <Route path="/create" element={<AddNewPackage/>} />
                <Route path="/edit/*" element={<EditPackage/>} />
                <Route path="/details/*" element={<PackageDetails/>}/>
                <Route path='/*' element={<Navigate to='/error/404' />} />
            </Routes>
        </>
    )
}

export default SkillPage;