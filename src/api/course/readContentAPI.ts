import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';



class ReadContentAPI {

    addNewReadContent:any = (id:number,data:any)=>{
        return axios.post('/course-read-content/add',
        {   course_id:id,
            title:data.title,
            details:data.details,
            read_time:data.read_time
        },
        { headers: AuthHeader()})
    }

    getReadContent:any=(id:number)=>{
       return axios.get(`/course-read-content/list/${id}`,{ headers: AuthHeader()});
    }



    changeStatus:any = (id:number)=>{
        return axios.put('/course-read-content/changeStatus',{id:id},{ headers: AuthHeader()})
    }

    deleteReadContent:any = (id:number)=>{
        //console.log("group Delete")
      return axios.delete('/course-read-content/delete', {
          data: { id: id },
          headers: AuthHeader(),
        })
    }
    

    getReadContentDetails:any = (id:number)=>{
        return axios.get(`/course-read-content/details/${id}`,{ headers: AuthHeader() })
    }

    updateReadContent = (id:number,courseID:number,data:any) => {

        return axios.post('/course-read-content/update',
          {
            course_id :courseID,
            title: data.title,
            details:data.details,
            read_time:data.read_time,
            id:id
          },
          {
            headers: AuthHeader(),
          })
      }


 

    

}
export default new  ReadContentAPI();