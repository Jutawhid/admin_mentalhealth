import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define
class DepartmentTypeAPI {
  // get data
  getTypes: apiCall = () => {
    return axios.get('/department/list', { headers: AuthHeader() })
  }
  // create
  createType: any = (data: any) => {
    console.log('data', data)
    return axios.post(
      '/department/add',
      {
        parent_dept_id: data.parent_dept ? data.parent_dept : 0,
        title: data.title,
        address: data.address,
      },
      { headers: AuthHeader() },
    )
  }
  // edit
  editType: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/department/update',
      {
        id: data.id as number,
        parent_dept_id: data.parent_dept_id
          ? (data.parent_dept_id as number)
          : (0 as number),
        title: data.title as string,
        address: data.address as string,
      },
      { headers: AuthHeader() },
    )
  }
  // delete
  deleteType: any = (id: number) => {
    return axios.delete(`/department/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // change status
  changeStatus: any = (id: number) => {
    return axios.put(
      `/department/changeStatus`,
      {
        id: id as number,
      },
      { headers: AuthHeader() },
    )
  }
  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/department/details/${id}`, { headers: AuthHeader() })
  }
  // working days get details
  getWorkingDays: any = (id: number) => {
    return axios.get(`/work-days/list/${id}`, {
      headers: AuthHeader(),
    })
  }
  // update Working Days
  updateWorkingDays: any = (data: any) => {
    return axios.put(`/work-days/update`, data, { headers: AuthHeader() })
  }
}

export default new DepartmentTypeAPI()
