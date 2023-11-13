import { Link } from 'react-router-dom'
import { KTSVG } from '../../../_jutemplate/helpers'

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
  return (
    <div className={`card`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          {/* <span className="card-label fw-bolder fs-3 mb-1">
            Leave Category List
          </span> */}
          <span className="text-muted mt-1 fw-bold fs-7">
            Total {employeeList?.length} Leave Categories
          </span>
        </h3>
        <div className="card-toolbar">
          {/* begin::Menu */}
          <Link to="/employee/onboard" className="btn btn-sm btn-primary">
            <span className="indicator-label">
              <KTSVG
                path="/media/icons/duotune/arrows/arr087.svg"
                className="svg-icon-3 ms-2 me-3"
              />
            </span>
            Onboard Employee
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        {employeeList?.length > 0 && (
          <div className="table-responsive">
            {/* begin::Table */}
            <table
              id="kt_datatable"
              className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"
            >
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bolder text-muted  text-center">
                  <th className="min-w-50px">#</th>
                  <th className="min-w-150px">Name</th>
                  <th className="min-w-150px">Department</th>
                  <th className="min-w-130px">Designation</th>
                  <th className="min-w-120px">Employee Type</th>
                  <th className="min-w-120px">Email</th>
                  <th className="min-w-120px">Role</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {employeeList.map((item: any, index: any) => (
                  <tr key={index} className="text-center">
                    <td className="text-dark fw-bolder">
                      {item?.employee_id_no}
                    </td>
                    <td className="text-dark text-hover-primary fw-bolder text-capitalize">
                      {item?.first_name + ' ' + item?.last_name}
                    </td>
                    <td>
                      <span className="text-dark fw-bold fs-6">
                        {item?.department_title}
                      </span>
                    </td>
                    <td className="text-dark fw-bolder fs-6">
                      {item?.designation_title}
                    </td>
                    <td>
                      <span className="fs-7 m-1">
                        {item?.employee_type_title}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-light-info fs-7 m-1">
                        {item?.official_email}
                        {item?.personal_email && (
                          <p style={{ lineHeight: '20px' }}></p>
                        )}
                        {item?.personal_email && item?.personal_email}
                      </span>
                    </td>
                    <td className="text-capitalize text-dark fw-bold">
                      {item?.role_name}
                    </td>
                    <td className="text-end">
                      <button
                        onClick={() =>
                          changeStatusAction(item?.id, item?.status)
                        }
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 "
                      >
                        {item?.status === 1 ? (
                          <i className="fa fa-toggle-on btn-active"> </i>
                        ) : (
                          <i className="fa fa-toggle-off"> </i>
                        )}
                      </button>
                      {item?.status === 1 ? (
                        <Link
                          to={`/employee/edit/${item.id}`}
                          state={{ item }}
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        >
                          <KTSVG
                            path="/media/icons/duotune/art/art005.svg"
                            className="svg-icon-3"
                          />
                        </Link>
                      ) : (
                        <></>
                      )}

                      <button
                        onClick={() => {
                          item.id && deleteEmployee(item.id as number)
                        }}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <KTSVG
                          path="/media/icons/duotune/general/gen027.svg"
                          className="svg-icon-3"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
        )}
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}
