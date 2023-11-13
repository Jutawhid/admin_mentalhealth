import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';

// interface for API call
interface apiCall {
  (): Promise<any>
}

class AdminAPI {

  //create 
  createAdmin: any = (data: any) => {
    console.log('data', data);
    return axios.post(
      '/admin/registration', data, { headers: AuthHeader() },
    )
  }

  //get all list
  getAllList: apiCall = () => {
    return axios.get('/admin/list', { headers: AuthHeader() });
  }

  //change status
  changeStatus = (userId: number) => {
    console.log(userId)
    return axios.post(
      `/admin/changeStatus`,
      {
        id: userId,
      },
      {
        headers: AuthHeader(),
      },
    )
  }

  changePassword = (userId: number) => {
    console.log(userId)
    return axios.post(
      `/admin/resetPassword`,
      {
        id: userId,
      },
      {
        headers: AuthHeader(),
      },
    )
  }


  getDetails: any = (id: number) => {

    return axios.get(`/admin/adminProfileDetails/${id}`, {
      headers: AuthHeader(),
    })
  }
  updateAdmin: any = (data: any) => {
    return axios.put(
      '/admin/profile/update',data,
      { headers: AuthHeader() },
    )
  }
}

export default new AdminAPI();