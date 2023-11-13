import axios from '../../BASE_API';
import AuthHeader from '../../AuthHeader';



class CrossWordAPI {

   
    addNewCrossWord:any = (topic_id:number,question:string,answer:any)=>{
        return axios.put('/game/cross-word-question/add',
        {  
            topic_id : topic_id,
            question : question,
            answer : answer
        },
        { headers: AuthHeader()})
    }

    getCrossWordData:any=()=>{
       return axios.get('/game/cross-word-question/list',{ headers: AuthHeader()});
    }

    changeStatus:any = (id:number)=>{
        return axios.put('/game/cross-word-question/changeStatus',{id:id},{ headers: AuthHeader()})
    }

    deleteCrossWord:any = (id:number)=>{
        //console.log("group Delete")
      return axios.delete('/game/cross-word-question/delete', {
          data: { id: id },
          headers: AuthHeader(),
        })
    }
    
    getActiveGameTopic:any = ()=>{
        return axios.get('/game-topic/activeList',{ headers: AuthHeader()});
    }

    crossWordDetails:any = (id:number)=>{
        return axios.get(`/game/cross-word-question/details/${id}`,{ headers: AuthHeader() })
    }

    updateCrossWord = (id:number,topic_id:string,question:string,answer:any) => {

        return axios.put('/game/cross-word-question/add',
          { id:id,
            topic_id : topic_id,
            question : question,
            answer : answer
          },
          {
            headers: AuthHeader(),
          })
      }

    

}
export default new CrossWordAPI();