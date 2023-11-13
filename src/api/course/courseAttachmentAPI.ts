import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';



class CourseAttachmentAPI {

    // addNewReadContent:any = (id:number,data:any)=>{
    //     return axios.post('/course-read-content/add',
    //     {   course_id:id,
    //         title:data.title,
    //         details:data.details,
    //         read_time:data.read_time
    //     },
    //     { headers: AuthHeader()})
    // }

    getCourseAttachment:any=(id:number)=>{
       return axios.get(`/course-read-attachment/list/${id}`,{ headers: AuthHeader()});
    }

    getCourseAttachmentById:any=(id:number)=>{
        return axios.get(`/course-read-attachment/details/${id}`,{ headers: AuthHeader()});
     }

    
    addNewAttachment:any=(data:any)=>{
        return axios.post(`/course-read-attachment/add`,
       
           data,
      
        { headers: AuthHeader()});
     }

    changeStatus:any = (id:number)=>{
        return axios.put('/course-read-attachment/changeStatus',{id:id},{ headers: AuthHeader()})
    }

    deleteCourseReadAttachment:any = (id:number)=>{
        //console.log("group Delete")
      return axios.delete('/course-read-attachment/delete', {
          data: { id: id },
          headers: AuthHeader(),
        })
    }
    

    // getReadContentDetails:any = (id:number)=>{
    //     return axios.get(`/course-read-content/details/${id}`,{ headers: AuthHeader() })
    // }

    updateCourseAttachment = (data:any) => {

        return axios.put('/course-read-attachment/update',
           data,
          {
            headers: AuthHeader(),
          })
      }
 
    RearrangeAttachment:any = (data:any)=>{
        return axios.post('/course-read-attachment/re-arrange',
        {
          ...data
        },
       {
         headers: AuthHeader(),
       })
    }

 

    

}
export default new  CourseAttachmentAPI();