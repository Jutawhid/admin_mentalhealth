import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define
class HardwareCategoriesAPI {
  // get data
  getTypes: apiCall = () => {
    return axios.get('/hardware-category/list', { headers: AuthHeader() })
  }
  // create
  createType: any = (data: any) => {
    return axios.post(
      '/hardware-category/add',
      {
        parent_dept_id: data.parent_dept ? data.parent_dept : 0,
        title: data.title,
        // address: data.address,
      },
      { headers: AuthHeader() },
    )
  }
  // edit
  editType: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/hardware-category/update',
      {
        id: data.id as number,
        parent_dept_id: data.parent_dept_id
          ? (data.parent_dept_id as number)
          : (0 as number),
        title: data.title as string,
        // address: data.address as string,
      },
      { headers: AuthHeader() },
    )
  }
  // delete
  deleteType: any = (id: number) => {
    return axios.delete(`/hardware-category/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // change status
  changeStatus: any = (id: number) => {
    return axios.put(
      `/hardware-category/changeStatus`,
      {
        id: id as number,
      },
      { headers: AuthHeader() },
    )
  }

  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/hardware-category/details/+${id}`, {
      headers: AuthHeader(),
    })
  }
}

export default new HardwareCategoriesAPI()
