import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';



class GroupListAPI {

      getAllGroupList:any = ()=>{
          return axios.get('/group/list',{ headers: AuthHeader()})
      }

      addNewGroup:any = (data:any)=>{
        return axios.post('/group/add',
        data,
        {
          headers: AuthHeader()
        }
        )
       }

      changeStatus:any = (id:number)=>{
        return axios.put('/group/changeStatus',{id:id},{ headers: AuthHeader()})
      }

      deleteGroup:any = (id:number)=>{
        //console.log("group Delete")
      return axios.delete('/group/delete', {
          data: { id: id },
          headers: AuthHeader(),
        })
      }

      getGroupDetails:any = (id:number)=>{
        return axios.get(`/group/details/${id}`,{ headers: AuthHeader() })
      }
  
      updateGroup:any = (data:any,id:number)=>{
        return axios.put('/group/update',
        {
            id:id,
            group_topic_id:data.group_topic_id,
            title:data.title,
            description:data.description,
            total_member:data.total_member
        },
        {
         headers: AuthHeader(),
        }) 
      }

}

export default new GroupListAPI();