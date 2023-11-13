import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define for Branch
class ChildsAPI {
  // get data
  getAllList: apiCall = () => {
    return axios.get('/teen/list', { headers: AuthHeader() })
  }

  // change status
  changeStatus = (id: number) => {
    //console.log(id);
    return axios.put(
      `/teen/changeStatus`,
      {
        id: id,
      },
      {
        headers: AuthHeader(),
      }
    )
  }

  // delete data
  deleteChild = (id: number) => {
    console.log(id);
    return axios.delete('/teen/delete', {
      data: { id: id },
      headers: AuthHeader(),
    })
  }
}

export default new ChildsAPI()