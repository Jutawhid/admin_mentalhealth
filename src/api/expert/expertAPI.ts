import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';




class ExpertAPI {

  addExpert: any = (data: any) => {
    // console.
    return axios.post('/expert/add', data, { headers: AuthHeader() })
  }

  getAllExpertList: any = () => {
    return axios.get('/expert/list', { headers: AuthHeader() })
  }

  changeStatus: any = (id: number) => {
    return axios.put('/expert/changeStatus', { id: id }, { headers: AuthHeader() })
  }

  deleteExpert: any = (id: number) => {

    return axios.delete('/expert/delete', {
      data: { id: id },
      headers: AuthHeader(),
    })
  }

  getDetails = (id: number) => {
    return axios.get(`/expert/details/${id}`, { headers: AuthHeader() })
  }
  updateExpert = (data:any) => {

    return axios.put('/expert/update',
       data,
      {
        headers: AuthHeader(),
      })
  }

}

export default new ExpertAPI();