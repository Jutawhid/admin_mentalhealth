import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// class define for User Profile
class ProfileAPI {
  // get data
  changePassword = (data: any) => {
    return axios.post(
      '/user/password-change',
      {
        new_password: data?.newPassword as string,
        old_password: data?.currentPassword as string,
      },
      { headers: AuthHeader() },
    )
  }

  // get profile data
  getProfileData = () => {
    return axios.get('/user/me', {
      headers: AuthHeader(),
    })
  }

  // update work experience
  updateEducation: any = (data: any) => {
    return axios.put('/employee/updateOwnEducation', data, {
      headers: AuthHeader(),
    })
  }
  // update training
  updateTraining: any = (data: any) => {
    return axios.put('/employee/updateOwnTraining', data, {
      headers: AuthHeader(),
    })
  }
  // add own training
  addOwnTraining: any = async (data: any) => {
    return axios.post('/employee/addOwnTraining', data, {
      headers: AuthHeader(),
    })
  }
  // delete own training
  deleteOwnTraining: any = async (data: any) => {
    return axios.delete('/employee/deleteOwnTraining', {
      data: data,
      headers: AuthHeader(),
    })
  }
  // update work experience
  updateWorkExperience: any = (data: any) => {
    return axios.put('/employee/updateOwnExperience', data, {
      headers: AuthHeader(),
    })
  }

  // get personal info data
  getPersonalInfoData = () => {
    return axios.get('/employee/employeeOwnDetails', {
      headers: AuthHeader(),
    })
  }

  // employee family information update
  updateOwnFamilyInformation: any = (data: any) => {
    return axios.put('/employee/updateOwnFamilyInformation', data, {
      headers: AuthHeader(),
    })
  }
  // delete work experience
  deleteExperience: any = (id: number) => {
    return axios.delete('/employee/deleteOwnExperience' + id, {
      headers: AuthHeader(),
    })
  }
  // delete own education
  deleteOwnEducation: any = (data: any) => {
    return axios.delete('/employee/deleteOwnEducation', {
      data: data,
      headers: AuthHeader(),
    })
  }
  //  update reference
  updateReference: any = (data: any) => {
    return axios.put('/employee/updateOwnReference', data, {
      headers: AuthHeader(),
    })
  }
  // delete work experience
  deleteReference: any = (data: any) => {
    return axios.delete('/employee/deleteOwnReference', {
      data: data,
      headers: AuthHeader(),
    })
  }

  // update document
  updateDocument: any = (data: any) => {
    return axios.put('/employee/updateOwnDocuments', data, {
      headers: AuthHeader(),
    })
  }
  // delete work experience
  deleteEmpExperience: any = (data: any) => {
    return axios.delete('/employee/deleteOwnExperience', {
      data: data,
      headers: AuthHeader(),
    })
  }
  // add work experience
  addOwnExperience: any = async (data: any) => {
    return axios.post('/employee/addOwnExperience', data, {
      headers: AuthHeader(),
    })
  }
  // add education
  addOwnEducation: any = async (data: any) => {
    return axios.post('/employee/addOwnEducation', data, {
      headers: AuthHeader(),
    })
  }

  // add education
  addOwnReference: any = async (data: any) => {
    return axios.post('/employee/addOwnReference', data, {
      headers: AuthHeader(),
    })
  }

  // get employee hardware list
  getHardwareList: any = async () => {
    return axios.get('/assigned-hardware/my-using-device', {
      headers: AuthHeader(),
    })
  }
  // profile personal info update
  updateOwnProfile: any = (data: any) => {
    return axios.put('/employee/updateOwnProfile', data, {
      headers: AuthHeader(),
    })
  }
  // get assigned leaves by userID
  getAssignedLeaves: any = async () => {
    return axios.get(`/employee/employeeOwnLeaveDetails`, {
      headers: AuthHeader(),
    })
  }
}

export default new ProfileAPI()
