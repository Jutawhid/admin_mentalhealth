import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import employeeCrudAPI from '../../../api/employee/employeeCrudAPI';
import { PageTitle } from '../../../_jutemplate/layout/core';
import { LeaveManageTable } from './Table';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { KTSVG } from '../../../_jutemplate/helpers';

export default function AllEmployee() {
  const [employeeList, setEmployeeList] = useState<any[]>([]);
  const [searchTitle, setSearchTitle] = useState('');
  const store = useSelector((state: any) => state);
  const { user } = store.auth as any;
  // delete action
  const deleteEmployee = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Click Proceed button to continue !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        // remove from state
        employeeCrudAPI.deleteEmployee(id).then(
          (res: any) => {
            if (res.data.success) {
              fetchEmpList();
              toast(res.data.message, {
                theme: 'dark',
              });
              setEmployeeList(employeeList.filter(type => type.id !== id));
            } else {
              toast(res.data.message, {
                theme: 'dark',
              });
            }
          },
          (err: any) => {
            if (err.response.data.success === false) {
              // error alart
              toast.error(err.response.data.message, {
                theme: 'dark',
              });
            }
          },
        );
      }
    });
  };

  const fetchEmpList = () => {
    // call attendance type list API
    employeeCrudAPI.getEmployees().then(
      (res: any) => {
        if (res.data.success) {
          setEmployeeList(res?.data?.data);

          // console.log(branchFullName);
        } else {
          console.log(res?.data?.message);
        }
      },
      (err: any) => {
        if (err.response.data.success === false) {
          // error alart
          toast.error(err.response.data.message, {
            theme: 'dark',
          });
        }
      },
    );
  };
  // status change
  const statusChangeAction = (id: number, status: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to change this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then(result => {
      if (result.isConfirmed) {
        // remove from state
        employeeCrudAPI.statusChange(id).then((res: any) => {
          if (res.data.success) {
            toast(res.data.message, {
              theme: 'dark',
            });
            fetchEmpList();
          } else {
            toast(res.data.message, {
              theme: 'dark',
            });
          }
        });
      }
    });
  };
  const onChangeSearchTitle = (e: any) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    console.log(employeeList);
    // setSearchTitle(searchTitle);
    if (searchTitle.length > 0) {
      setEmployeeList(
        employeeList.filter(value =>
          value.employee_id_no
            .toLowerCase()
            .includes(searchTitle.toLowerCase()),
        ),
      );
    } else {
      fetchEmpList();
    }
  };
  useEffect(() => {
    // call employee list API
    employeeCrudAPI.getEmployees().then(
      (res: any) => {
        if (res.data.success) {
          setEmployeeList(res?.data?.data);

          // console.log(branchFullName);
        } else {
          console.log(res?.data?.message);
        }
      },
      (err: any) => {
        if (err.response.data.success === false) {
          // error alart
          toast.error(err.response.data.message, {
            theme: 'dark',
          });
        }
      },
    );
  }, []);
  return (
    <>
      <PageTitle>All Employees</PageTitle>
      <div className={`card`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            {/* <span className="card-label fw-bolder fs-3 mb-1">
            Leave Category List
          </span> */}
            <div className="d-flex align-items-center position-relative my-1">
              <span className="svg-icon svg-icon-1 position-absolute ms-6">
                <KTSVG
                  path="/media/icons/duotune/general/gen021.svg"
                  className="svg-icon-1"
                />
              </span>
              <input
                type="text"
                data-kt-user-table-filter="search"
                className="form-control form-control-solid w-250px ps-14"
                placeholder="Search by Employee ID"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </div>
            <span className="text-muted mt-1 fw-bold fs-7">
              Total {employeeList?.length} Employees
            </span>
          </h3>
          <div className="card-toolbar">
            {/* begin::Menu */}
            <>
              {user.permissions?.includes('employeeCreate') ? (
                <Link to="/employee/onboard" className="btn btn-sm btn-primary">
                  <span className="indicator-label">
                    <KTSVG
                      path="/media/icons/duotune/arrows/arr087.svg"
                      className="svg-icon-3 ms-2 me-3"
                    />
                  </span>
                  Onboard Employee
                </Link>
              ) : (
                <></>
              )}
            </>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <LeaveManageTable
          employeeList={employeeList}
          deleteEmployee={deleteEmployee}
          changeStatusAction={statusChangeAction}
        />
      </div>
    </>
  );
}
