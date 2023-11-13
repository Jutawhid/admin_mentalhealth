import React from "react"
import {Routes,Route, Navigate} from "react-router-dom";
import { QuizList } from "./QuizList";
import { AddNewQuiz } from "./AddNewQuiz";
import { EditQuiz } from "./EditQuiz";
const QuizPage:React.FC = ()=>{

     return(
        <>
            <Routes>
                <Route path="/" element={<QuizList/>} />
                <Route path="/create" element={<AddNewQuiz/>} />
                <Route path="/edit/*" element={<EditQuiz/>}/>
                <Route path='/*' element={<Navigate to='/error/404' />} />
             </Routes>
        </>
     )
}

export default QuizPage;