import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';
import { Console } from 'console';



class GroupTopicAPI {

  addGroupTopic:any = (data:any)=>{
     return axios.post('/group-topic/add',
     {
        title:data.title
     },
     {
       headers:AuthHeader()
     })
  }

  getAllGroupTopic:any = ()=>{
      return axios.get('/group-topic/list',{ headers: AuthHeader()})
  }
  
  changeStatus:any = (id:number)=>{
    return axios.put('/group-topic/changeStatus',{id:id},{ headers: AuthHeader()})
  }

  deleteGroupTopic:any = (id:number)=>{
     //console.log("group Delete")
    return axios.delete('/group-topic/delete', {
        data: { id: id },
        headers: AuthHeader(),
      })
   }

   updateGroupTopic = (id:number,data:any) =>{

    return axios.put('/group-topic/update',
    {
        id : id,
        title : data.title
    
    },
    {
     headers: AuthHeader(),
    })
   }

   getDetails = (id:number)=>{
    return axios.get(`group-topic/details/${id}`,{ headers: AuthHeader() })
   }
    
   getActiveGroupTopic = ()=>{
      return axios.get('/group-topic/activeList',{ headers: AuthHeader() })
   }
   

}



export default new GroupTopicAPI();