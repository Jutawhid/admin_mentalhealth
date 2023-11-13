import React from "react";
import { Routes, Route , Navigate } from "react-router-dom"
import { ModuleList } from "./ModuleList";
import { AddNewModule } from "./AddNewModule";
import { EditModule } from "./EditModule";

const ModulePage: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ModuleList />} />
                <Route path="/create" element={<AddNewModule />} />
                <Route path="/edit/*" element={<EditModule />} />
                <Route path='/*' element={<Navigate to='/error/404' />} />
            </Routes>
        </>
    )
}

export default ModulePage;