import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// class define for employee permission
class employeePermissionAPI {
  // get list of employee permission
  permissionList: any = async (userID: any) => {
    return axios.get('/employee/employeePermissionList/' + userID, {
      headers: AuthHeader(),
    })
  }

  // update permission
  updatePermission: any = async (data: any) => {
    return axios.post('/employee/updateEmployeePermission', data, {
      headers: AuthHeader(),
    })
  }
}

export default new employeePermissionAPI()
