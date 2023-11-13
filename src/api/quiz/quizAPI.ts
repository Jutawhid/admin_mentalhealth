import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';

class QuizAPI {
    getAllQuiz = ()=>{
        return axios.get('/personality-quiz/list',{ headers: AuthHeader()})
    }
    
    addQuiz:any = (question:string)=>{
        return axios.post('/personality-quiz/add',
        {
          question:question   
        },
        {
         headers: AuthHeader()
        })
    }

    changeStatus:any = (id:number)=>{
        return axios.put('/personality-quiz/changeStatus',{id:id},{ headers: AuthHeader()})
     }
     ////
    deleteQuiz:any = (id:number)=>{
      return axios.delete('/personality-quiz/delete', {
          data: { id: id },
          headers: AuthHeader(),
        })
     }

     getQuizDetail: any = (id: number) => {
        return axios.get(`/personality-quiz/details/${id}`, { headers: AuthHeader(), })
      }

      updateQuiz = (id:number,question:string) =>{

        return axios.put('/personality-quiz/update',
        {   id:id,
            question:question   
        },
        {
         headers: AuthHeader(),
        })
     }
}

export default new QuizAPI();