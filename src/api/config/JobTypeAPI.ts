import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define
class JobTypeAPI {
  // get data
  getTypes: apiCall = () => {
    return axios.get('/job-type/list', { headers: AuthHeader() })
  }
  // create
  createType: any = (data: any) => {
    console.log('data', data)
    return axios.post(
      '/job-type/add',
      {
        title: data.title as string,
      },
      { headers: AuthHeader() },
    )
  }
  // edit
  editType: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/job-type/update',
      {
        id: data.id as number,
        title: data.title as string,
      },
      { headers: AuthHeader() },
    )
  }
  // delete
  deleteType: any = (id: number) => {
    return axios.delete(`/job-type/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // change status
  changeStatus: any = (id: number) => {
    return axios.put(
      `/job-type/changeStatus`,
      {
        id: id as number,
      },
      { headers: AuthHeader() },
    )
  }

  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/job-type/details/+${id}`, { headers: AuthHeader() })
  }
}

export default new JobTypeAPI()
