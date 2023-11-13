import React from "react"
import {Routes,Route} from "react-router-dom"
import { DailyTipsList } from "./DailyTipsList";
import { DailyTipsDetails } from "./DailyTipsDetails";
import { AddNewDailyTips } from "./AddNewDailyTips";
import { EditDailyTips } from "./EditDailyTips";
const DailyTipsPage:React.FC = ()=>{

    return(
        <>
            <Routes>
                  <Route path="/" element={<DailyTipsList/>} />
                  <Route path="/details/*" element={<DailyTipsDetails/>} />
                  <Route path="/create" element={<AddNewDailyTips/>} />
                  <Route path="/edit/*" element={<EditDailyTips/>} />
            </Routes>
        </>
    )
}

export default DailyTipsPage;

