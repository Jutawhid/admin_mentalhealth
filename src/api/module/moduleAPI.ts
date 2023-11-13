import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';


class ModuleAPI {

  getAllModule: any = () => {
    return axios.get('/module/list', { headers: AuthHeader() });
  }

  addModule: any = (data: any) => {
    return axios.post('/module/add',
      {
        title: data.title,
        key_name: data.keyName
      },
      {
        headers: AuthHeader(),
      }
    )
  }

  changeStatus: any = (id: number) => {
    return axios.put(
      `/module/changeStatus`,
      {
        id: id,
      },
      {
        headers: AuthHeader(),
      },
    )
  }

  deleteModule = (id: number) => {
    //console.log(id);
    return axios.delete('/module/delete', {
      data: { id: id },
      headers: AuthHeader(),
    })
  }
  getModuleDetail: any = (id: number) => {
    return axios.get(`/module/details/${id}`, { headers: AuthHeader(), })
  }
  updateModule = (id:number,data:any) =>{
     return axios.put('module/update',
     {
        id : id,
        title : data.title,
        key_name : data.keyName
     },
     {
      headers: AuthHeader(),
     })
  }

}

export default new ModuleAPI();