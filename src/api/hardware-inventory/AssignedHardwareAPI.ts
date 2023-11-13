import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define
class AssignedHardwareAPI {
  // get data
  getAssignedList: apiCall = () => {
    return axios.get('/assigned-hardware/list', { headers: AuthHeader() })
  }
  // get data
  getNotAssignHardwareList: apiCall = () => {
    return axios.get('/assigned-hardware/not-assign-list', { headers: AuthHeader() })
  }
  // create
  createAssign: any = (data: any) => {
    console.log('data', data)
    return axios.post(
      '/assigned-hardware/add',
      {
        user_id: data?.user_id as number,
        hardware_id: data?.id as number,
        assign_date: data?.assign_date as string,
      },
      { headers: AuthHeader() },
    )
  }
  // remove
  // removeAssignedHardware: any = (data: any) => {
  //   return axios.delete(
  //     '/assigned-hardware/remove-device',
  //     {
  //       id: data.id as number,
  //       release_date: data.release_date as string,
  //     },
  //     { headers: AuthHeader() },
  //   )
  // }

    // delete
    removeAssignedHardware: any = (data: any) => {
      return axios.delete(`/assigned-hardware/remove-device`, {
        data: {
          id: data.id as number,
          release_date: data.release_date as string,
        },
        headers: AuthHeader(),
      })
    }

}

export default new AssignedHardwareAPI()
