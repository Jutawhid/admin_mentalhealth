import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';



class GroupListAPI {
  
    getConfigData:any=()=>{
       return axios.get('/configuration',{ headers: AuthHeader()});
    }

    updateConfig = (data:any) => {

        return axios.post('/configuration',
          data,
          {
            headers: AuthHeader(),
          })
      }

}
export default new GroupListAPI();