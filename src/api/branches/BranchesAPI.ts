import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define for Branch
class BranchesAPI {
  // get data
  getBranchList: apiCall = () => {
    return axios.get('/branch/list', { headers: AuthHeader() })
  }

  // create Branch
  createBranch: any = (data: any) => {
    console.log('data', data)
    return axios.post(
      '/branch/add',
      {
        title: data.title as string,
        address: data.address as string,
      },
      { headers: AuthHeader() },
    )
  }

  // edit Branch
  editBranch: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/branch/update',
      {
        id: data.id as number,
        title: data.title as string,
        address: data.address as string,
      },
      { headers: AuthHeader() },
    )
  }

  // delete branch
  deleteBranch: any = (id: number) => {
    return axios.delete(`/branch/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // status change
  statusChange: any = (id: number) => {
    return axios.put(
      '/branch/changeStatus',
      {
        id: id as number,
      },
      {
        headers: AuthHeader(),
      },
    )
  }
}

export default new BranchesAPI()
