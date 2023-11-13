import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';



class PackageAPI {
 
    getDetails: any = () => {

        return axios.get(`/user/me`, {
          headers: AuthHeader(),
        })
      }

    updateProfile: any = (data: any) => {
        return axios.put(
          '/admin/profile/update',data,
          { headers: AuthHeader() },
        )
      }

    changePassword:any = (oldPassword: string, newPassword: string) => {
        return axios.post('/user/password-change',
          {
            new_password: newPassword ,
            old_password: oldPassword ,
          },
          { headers: AuthHeader() },
        )
      }

}

export default new  PackageAPI();