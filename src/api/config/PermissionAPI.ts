import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define
class PermissionAPI {
  // get data
  getTypes: apiCall = async () => {
    return await axios.get('/permission/list', { headers: AuthHeader() })
    
  }
  getTypesModule: apiCall = async () => {
    return axios.get('/permission/notAssignPermissionList', {
      headers: AuthHeader(),
    })
  }
  // create
  createType: any = (data: any) => {
    console.log('data', data)
    return axios.post(
      '/permission/add',
      data,
      // {
      //   title: data?.title as string,
      //   key_name: data?.key_name as string,
      //   details: data?.details as string,
      //   access_user: data?.access_user as number,
      // },
      { headers: AuthHeader() },
    )
  }

  // edit
  editType: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/permission/update',
      data,
      // {
      //   id: data.id as number,
      //   title: data?.title as string,
      //   key_name: data?.key_name as string,
      //   details: data?.details as string,
      //   access_user: data?.access_user as number,

      // },
      { headers: AuthHeader() },
    )
  }
  // delete
  deleteType: any = (id: number) => {
    return axios.delete(`/permission/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // change status
  changeStatus: any = (id: number) => {
    return axios.put(
      `/permission/changeStatus`,
      {
        id: id as number,
      },
      { headers: AuthHeader() },
    )
  }

  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/permission/details/+${id}`, { headers: AuthHeader() })
  }

  
}

export default new PermissionAPI()
