import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';



class CourseAPI {

    addNewCourse:any = (data:any)=>{
        return axios.post('/course/add',data,{ headers: AuthHeader()})
    }

    courseData:any=()=>{
       return axios.get('/course/list',{ headers: AuthHeader()});
    }



    changeStatus:any = (id:number)=>{
        return axios.put('/course/changeStatus',{id:id},{ headers: AuthHeader()})
    }

    deleteCourse:any = (id:number)=>{
        //console.log("group Delete")
      return axios.delete('/course/delete', {
          data: { id: id },
          headers: AuthHeader(),
        })
    }
    

    getCourseDetails:any = (id:number)=>{
        return axios.get(`/course/details/${id}`,{ headers: AuthHeader() })
    }

    updateCourse = (data:any) => {

        return axios.put('/course/update',
          data,
          {
            headers: AuthHeader(),
          })
      }


 

    

}
export default new  CourseAPI();