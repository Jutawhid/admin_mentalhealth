import axios from '../../BASE_API';
import AuthHeader from '../../AuthHeader';




class MCQAPI {

    addNewMCQ:any = (value:any,answer:any)=>{
        return axios.put('/game/mcq/add',
        {   
            topic_id : value.topic_id,
            question : value.question,
            options : value.option,
            answer : answer
        },
        { headers: AuthHeader()})
    }

    getMCQData:any=()=>{
       return axios.get('/game/mcq/list',{ headers: AuthHeader()});
    }



    changeStatus:any = (id:number)=>{
        return axios.put('/game/mcq/changeStatus',{id:id},{ headers: AuthHeader()})
    }

    deleteMCQ:any = (id:number)=>{
        //console.log("group Delete")
      return axios.delete('/game/mcq/delete', {
          data: { id: id },
          headers: AuthHeader(),
        })
    }
    
    getActiveGameTopic:any = ()=>{
        return axios.get('/game-topic/activeList',{ headers: AuthHeader()});
    }

    getMcqDetails:any = (id:number)=>{
        return axios.get(`/game/mcq/details/${id}`,{ headers: AuthHeader() })
    }

    updateMcq:any = (id:number,value:any,answer:any)=>{
        return axios.put('/game/mcq/add',
        {   id:id,
            topic_id : value.topic_id,
            question : value.question,
            options : value.option,
            answer : answer
        },
        { headers: AuthHeader()})
    }

    

}
export default new MCQAPI();