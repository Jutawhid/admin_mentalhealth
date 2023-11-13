import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define for AttendanceType
class LeaveCategoryAPI {
  // get data
  getLeaveCategoryList: apiCall = () => {
    return axios.get('/leave-category/list', { headers: AuthHeader() })
  }

  // create AttendanceType
  createLeaveCategory: any = (data: any) => {
    console.log('data', data)
    return axios.post(
      '/leave-category/add',
      {
        title: data.title as string,
      },
      { headers: AuthHeader() },
    )
  }

  // edit AttendanceType
  editLeaveCategory: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/leave-category/update',
      {
        id: data.id as number,
        title: data.title as string,
      },
      { headers: AuthHeader() },
    )
  }

  // delete AttendanceType
  deleteLeaveCategory: any = (id: number) => {
    return axios.delete(`/leave-category/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // status change
  statusChange: any = (id: number) => {
    return axios.put(
      '/leave-category/changeStatus',
      {
        id: id as number,
      },
      {
        headers: AuthHeader(),
      },
    )
  }

  // delete AttendanceType
  // branchName: any = (id: number) => {
  //   return axios.get(`/branch/details/${id}`, { headers: AuthHeader() })
  // }

  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/leave-category/details/+${id}`, { headers: AuthHeader() })
  }

  // get My attendance
  getLeaveDetails: apiCall = () => {
    return axios.get('employee/employeeOwnLeaveDetails', { headers: AuthHeader() })
  }
}

export default new LeaveCategoryAPI()
