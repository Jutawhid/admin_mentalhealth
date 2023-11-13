import React from "react"
import {Routes,Route, Navigate} from "react-router-dom";
import { ReadContentList } from "./ReadContentList";
import { AddNewReadContent } from "./AddNewReadContent";
import { EditReadContent } from "./EditReadContent";
import { ReadContentDetails } from "./ReadContentDetails";
import Attachment from "./attachment";

const ReadContent:React.FC = ()=>{

    return (
        <>
           <Routes>
                <Route path ="/*" element={<ReadContentList/>} />
                <Route path ="/create/*" element={<AddNewReadContent/>} />
                <Route path ="/edit/*" element={<EditReadContent/>} />
                <Route path ="/details/*" element={<ReadContentDetails/>} />
                <Route path ="/course-attachment/*" element={<Attachment/>}/>
                <Route path='/*' element={<Navigate to='/error/404' />} />
                
            </Routes>
        </>
    )
}

export default ReadContent;