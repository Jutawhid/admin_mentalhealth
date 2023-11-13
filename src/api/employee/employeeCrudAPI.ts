import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// class define for employee
class employeeCrudAPI {
  // create employee
  createEmployee: any = async (data: any) => {
    // console.log('data', data)
    return axios.post(
      '/employee/add',
      {
        employee_type_id: data?.employee_type_id as number,
        department_id: data?.department_id as number,
        designation_id: data?.designation_id as number,
        first_name: data?.first_name as string,
        last_name: data?.last_name as string,
        employee_id_no: data?.employee_id_no as number,
        personal_email: data?.personal_email as string,
        official_email: data?.official_email as string,
        joining_date: data?.joining_date as Date,
        salary: data?.salary as number,
        user_name: data?.user_name as string,
      },
      { headers: AuthHeader() },
    )
  }
  // get employee
  getEmployees: any = async () => {
    return axios.get('/employee/employeeList', { headers: AuthHeader() })
  }
  // delete employee
  deleteEmployee: any = async (id: number) => {
    return axios.delete('/user/deleteUser', {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }
  // get assigned leaves by userID
  getAssignedLeaves: any = async (id: number) => {
    return axios.get(`/employee/employeeLeaveDetails/${id}`, {
      headers: AuthHeader(),
    })
  }

  // get details
  getDetails: any = async (id: number) => {
    return axios.get(`/employee/employeeDetails/${id}`, {
      headers: AuthHeader(),
    })
  }

  editEmployee: any = async (data: any) => {
    console.log('data', data)
    return axios.put('/employee/updateProfile', data, { headers: AuthHeader() })
  }

  // status change
  statusChange: any = (id: number) => {
    return axios.post(
      '/user/changeUserStatus',
      {
        id: id as number,
      },
      {
        headers: AuthHeader(),
      },
    )
  }
  // delete work experience
  deleteEmpExperience: any = (data: any) => {
    return axios.delete('/employee/deleteExperience', {
      data: data,
      headers: AuthHeader(),
    })
  }
  // delete own education
  deleteEducation: any = (id: number) => {
    return axios.delete('/employee/deleteEducation', {
      data: id,
      headers: AuthHeader(),
    })
  }
  // delete trainig
  deleteTraining: any = (data: any) => {
    return axios.delete('/employee/deleteTraining', {
      data: data,
      headers: AuthHeader(),
    })
  }
  // delete work experience
  deleteEmpReference: any = (data: any) => {
    return axios.delete('/employee/deleteReference', {
      data: data,
      headers: AuthHeader(),
    })
  }
  // employee family information update
  updateEmployeeFamilyInformation: any = (data: any) => {
    return axios.put('/employee/updateEmployeeFamilyInformation', data, {
      headers: AuthHeader(),
    })
  }
  // employee family information update
  updateProfile: any = (data: any) => {
    return axios.put('/employee/updateProfile', data, {
      headers: AuthHeader(),
    })
  }
  //  update reference
  updateEmployeeReference: any = (data: any) => {
    return axios.put('/employee/updateReference', data, {
      headers: AuthHeader(),
    })
  }

  // update document
  updateEmployeeDocument: any = (data: any) => {
    return axios.put('/employee/updateDocuments', data, {
      headers: AuthHeader(),
    })
  }
  // update work experience
  updateEducation: any = (data: any) => {
    return axios.put('/employee/updateEducation', data, {
      headers: AuthHeader(),
    })
  }
  // update training
  updateTraining: any = (data: any) => {
    return axios.put('/employee/updateTraining', data, {
      headers: AuthHeader(),
    })
  }
  // supervisor list
  getSupervisorList: any = (data: any) => {
    return axios.get('/employee/supervisorList', {
      headers: AuthHeader(),
    })
  }
  // update work experience
  updateWorkExperience: any = (data: any) => {
    return axios.put('/employee/updateExperience', data, {
      headers: AuthHeader(),
    })
  }

  // add work experience
  addWorkingExperience: any = async (data: any) => {
    return axios.post('/employee/addExperience', data, {
      headers: AuthHeader(),
    })
  }
  // add education
  addEducation: any = async (data: any) => {
    return axios.post('/employee/addEducation', data, { headers: AuthHeader() })
  }
  // add training
  addTraining: any = async (data: any) => {
    return axios.post('/employee/addTraining', data, { headers: AuthHeader() })
  }
  // add education
  addReference: any = async (data: any) => {
    return axios.post('/employee/addReference', data, {
      headers: AuthHeader(),
    })
  }
  // assign supervisor
  assignSupervisor: any = async (data: any) => {
    return axios.put('/employee/updateSupervisor', data, {
      headers: AuthHeader(),
    })
  }

  // update => assign supervisor
  updateSupervisor: any = async (data: any) => {
    return axios.put('/employee/updateSupervisor', data, {
      headers: AuthHeader(),
    })
  }

  // get employee hardware list
  getHardwareList: any = async (id: number) => {
    return axios.get('/assigned-hardware/individual/' + id, {
      headers: AuthHeader(),
    })
  }

  // get employee
  getSubordinateList: any = async () => {
    return axios.get('/employee/subordinateList', { headers: AuthHeader() })
  }
  // update total leaves
  updateAssignedLeave: any = async (data: any) => {
    return axios.put('/employee/updateAssignedLeave', data, {
      headers: AuthHeader(),
    })
  }
}

export default new employeeCrudAPI()
