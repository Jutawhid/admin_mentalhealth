import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';



class PackageAPI {

  getAllPackage:any = ()=>{
      return axios.get('/package/list',{ headers: AuthHeader()})
  }

  changeStatus:any = (id:number)=>{
    return axios.put('/package/changeStatus',{id:id},{ headers: AuthHeader()})
  }

  deletePackage:any = (id:number)=>{
    return axios.delete('/package/delete', {
        data: { id: id },
        headers: AuthHeader(),
      })
   }
  
   addPackage:any = (data:any)=>{
     //console.log(data);
    return axios.post('/package/add',
    {
    
        title: data.title,
        duration: data.duration,
        price: data.price,
        discount_amount: data.discountAmount
    },
    {
      headers: AuthHeader()
    })

   }

   getPackageDetail: any = (id: number) => {
    return axios.get(`/package/details/${id}`, { headers: AuthHeader(), })
   }

   updatePackage = (id:number,data:any) =>{
    return axios.put('/package/update',
    {
       
        
            id: id,
            title: data.title,
            duration: data.duration,
            price:data.price,
            discount_amount: data.discountAmount
        
    },
    {
     headers: AuthHeader(),
    })
 }

}

export default new PackageAPI();