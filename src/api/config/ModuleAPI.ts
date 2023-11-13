import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define
class ModuleAPI {
  // get data
  getTypes: apiCall = () => {
    return axios.get('/module/list', { headers: AuthHeader() })
  }
  // create
  createType: any = (data: any, selectedPermissions: any) => {
    console.log('data', data)
    return axios.post(
      '/module/add',
      {
        title: data?.title as string,
        permission_id: selectedPermissions.map((e: any) => e.id as number),
      },
      { headers: AuthHeader() },
    )
  }
  // edit
  editType: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/module/update',
      {
        id: data?.id as number,
        title: data?.title as string,
        permission_id: data?.permission_id as any,
      },
      { headers: AuthHeader() },
    )
  }
  // delete
  deleteType: any = (id: number) => {
    return axios.delete(`/module/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // change status
  changeStatus: any = (id: number) => {
    return axios.put(
      `/module/changeStatus`,
      {
        id: id as number,
      },
      { headers: AuthHeader() },
    )
  }

  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/module/details/` + id, { headers: AuthHeader() })
  }

  // active module list
  getActiveModuleList: any = () => {
    return axios.get(`/module/activeList`, { headers: AuthHeader() })
  }
}

export default new ModuleAPI()
