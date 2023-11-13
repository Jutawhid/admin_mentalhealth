import AddNewParents from './AddNewParent';
import ParentsList from './ParentsList';
import {Route,Routes, Navigate } from "react-router-dom"
import EditParents from './EditParents';

const ParentsPage = ()=>{
   
    return (
     <> 
        <Routes>
           <Route path="/" element={<ParentsList/>}/>
           <Route path='create' element={<AddNewParents/>}/>
           <Route path='edit' element={<EditParents/>}/>
           <Route path='/*' element={<Navigate to='/error/404' />} />
       </Routes>
     </>
    )
 }
 
 export default ParentsPage;