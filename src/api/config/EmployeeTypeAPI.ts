import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define for AttendanceType
class EmployeeTypeAPI {
  // get data
  getEmployeeTypes: apiCall = () => {
    return axios.get('/employee-type/list', { headers: AuthHeader() })
  }

  // create AttendanceType
  createEmployeeType: any = (data: any) => {
    console.log('data', data)
    return axios.post(
      '/employee-type/add',
      {
        title: data.title as string,
      },
      { headers: AuthHeader() },
    )
  }

  // edit AttendanceType
  editEmployeeType: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/employee-type/update',
      {
        id: data.id as number,
        title: data.title as string,
      },
      { headers: AuthHeader() },
    )
  }

  // delete AttendanceType
  deleteEmployeeType: any = (id: number) => {
    return axios.delete(`/employee-type/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // change status
  changeEmpTypeStatus: any = (id: number) => {
    return axios.put(
      `/employee-type/changeStatus`,
      {
        id: id as number,
      },
      { headers: AuthHeader() },
    )
  }

  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/employee-type/details/+${id}`, { headers: AuthHeader() })
  }
}

export default new EmployeeTypeAPI()
