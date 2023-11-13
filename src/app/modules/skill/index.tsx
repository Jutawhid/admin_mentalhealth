import React from "react";
import { Routes, Route ,Navigate } from "react-router-dom"
import SkillList from "./SkillList";
import { AddNewSkill } from "./AddNewSkill";
import { EditSkill } from "./EditSkill";

const SkillPage:React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<SkillList/>}/>
                <Route path="/create" element={<AddNewSkill/>} />
                <Route path="/edit/*" element={<EditSkill />} />
                <Route path='/*' element={<Navigate to='/error/404' />} />
            </Routes>
        </>
    )
}

export default SkillPage;