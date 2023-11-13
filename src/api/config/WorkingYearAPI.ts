import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define for AttendanceType
class WorkingYearAPI {
  // get data
  getWorkingYearList: apiCall = () => {
    return axios.get('/working-year/list', { headers: AuthHeader() })
  }
  getCurrentWorkingYear: apiCall = () => {
    return axios.get('/working-year/getCurrentWorkingYear', { headers: AuthHeader() })
  }

  // create AttendanceType
  createWorkingYear: any = (data: any) => {
    console.log('data', data)
    return axios.post(
      '/working-year/add',
      {
        title: data.title as string,
        start_date: data.start_date as Date,
        end_date: data.start_date as Date,
      },
      { headers: AuthHeader() },
    )
  }

  // edit AttendanceType
  editWorkingYear: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/working-year/update',
      {
        id: data.id as number,
        title: data.title as string,
        start_date: data.start_date as Date,
        end_date: data.end_date as Date,
      },
      { headers: AuthHeader() },
    )
  }

  // delete AttendanceType
  deleteWorkingYear: any = (id: number) => {
    return axios.delete(`/working-year/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // status change
  statusChange: any = (id: number) => {
    return axios.put(
      '/working-year/setCurrentWorkingYear',
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
    return axios.get(`/working-year/details/+${id}`, { headers: AuthHeader() })
  }
}

export default new WorkingYearAPI()
