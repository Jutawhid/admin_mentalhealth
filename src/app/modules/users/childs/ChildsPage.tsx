import AllChilds from "./ChildsList";
import { Route, Routes , Navigate } from "react-router-dom"
import React from "react";

const ChildPage:React.FC = () => {

  return (
    <>

      <Routes>

          <Route path="/" element={<AllChilds />} />
          <Route path='*' element={<Navigate to='/error/404' />} />

      </Routes>
    </>
  )
}

export default ChildPage;