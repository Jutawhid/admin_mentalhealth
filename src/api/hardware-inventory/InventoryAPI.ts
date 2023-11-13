import axios from '../BASE_API'
import AuthHeader from '../AuthHeader'

// interface for API call
interface apiCall {
  (): Promise<any>
}

// class define
class InventoryAPI {
  // get data
  getTypes: apiCall = () => {
    return axios.get('/hardware-list/list', { headers: AuthHeader() })
  }
  // create
  createType: any = (data: any) => {
    console.log('data', data)
    return axios.post(
      '/hardware-list/add',
      {
        dept_id: data?.dept_id as number,
        hardware_cat_id: data?.hardware_cat_id as number,
        buying_date: data?.buying_date as string,
        details: data?.details as string,
        title: data?.title as string,
      },
      { headers: AuthHeader() },
    )
  }
  // edit
  editType: any = (data: any) => {
    console.log('data', data)
    return axios.put(
      '/hardware-list/update',
      {
        id: data.id as number,
        dept_id: data?.dept_id as number,
        hardware_cat_id:
          (data?.hardware_cat_id[0]?.value as number) ||
          (data?.hardware_cat_id?.value as number),
        buying_date: data?.buying_date as string,
        details: data?.details as string,
        title: data?.title as string,
      },
      { headers: AuthHeader() },
    )
  }
  // delete
  deleteType: any = (id: number) => {
    return axios.delete(`/hardware-list/delete`, {
      data: {
        id: id as number,
      },
      headers: AuthHeader(),
    })
  }

  // change status
  changeStatus: any = (id: number) => {
    return axios.put(
      `/hardware-list/changeStatus`,
      {
        id: id as number,
      },
      { headers: AuthHeader() },
    )
  }
  // get details
  getDetails: any = (id: number) => {
    return axios.get(`/hardware-list/details/+${id}`, { headers: AuthHeader() })
  }
  // get device-previous-records
  getDeviceHistory: any = (id: number) => {
    return axios.get(`/assigned-hardware/device-previous-records/+${id}`, { headers: AuthHeader() })
  }
}

export default new InventoryAPI()
