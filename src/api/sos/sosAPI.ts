import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';
import { Default } from 'react-toastify/dist/utils';



class SOS {
    
    addSOS:any = (data:any)=>{
        console.log(data);
        return axios.post('/sos/add',
        data,
        {
         headers: AuthHeader()
        })
    }

    getAllSOS:any = ()=>{
        return axios.get('/sos/list',{ headers: AuthHeader()})
     }
     ////
     changeStatus:any = (id:number)=>{
        return axios.put('/sos/changeStatus',{id:id},{ headers: AuthHeader()})
     }
     ////
     deleteSOS:any = (id:number)=>{
      return axios.delete('/sos/delete', {
          data: { id: id },
          headers: AuthHeader(),
        })
     }

    getSOSDetail: any = (id: number) => {
        return axios.get(`/sos/details/${id}`, { headers: AuthHeader(), })
      }

    updateSOS = (id:number,data:any) =>{

        return axios.put('/sos/update',
        {
            id : id,
            title : data.title,
            number : data.number
        },
        {
         headers: AuthHeader(),
        })
     }
}

export default new SOS();