import React from "react";
import {  Route, Routes , Navigate } from "react-router-dom";
import { CrossWordList } from "./CrossWordList";
import { AddNewCrossWord } from "./AddNewCrossWord";
import { EditCrossWord } from "./EditCrossWord";
import { DetailsCrossWord } from "./CrossWordDetails";
const CrossWordPage:React.FC = ()=>{

    return(
            <>
               <Routes>
                  <Route path="/" element={<CrossWordList/>} />
                  <Route path="/create" element={<AddNewCrossWord/>} />
                  <Route path="/edit/*" element={<EditCrossWord/>} />
                  <Route path="/details/*" element={<DetailsCrossWord/>} />
                  <Route path='/*' element={<Navigate to='/error/404' />} />
               </Routes>
               
            </>
    )
}

export default CrossWordPage;