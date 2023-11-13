import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';


class WorkshopAPI {
   
      getAllList: any = () => {
        return axios.get('/workshop/list', { headers: AuthHeader() });
      }

      addWorkshop:any = (data:any)=>{

        return axios.post('/workshop/add', 
          data,
          {
          headers: AuthHeader(),
          })

      }

      changeStatus: any = (id: number) => {
        return axios.put(
          `/workshop/changeStatus`,
          {
            id: id,
          },
          {
            headers: AuthHeader(),
          },
        )
      }

      deleteWorkshop = (id: number) => {
        
        return axios.delete('/workshop/delete', {
          data: { id: id },
          headers: AuthHeader(),
        })
      }

      getAllParticipantList: any = (id:number) => {
        return axios.get(`/workshop/participantList/${id}`, { headers: AuthHeader() });
      }
     
      getDetails:any = (id:number)=>{
        return axios.get(`/workshop/details/${id}`,{ headers: AuthHeader() })
      }

      updateWorkshop:any = (data:any) =>{

        return axios.put('workshop/update',
         data,
        {
         headers: AuthHeader(),
        })
     }

}

export default new WorkshopAPI()