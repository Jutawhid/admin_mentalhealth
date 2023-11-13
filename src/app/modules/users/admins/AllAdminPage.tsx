import { Routes, Route , Navigate  } from "react-router-dom";
import { AdminList } from "./AdminList";
import { AddNewAdmin } from "./AddNewAdmin";



const AllAdminPage = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<AdminList />} />
        <Route path="create" element={<AddNewAdmin />} />
        <Route path='/*' element={<Navigate to='/error/404' />} />
      </Routes>

    </>
  )
}

export default AllAdminPage;