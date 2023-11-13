import React from "react"
import {Routes,Route,Navigate } from "react-router-dom";
import { CourseList } from "./CourseList";
import { AddNewCourse } from "./AddNewCourse";
import { EditCourse } from "./EditCourse";
import ReadContent from "./readContent";
import { CourseDetails } from "./CourseDetails";

const Course:React.FC = ()=>{

    return (
        <>
           <Routes>

               <Route path ="/" element={<CourseList/>} />
               <Route path ="/create" element={<AddNewCourse/>} />
               <Route path ="/edit/*" element={<EditCourse/>} />
               <Route path ="/read-content/*" element={<ReadContent/>} />
               <Route path ="/details/*" element={<CourseDetails/>} />
               <Route path='/*' element={<Navigate to='/error/404' />} />
               
           </Routes>
        </>
    )
}

export default Course;