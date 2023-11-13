import react from "react";
import { Route, Routes , Navigate } from "react-router-dom";
import CrossWordPage from "./crossWord";
import MCQPage from "./mcq";

const GamePage:React.FC = ()=>{

    return(
            <>
               <Routes>
                  <Route path="cross-word/*" element={<CrossWordPage/>} />
                  <Route path="mcq/*" element={<MCQPage/>} />
                  <Route path='/*' element={<Navigate to='/error/404' />} />
               </Routes>
            </>
    )
}

export default GamePage;