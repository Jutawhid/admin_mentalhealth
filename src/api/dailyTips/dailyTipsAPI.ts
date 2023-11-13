import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';



class DailyTipsAPI {

    addNewDailyTips:any = (data:any)=>{
        return axios.post('/daily-tips/add',data,{ headers: AuthHeader()})
    }

    getDailyTipsAllData:any=()=>{
       return axios.get('/daily-tips/list',{ headers: AuthHeader()});
    }



    changeStatus:any = (id:number)=>{
        return axios.put('/daily-tips/changeStatus',{id:id},{ headers: AuthHeader()})
    }

    deleteDailyTips:any = (id:number)=>{
        //console.log("group Delete")
      return axios.delete('/daily-tips/delete', {
          data: { id: id },
          headers: AuthHeader(),
        })
    }

    getDailyTipsDetails:any = (id:number)=>{
        return axios.get(`/daily-tips/details/${id}`,{ headers: AuthHeader() })
    }

    updateDailyTips = (data:any) => {

        return axios.put('/daily-tips/update',
          data,
          {
            headers: AuthHeader(),
          })
      }

    

}
export default new DailyTipsAPI();