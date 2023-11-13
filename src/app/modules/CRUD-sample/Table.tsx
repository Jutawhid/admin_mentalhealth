import React from 'react';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../_jutemplate/helpers';
import { useSelector } from 'react-redux';
import defaultImg from './blank.png';
import DataTable from '../../../_jutemplate/dataTable/DataTable';
interface LeaveManageProps {
  deleteEmployee: (id: number) => void
  changeStatusAction: (id: number, status: number) => void
  employeeList: any[]
}
export const LeaveManageTable: React.FC<LeaveManageProps> = ({
  employeeList,
  deleteEmployee,
  changeStatusAction,
}) => {
  const store = useSelector((state: any) => state)
  const { user } = store.auth as any

  React.useEffect(() => {
    // set data
  }, [user])
  const columns = React.useMemo(
    () => [
      {
        Header: 'Photo',
        disableSortBy: false,
        Cell: (values: any) => {
          // console.log(user.data.imageFolderPath);
          return (
            <div className="symbol symbol-50px">
              <img
                key={values.row.original.id}
                src={
                  user.data.imageFolderPath +
                  '/' +
                  values.row.original.profile_image
                }
                alt=""
                // onError = {() => ("https://picsum.photos/200")}
                onError={(e) => {
                  ;(e.target as HTMLImageElement).onerror = null
                  ;(e.target as HTMLImageElement).src = defaultImg as string
                }}
              />
            </div>
          )
        },
      },
      {
        Header: 'Name',
        disableSortBy: false,
        Cell: (values: any) => {
          console.log(user)
          // console.log(user?.permissions?.includes('employeeDetails'));
          return (
            <div>
              {user.data.user_id !== values.row.original.user_id &&
              user?.permissions?.includes('employeeDetails') &&
              user?.permissions?.includes('employeeCreate') &&
              user?.permissions?.includes('employeePermissionList') ? (
                <Link
                  to={`/employee/${values.row.original.user_id}/personal-info`}
                  // state={{
                  //   userID: values.row.original.user_id,
                  // }}
                  className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                >
                  {values.row.original.first_name +
                    ' ' +
                    values.row.original.last_name}
                </Link>
              ) : (
                <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                  {values.row.original.first_name +
                    ' ' +
                    values.row.original.last_name}
                </span>
              )}
              <span
                className="text-muted fw-bold d-block fs-7"
                key={values.row.original.id}
              >
                {values.row.original.designation_title}
              </span>
            </div>
          )
        },
      },
      {
        Header: 'Employee ID',
        accessor: 'employee_id_no',
        disableSortBy: false,
      },
      {
        Header: 'Department',
        accessor: 'department_title',
        disableSortBy: false,
      },
      {
        Header: 'Email',
        accessor: 'official_email',
        disableSortBy: false,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }: any) => {
          return (
            <>
              {value === 1 ? (
                <span className="badge badge-light-success fs-7 m-1">
                  Active
                </span>
              ) : (
                <span className="badge badge-light-danger fs-7 m-1">
                  Deactive
                </span>
              )}
            </>
          )
        },
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: ({ row }) => {
          const rowIdx = parseInt(row.original.employee_table_id)
          const userIdx = parseInt(row.original.user_id)
          const rowStatus = parseInt(row.original.status)
          console.log(rowIdx)
          console.log(userIdx)
          console.log(user.data.user_id)
          // console.log(typeof rowStatus);
          return (
            <div>
              <>
                {user.permissions?.includes('updateEmployeePermission') &&
                  userIdx !== user.data.user_id && (
                    <Link
                    title='Permission Edit'
                      to={`/account-setting/${userIdx}`}
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTSVG
                        path="/media/icons/duotune/coding/cod001.svg"
                        className="svg-icon-2x"
                      />
                    </Link>
                  )}

                {user.permissions?.includes('updateAssignedLeave') &&
                  userIdx !== user.data.user_id && (
                    <Link
                    title='Assigned Leave'
                      to={`/assigned-leave/${userIdx}`}
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <i className="fas fa-clipboard-user"></i>
                    </Link>
                  )}

                {userIdx !== user.data.user_id &&
                  user.permissions?.includes('changeEmployeeStatus') && (
                    <button
                      onClick={() => changeStatusAction(userIdx, rowStatus)}
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 svg-icon-2x"
                    >
                      {rowStatus === 1 ? (
                        <i className="fa fa-toggle-on btn-active"> </i>
                      ) : (
                        <i className="fa fa-toggle-off"> </i>
                      )}
                    </button>
                  )}

                {rowStatus === 1 &&
                  userIdx !== user.data.user_id &&
                  user.permissions?.includes('employeeUpdate') && (
                    <Link
                      to={`/employee/edit/${userIdx}`}
                      state={{ rowIdx }}
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTSVG
                        path="/media/icons/duotune/art/art005.svg"
                        className="svg-icon-3"
                      />
                    </Link>
                  )}

                {userIdx !== user.data.user_id &&
                  user.permissions?.includes('employeeUpdate') && (
                    <button
                      onClick={() => {
                        deleteEmployee(userIdx as number)
                      }}
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTSVG
                        path="/media/icons/duotune/general/gen027.svg"
                        className="svg-icon-3"
                      />
                    </button>
                  )}
              </>
            </div>
          )
        },
      },
    ],
    [],
  )

  return <DataTable columns={columns} data={employeeList} />
}
