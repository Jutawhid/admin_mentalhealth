import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define for Branch
class ParentsAPI {
  // get data
  getAllList: apiCall = () => {
    return axios.get('/parent/list', { headers: AuthHeader() })
  }

  // change status
  changeStatus = (id: number) => {
    return axios.put(
      `/parent/changeStatus`,
      {
        id: id,
      },
      {
        headers: AuthHeader(),
      },
    )
  }

  // delete data
  deleteParent = (id: number) => {
    return axios.delete('/parent/delete', {
      data: { id: id },
      headers: AuthHeader(),
    })
  }
}

export default new ParentsAPI()
