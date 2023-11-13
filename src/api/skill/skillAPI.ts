import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';



class SkillAPI {

   addSkill:any = (data:any)=>{
       console.log(data);
       return axios.post('/skill-set/add',
       data,
       {
        headers: AuthHeader()
       })
   }
   ////
   getAllSkill:any = ()=>{
      return axios.get('/skill-set/list',{ headers: AuthHeader()})
   }
   ////
   changeStatus:any = (id:number)=>{
      return axios.put('/skill-set/changeStatus',{id:id},{ headers: AuthHeader()})
   }
   ////
   deleteSkill:any = (id:number)=>{
    return axios.delete('/skill-set/delete', {
        data: { id: id },
        headers: AuthHeader(),
      })
   }

   getSkillDetail: any = (id: number) => {
      return axios.get(`/skill-set/details/${id}`, { headers: AuthHeader(), })
    }

    updateSkill = (data:any) =>{

      return axios.put('/skill-set/update',data,
      {
       headers: AuthHeader(),
      })
   }
}

export default new SkillAPI;