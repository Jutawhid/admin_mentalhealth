import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';

// interface for API call
interface apiCall {
  (): Promise<any>;
}

// class define for Branch
class AttendanceAPI {
  // get data
  getBranchList: apiCall = () => {
    return axios.get('/branch/list', { headers: AuthHeader() });
  };
  // get data
  checkAttendance: apiCall = () => {
    return axios.post(
      '/attendance/checkIsGiveAttendance',
      {},
      { headers: AuthHeader() },
    );
  };

  // Take attendance
  TakeAttendance: any = (data: any) => {
    console.log('data', data);
    return axios.post(
      '/attendance/take',
      {
        latitude: data.latitude as string,
        longitude: data.longitude as string,
      },
      { headers: AuthHeader() },
    );
  };
  // My attendance
  MyAttendance: any = async (data: any) => {
    let req = await axios.post(
      '/attendance/getMyAttendance',
      {
        from_date: data.from_date as Date,
        to_date: data.to_date as Date,
      },
      { headers: AuthHeader() },
    );
    return req;
  };
  // My attendance
  AllAttendance: any = async (data: any) => {
    let req =  axios.post(
      '/attendance/getEmployeeAttendanceList',
      {
        date: data.date as Date,
      },
      { headers: AuthHeader() },
    );
    return req;
  };
  // My attendance
  SubOrdinateAttendance: any = (data: any) => {
    return axios.post(
      '/attendance/getMySubordinateIndividualAttendance',
      {
        from_date: data.from_date as Date,
        to_date: data.to_date as Date,
        subordinate_id: data.subordinate_id as number,
      },
      { headers: AuthHeader() },
    );
  };
  // My attendance
  ApproveSubOrdinateAttendance: any = (data: any, selectedList: any) => {
    return axios.post(
      '/attendance/approveMySubordinateAttendance',
      {
        attendance_date: data.attendance_date as Date,
        attendance_list: data.selectedList as any,
      },
      { headers: AuthHeader() },
    );
  };
}

export default new AttendanceAPI();
