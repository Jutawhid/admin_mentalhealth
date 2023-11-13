import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define
class DesignationAPI {
  // get data
  getTypes: apiCall = () => {
    return axios.get('/designation/list', { headers: AuthHeader() })
  }
  // create
  createType: any = (data: any) => {
    console.log('data', data)
    return axios.post(
      '/designation/add',
      {
        branch_id: data?.branch_id as number,
        dept_id: data?.dept_id as number,
        priority: data?.priority as number,
        title: data?.title as string,
      },
      { headers: AuthHeader() },
    )
  }
  // edit
  editType: any = (data: any) => {
    console.log('dataaaaaaaaa', data)
    return axios.put(
      '/designation/update',
      {
        id: data.id as number,
        branch_id: data?.branch_id as number,
        dept_id: data?.dept_id as number,
        priority: data?.priority as number,
        title: data?.title as string,
      },
      { headers: AuthHeader() },
    )
  }
  // delete
  deleteType: any = (id: number) => {
    return axios.delete(`/designation/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // change status
  changeStatus: any = (id: number) => {
    return axios.put(
      `/designation/changeStatus`,
      {
        id: id as number,
      },
      { headers: AuthHeader() },
    )
  }

  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/designation/details/+${id}`, { headers: AuthHeader() })
  }
}

export default new DesignationAPI()
