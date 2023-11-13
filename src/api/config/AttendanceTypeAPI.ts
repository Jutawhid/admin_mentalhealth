import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define for AttendanceType
class AttendanceTypeAPI {
  // get data
  getAttendanceTypeList: apiCall = () => {
    return axios.get('/attendance-type/list', { headers: AuthHeader() })
  }

    // get details
    getDetails: any = (id: number) => {
      return axios.get(`/attendance-type/details/${id}`, { headers: AuthHeader() })
    }

  // create AttendanceType
  createAttendanceType: any = (data: any) => {
    console.log('data', data)
    return axios.post(
      '/attendance-type/add',
      {
        title: data.title as string,
      },
      { headers: AuthHeader() },
    )
  }

  // edit AttendanceType
  editAttendanceType: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/attendance-type/update',
      {
        id: data.id as number,
        title: data.title as string,
      },
      { headers: AuthHeader() },
    )
  }

  // delete AttendanceType
  deleteAttendanceType: any = (id: number) => {
    return axios.delete(`/attendance-type/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

   // status change
   statusChange: any = (id: number) => {
    return axios.put(
      '/attendance-type/changeStatus',
      {
        id: id as number,
      },
      {
        headers: AuthHeader(),
      },
    )
  }
}

export default new AttendanceTypeAPI()
