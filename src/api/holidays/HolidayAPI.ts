import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define
class HolidayAPI {
  // get data
  getHolidays: apiCall = () => {
    return axios.get('/holidays/list', { headers: AuthHeader() })
  }
  // create
  create: any = (data: any, selectedDepartments: any) => {
    console.log('data', data)
    return axios.post(
      '/holidays/add',
      {
        working_year_id: data?.working_year_id as number,
        date: data?.date as string,
        department_id: selectedDepartments.map((e: any) => e.value as number),
        title: data?.title as string,
      },
      { headers: AuthHeader() },
    )
  }
  // edit
  edit: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/holidays/update',
      {
        id: data?.id as number,
        working_year_id: data?.working_year_id as number,
        date: data?.date as string,
        department_id: data.department_id as any,
        title: data?.title as string,
      },
      { headers: AuthHeader() },
    )
  }
  // delete
  delete: any = (id: number) => {
    return axios.delete(`/holidays/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/holidays/details/+${id}`, { headers: AuthHeader() })
  }
}

export default new HolidayAPI()
