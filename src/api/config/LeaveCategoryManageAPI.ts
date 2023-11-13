import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define for AttendanceType
class LeaveCategoryManageAPI {
  // get data
  getLeaveCategoryList: apiCall = () => {
    return axios.get('/leave-category-manage/list', { headers: AuthHeader() })
  }

  // create AttendanceType
  createLeaveCategory: any = (data: any) => {
    // console.log('data', data)
    return axios.post('/leave-category-manage/add', data, {
      headers: AuthHeader(),
    })
  }

  // edit AttendanceType
  editLeaveCategory: any = (data: any) => {
    // console.log('data', data)
    return axios.put('/leave-category-manage/update', data, {
      headers: AuthHeader(),
    })
  }

  // delete AttendanceType
  deleteLeaveCategory: any = (id: number) => {
    return axios.delete(`/leave-category-manage/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // status change
  statusChange: any = (id: number) => {
    return axios.put(
      '/leave-category-manage/changeStatus',
      {
        id: id as number,
      },
      {
        headers: AuthHeader(),
      },
    )
  }

  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/leave-category-manage/details/+${id}`, {
      headers: AuthHeader(),
    })
  }
}

export default new LeaveCategoryManageAPI()
