import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';


class WorkshopTypeAPI {
   
      getWorkshopActivList: any = () => {
        return axios.get('/workshop-type/activeList', { headers: AuthHeader() });
      }

      getAllList = ()=>{
        return axios.get('/workshop-type/list', { headers: AuthHeader() });
      }
     
      addWorkShopType: any = (data: any) => {
        return axios.post('/workshop-type/add',
          {
            title: data.title,
          },
          {
            headers: AuthHeader(),
          }
        )
      }

      changeStatus: any = (id: number) => {
        return axios.put(
          `workshop-type/changeStatus`,
          {
            id: id,
          },
          {
            headers: AuthHeader(),
          },
        )
      }

      deleteWorkshopType = (id: number) => {
        
        return axios.delete('workshop-type/delete', {
          data: { id: id },
          headers: AuthHeader(),
        })
      }

      getDetails = (id:number)=>{
        return axios.get(`/workshop-type/details/${id}`,{ headers: AuthHeader() })
      }

      updateWorkshopType = (id:number,data:any) =>{

        return axios.put('/workshop-type/update',
        {
            id : id,
            title : data.title
        
        },
        {
         headers: AuthHeader(),
        })
     }

      

}

export default new WorkshopTypeAPI()