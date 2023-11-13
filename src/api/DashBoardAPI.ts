import axios from './BASE_API'
import AuthHeader from './AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define
class DashBoardAPI {
  // get data
  // getBirthDay: apiCall = async() => {
  //   let data = await axios.get('/employee/allUpcomingBirthday', { headers: AuthHeader() })
  //   return data
  // }
  // // get data
  // getUpcommingHoliday: apiCall = async() => {
  //   let data = await axios.get('/holidays/listByDepartmentId', { headers: AuthHeader() })
  //   return data
  // }
  // get data
  getDashboardData: apiCall = async() => {
    let data = await axios.get('/dashboard/dashboardData', { headers: AuthHeader() })
    return data
  }

  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/holidays/details/+${id}`, { headers: AuthHeader() })
  }
}

export default new DashBoardAPI()
