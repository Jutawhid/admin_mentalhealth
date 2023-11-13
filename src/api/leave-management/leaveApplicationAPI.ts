import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// class define
class LeaveApplicationAPI {
  // apply for leave
  applyForLeave: any = (data: any) => {
    return axios.post('/leave-application/applyLeave', data, {
      headers: AuthHeader(),
    })
  }

  // update for leave
  updateForLeave: any = (data: any) => {
    return axios.put('/leave-application/updateLeave', data, {
      headers: AuthHeader(),
    })
  }

  // get leave application list
  getLeaveApplications: any = () => {
    return axios.get('/leave-application/list', {
      headers: AuthHeader(),
    })
  }

  // approve leave
  approveLeave: any = (data: any) => {
    return axios.put('/leave-application/approveLeave', data, {
      headers: AuthHeader(),
    })
  }

  // decline leave
  declineLeave: any = (data: any) => {
    return axios.put('/leave-application/declineLeave', data, {
      headers: AuthHeader(),
    })
  }

  // get leave application => all
  getLeaveApplicationAll: any = () => {
    return axios.get(`/leave-application/allLeaveApplicationList`, {
      headers: AuthHeader(),
    })
  }

  // udpate for leave
  updateLeaveApplication: any = (data: any) => {
    return axios.put(`/leave-application/updateLeave`, data, {
      headers: AuthHeader(),
    })
  }
}

export default new LeaveApplicationAPI()
