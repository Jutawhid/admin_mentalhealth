import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useFormik } from 'formik';
import LeaveCategoryManageAPI from '../../../api/config/LeaveCategoryManageAPI';
import { PageTitle } from '../../../_jutemplate/layout/core';
import clsx from 'clsx';
import DepartmentTypeAPI from '../../../api/config/DepartmentTypeAPI';
import DesignationAPI from '../../../api/config/DesignationAPI';
import EmployeeTypeAPI from '../../../api/config/EmployeeTypeAPI';
import employeeCrudAPI from '../../../api/employee/employeeCrudAPI';
import moment from 'moment';
// initialValues
const initialValues = {
  user_id: '',
  first_name: '',
  last_name: '',
  personal_email: '',
  nid: '',
  date_of_birth: '',
  gender: '',
  religion: '',
  nationality: '',
  marital_status: '',
  address: '',
  phone_number_one: '',
  phone_number_two: '',
  profile_image: '',
  employee_type_id: '',
  department_id: '',
  designation_id: '',
  employee_id_no: '',
  official_email: '',
  joining_date: '',
  termination_date: '',
  salary: '',
  is_approve: '',
  details: '',
  user_name: '',
};

// schema validation
const employeeUpdateSchema = Yup.object().shape({
  id: Yup.number(),
  employee_type_id: Yup.string().required('Employee type is required'),
  department_id: Yup.string().required('Department is required'),
  designation_id: Yup.string().required('Designation is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  employee_id_no: Yup.string().required('Employee ID is required'),
  personal_email: Yup.string().notRequired(),
  official_email: Yup.string().required('Official mail is required'),
  joining_date: Yup.string().required('Joining Date is required'),
  salary: Yup.string().required('Salary is required'),
  user_name: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(255, 'Maximum 255 characters')
    .required('User name is required'),
});

export function EmployeeEdit() {
  // loading state
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEmpType, setSelectedEmpType] = useState<any>([]);
  const [defaultEmpType, setDefaultEmpType] = useState<any>(null);
  const [selectedDept, setSelectedDept] = useState<any>([]);
  const [defaultDept, setDefaultDept] = useState<any>([]);
  const [selectedDesignation, setSelectedDesignation] = useState<any>([]);
  const [defaultDesignation, setDefaultDesignation] = useState<any>([]);

  const [deptList, setDeptList] = useState<any>([]);
  const [designationList, setDesignationList] = useState<any>([]);
  const [empList, setEmpList] = useState<any>([]);

  // selected states
  // const [selectedLeaveCategory, setSelectedLeaveCategory] = useState<
  //   categoryType[]
  // >([])

  // navigation
  const navigate = useNavigate();
  // formik hook
  const formik = useFormik({
    initialValues,
    validationSchema: employeeUpdateSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      if (values) {
        console.log(defaultEmpType, defaultDesignation);
        let modifiedData = {
          user_id: values.user_id,
          first_name: values.first_name,
          last_name: values.last_name,
          nid: initialValues.nid,
          date_of_birth: initialValues.date_of_birth,
          gender: initialValues.gender,
          religion: initialValues.religion,
          nationality: initialValues.nationality,
          marital_status: initialValues.marital_status,
          address: initialValues.address,
          phone_number_one: initialValues.phone_number_one,
          phone_number_two: initialValues.phone_number_two,
          profile_image: initialValues.profile_image,
          details: initialValues.details,
          employee_type_id: Array.isArray(defaultEmpType)
            ? defaultEmpType[0].value
            : defaultEmpType.value || values.employee_type_id,
          department_id: Array.isArray(defaultDept)
            ? defaultDept[0].value
            : defaultDept.value || values.department_id,
          designation_id: Array.isArray(defaultDesignation)
            ? defaultDesignation[0].value
            : defaultDesignation.value || values.designation_id,
          employee_id_no: values.employee_id_no,
          personal_email: values.personal_email,
          official_email: values.official_email,
          joining_date: values.joining_date,
          salary: values.salary,
          user_name: values.user_name,
        };
        // console.log(modifiedData)
        employeeCrudAPI.editEmployee(modifiedData as any).then(
          (res: any) => {
            if (res.data.success) {
              setLoading(false);
              formik.resetForm();
              navigate('/employee-list');
              toast(res.data.message, {
                theme: 'dark',
              });
            } else {
              setLoading(false);
              setStatus(res.data.message);
              setSubmitting(false);
              toast.error(res.data.message, {
                theme: 'dark',
              });
            }
          },
          (err: any) => {
            console.log(err.response.data.message);
            // loading(false)
            setLoading(false);
            //   if success === false
            if (err.response.data.success === false) {
              setStatus(err.response.data.message);
              setSubmitting(false);
              // alart -> error
              toast.error(err.response.data.message, {
                theme: 'dark',
              });
            }
          },
        );
      }
    },
  });
  const animatedComponents = makeAnimated();

  // initialize data
  useEffect(() => {
    let url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    if (id) {
      employeeCrudAPI.getDetails(id).then(
        (res: any) => {
          // console.log(res?.data?.data);
          initialValues.user_id = res?.data?.data?.user_id;
          initialValues.first_name = res?.data?.data?.first_name;
          initialValues.last_name = res?.data?.data?.last_name;
          initialValues.personal_email = res?.data?.data?.personal_email;
          initialValues.nid = res?.data?.data?.nid;
          initialValues.date_of_birth = res?.data?.data?.date_of_birth;
          initialValues.gender = res?.data?.data?.gender;
          initialValues.religion = res?.data?.data?.religion;
          initialValues.nationality = res?.data?.data?.nationality;
          initialValues.marital_status = res?.data?.data?.marital_status;
          initialValues.address = res?.data?.data?.address;
          initialValues.phone_number_one = res?.data?.data?.phone_number_one;
          initialValues.phone_number_two = res?.data?.data?.phone_number_two;
          initialValues.profile_image = res?.data?.data?.profile_image;

          initialValues.employee_type_id = res?.data?.data?.employee_type_id;
          initialValues.department_id = res?.data?.data?.department_id;
          initialValues.designation_id = res?.data?.data?.designation_id;
          initialValues.employee_id_no = res?.data?.data?.employee_id_no;
          initialValues.official_email = res?.data?.data?.official_email;
          initialValues.termination_date = res?.data?.data?.termination_date;
          initialValues.joining_date = moment(res?.data?.data?.joining_date)
            .utc()
            .format('YYYY-MM-DD');
          initialValues.is_approve = res?.data?.data?.is_approve;
          initialValues.details = res?.data?.data?.details;
          initialValues.salary = res?.data?.data?.salary;
          initialValues.user_name = res?.data?.data?.user_name;

          // store employee types
          EmployeeTypeAPI.getEmployeeTypes().then((res: any) => {
            // console.log(res?.data?.data);
            if (res?.data?.data) {
              setEmpList(
                res.data.data.map((e: any) => {
                  return {
                    value: e.id,
                    label: e.title,
                  };
                }),
              );
            }
          });

          setDefaultEmpType([
            {
              value: res?.data?.data?.employee_type_id,
              label: res?.data?.data?.employee_type_title,
            },
          ]);

          DepartmentTypeAPI.getTypes().then((res2: any) => {
            // console.log(res2.data.data);
            if (res2?.data?.data) {
              setDeptList(
                res2?.data.data.map((e: any) => {
                  return {
                    value: e.id,
                    label: e.title,
                  };
                }),
              );
            }
          });
          // set default => department
          setDefaultDept([
            {
              value: res?.data?.data?.department_id,
              label: res?.data?.data?.department_title,
            },
          ]);

          DesignationAPI.getTypes().then((res2: any) => {
            if (res2?.data?.data) {
              setDesignationList(
                res2.data.data.map((e: any) => {
                  return {
                    value: e.id,
                    label: e.title,
                  };
                }),
              );
            }
          });
          // set default => department
          setDefaultDesignation([
            {
              value: res?.data?.data?.designation_id,
              label: res?.data?.data?.designation_title,
            },
          ]);

          formik.setValues(initialValues);
        },
        (err: any) => {
          if (err?.response?.data?.success === false) {
            toast.error(err?.response?.data?.message, {
              theme: 'dark',
            });
          }
        },
      );
    }
  },[setDefaultEmpType, setDefaultDept, setDefaultDesignation]);
  // select department action
  const onDepartmentAction = (value: any) => {
    initialValues.department_id = value?.value || 0;
    initialValues.designation_id = '';
    // setSelectedDept(value);
    setDefaultDept(value);
    setSelectedDesignation(null);
    setDesignationList(null);
    setDefaultDesignation(null);
    // store designations
    DesignationAPI.getTypes().then((res: any) => {
      if (res?.data?.data) {
        let filterData = res?.data?.data?.filter(
          (e: any) => e.dept_id === value?.value,
        );
        let mapData = filterData.map((e: any) => {
          return {
            ...e,
            value: e.id,
            label: e.title,
          };
        });
        setDesignationList(mapData);
      }
    });
  };

  // select designation action
  const onDesignationAction = (value: any) => {
    initialValues.designation_id = value?.value;
    setSelectedDesignation(value);
    setDefaultDesignation(value);
  };

  // select employee action
  const onEmployeeTypeAction = (value: any) => {
    setSelectedEmpType(value);
    setDefaultEmpType(value);
    console.log(value);
    initialValues.employee_type_id = value?.value;
  };

  // render
  return (
    <>
      <PageTitle>Update Employee</PageTitle>
      <div className="card">
        <div className="col-lg-12 card-header border-0 py-5">
          {/* form starts */}
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="form w-100">
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="employeeType" className="required">
                    First Name
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="First Name"
                    {...formik.getFieldProps('first_name')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.first_name && formik.errors.first_name,
                      },
                      {
                        'is-valid':
                          formik.touched.first_name &&
                          !formik.errors.first_name,
                      },
                    )}
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <div className="fv-plugins-message-container mt-2 mb-5">
                      <div className="fv-help-block">
                        <span role="alert" className="error">
                          {formik.errors.first_name}
                        </span>
                      </div>
                    </div>
                  )}
                  <input type="hidden" {...formik.getFieldProps('id')} />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="details" className="required">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...formik.getFieldProps('last_name')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.last_name && formik.errors.last_name,
                      },
                      {
                        'is-valid':
                          formik.touched.last_name && !formik.errors.last_name,
                      },
                    )}
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div className="fv-plugins-message-container mt-2 mb-5">
                      <div className="fv-help-block">
                        <span role="alert" className="error">
                          {formik.errors.last_name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="employeeType" className="optional">
                    Personal Email
                  </label>
                  <input
                    type="email"
                    autoComplete="off"
                    placeholder="Enter Personal Email"
                    {...formik.getFieldProps('personal_email')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.personal_email &&
                          formik.errors.personal_email,
                      },
                      {
                        'is-valid':
                          formik.touched.personal_email &&
                          !formik.errors.personal_email,
                      },
                    )}
                  />
                  {formik.touched.personal_email &&
                    formik.errors.personal_email && (
                      <div className="fv-plugins-message-container mt-2 mb-5">
                        <div className="fv-help-block">
                          <span role="alert" className="error">
                            {formik.errors.personal_email}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="details" className="required">
                    User ID
                  </label>
                  <input
                    type="text"
                    placeholder="User ID"
                    {...formik.getFieldProps('user_name')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.user_name && formik.errors.user_name,
                      },
                      {
                        'is-valid':
                          formik.touched.user_name && !formik.errors.user_name,
                      },
                    )}
                  />
                  {formik.touched.user_name && formik.errors.user_name && (
                    <div className="fv-plugins-message-container mt-2 mb-5">
                      <div className="fv-help-block">
                        <span role="alert" className="error">
                          {formik.errors.user_name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="employeeType" className="required">
                    Official Email
                  </label>
                  <input
                    type="email"
                    autoComplete="off"
                    placeholder="Enter Official Email"
                    {...formik.getFieldProps('official_email')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.official_email &&
                          formik.errors.official_email,
                      },
                      {
                        'is-valid':
                          formik.touched.official_email &&
                          !formik.errors.official_email,
                      },
                    )}
                  />
                  {formik.touched.official_email &&
                    formik.errors.official_email && (
                      <div className="fv-plugins-message-container mt-2 mb-5">
                        <div className="fv-help-block">
                          <span role="alert" className="error">
                            {formik.errors.official_email}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="details" className="required">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ID"
                    {...formik.getFieldProps('employee_id_no')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.employee_id_no &&
                          formik.errors.employee_id_no,
                      },
                      {
                        'is-valid':
                          formik.touched.employee_id_no &&
                          !formik.errors.employee_id_no,
                      },
                    )}
                  />
                  {formik.touched.employee_id_no &&
                    formik.errors.employee_id_no && (
                      <div className="fv-plugins-message-container mt-2 mb-5">
                        <div className="fv-help-block">
                          <span role="alert" className="error">
                            {formik.errors.employee_id_no}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="employeeType" className="optional">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    autoComplete="off"
                    placeholder="Enter Joining Date"
                    {...formik.getFieldProps('joining_date')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.joining_date &&
                          formik.errors.joining_date,
                      },
                      {
                        'is-valid':
                          formik.touched.joining_date &&
                          !formik.errors.joining_date,
                      },
                    )}
                  />
                  {formik.touched.joining_date && formik.errors.joining_date && (
                    <div className="fv-plugins-message-container mt-2 mb-5">
                      <div className="fv-help-block">
                        <span role="alert" className="error">
                          {formik.errors.joining_date}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="details" className="required">
                    Employee Salary
                  </label>
                  <input
                    type="number"
                    placeholder="Enter ID"
                    {...formik.getFieldProps('salary')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.salary && formik.errors.salary,
                      },
                      {
                        'is-valid':
                          formik.touched.salary && !formik.errors.salary,
                      },
                    )}
                  />
                  {formik.touched.salary && formik.errors.salary && (
                    <div className="fv-plugins-message-container mt-2 mb-5">
                      <div className="fv-help-block">
                        <span role="alert" className="error">
                          {formik.errors.salary}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-4"></div>

              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="selectLeaveCategory" className="required">
                    Select Employee Type
                  </label>
                  <Select
                    value={defaultEmpType}
                    options={empList}
                    onChange={onEmployeeTypeAction}
                    className={clsx(
                      {
                        'is-invalid':
                          formik.touched.employee_type_id &&
                          formik.errors.employee_type_id,
                      },
                      {
                        'is-valid':
                          formik.touched.employee_type_id &&
                          !formik.errors.employee_type_id,
                      },
                    )}
                  />
                  {formik.touched.employee_type_id &&
                    formik.errors.employee_type_id && (
                      <div className="fv-plugins-message-container mt-2 mb-5">
                        <div className="fv-help-block">
                          <span role="alert" className="error">
                            {formik.errors.employee_type_id}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="selectLeaveCategory" className="required">
                    Select Department
                  </label>
                  <Select
                    options={deptList}
                    value={defaultDept}
                    onChange={onDepartmentAction}
                    className={clsx(
                      {
                        'is-invalid':
                          formik.touched.department_id &&
                          formik.errors.department_id,
                      },
                      {
                        'is-valid':
                          formik.touched.department_id &&
                          !formik.errors.department_id,
                      },
                    )}
                  />
                  {formik.touched.department_id && formik.errors.department_id && (
                    <div className="fv-plugins-message-container mt-2 mb-5">
                      <div className="fv-help-block">
                        <span role="alert" className="error">
                          {formik.errors.department_id}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="selectDept" className="required">
                    Select Designation
                  </label>
                  <Select
                    value={defaultDesignation}
                    options={designationList}
                    onChange={onDesignationAction}
                    className={clsx(
                      {
                        'is-invalid':
                          formik.touched.designation_id &&
                          formik.errors.designation_id,
                      },
                      {
                        'is-valid':
                          formik.touched.designation_id &&
                          !formik.errors.designation_id,
                      },
                    )}
                  />
                  {formik.touched.designation_id &&
                    formik.errors.designation_id && (
                      <div className="fv-plugins-message-container mt-2 mb-5">
                        <div className="fv-help-block">
                          <span role="alert" className="error">
                            {formik.errors.designation_id}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="col-12 mt-5">
                <button
                  type="submit"
                  id="kt_sign_in_submit"
                  className="btn btn-sm btn-primary mb-5"
                  style={{ backgroundColor: '#000000' }}
                  // disabled={formik.isSubmitting || !formik.isValid}
                  >
                  {!loading && <span className="indicator-label">Submit</span>}
                  {loading && (
                    <span
                      className="indicator-progress"
                      style={{ display: 'block' }}>
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
          {/* form ends */}
        </div>
      </div>
    </>
  );
}
