import React from "react"
import {Routes,Route, Navigate} from "react-router-dom";
import { EditAttachment } from "./EditAttachment";
// import { ReadContentList } from "./ReadContentList";
// import { AddNewReadContent } from "./AddNewReadContent";
// import { EditReadContent } from "./EditReadContent";
// import { ReadContentDetails } from "./ReadContentDetails";
import { AttachmentList } from "./AttachmentList";
import { AddNewAttachment } from "./AddNewAttachment";
import { RearrangeAttachment } from "./RearrangeAttachment";

const Attachment:React.FC = ()=>{

    return (
        <>
           <Routes>
                <Route path ="/*" element={<AttachmentList/>} />
                 <Route path ="/create/*" element={<AddNewAttachment/>} />
                 <Route path ="/edit/*" element={<EditAttachment/>}/>
                 <Route path ="/rearrange/*" element={<RearrangeAttachment/>}/>

                {/* <Route path ="/details/*" element={<ReadContentDetails/>} />
                <Route path ="/attachment-list/*" element={<ReadContentDetails/>}/>
                <Route path='/*' element={<Navigate to='/error/404' />} />  */}
                
            </Routes>
            {/* <h2>hello world</h2> */}
        </>
    )
}

export default Attachment;