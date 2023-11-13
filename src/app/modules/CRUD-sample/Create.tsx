import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useFormik } from 'formik'
import { PageTitle } from '../../../_jutemplate/layout/core'
import clsx from 'clsx'
import DepartmentTypeAPI from '../../../api/config/DepartmentTypeAPI'
import DesignationAPI from '../../../api/config/DesignationAPI'
import EmployeeTypeAPI from '../../../api/config/EmployeeTypeAPI'
import employeeCrudAPI from '../../../api/employee/employeeCrudAPI'

// initialValues
const initialValues = {
  employee_type_id: '',
  department_id: '',
  designation_id: '',
  first_name: '',
  last_name: '',
  employee_id_no: '',
  personal_email: '',
  official_email: '',
  joining_date: '',
  salary: '',
  user_name: '',
}

// schema validation
const onboardSchema = Yup.object().shape({
  employee_type_id: Yup.string().required('Employee type is required'),
  department_id: Yup.string().required('Department is required'),
  designation_id: Yup.number().required('Designation is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  employee_id_no: Yup.string().required('Employee ID is required'),
  personal_email: Yup.string().required('Personal mail is required'),
  official_email: Yup.string().required('Official mail is required'),
  joining_date: Yup.date().required('Joining Date is required'),
  salary: Yup.string().required('Salary is required'),
  user_name: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(255, 'Maximum 255 characters')
    .required('User name is required'),
})

export function EmployeeOnBoard() {
  // loading state
  const [loading, setLoading] = useState<boolean>(false)
  const [empTypes, setEmpTypes] = useState<any>([])
  const [deptList, setDeptList] = useState<any>([])
  const [designationList, setDesignationList] = useState<any>([])

  const [selectedEmpType, setSelectedEmpType] = useState<any>([])
  const [selectedDept, setSelectedDept] = useState<any>([])
  const [selectedDesignation, setSelectedDesignation] = useState<any>([])

  // navigation
  const navigate = useNavigate()

  // formik hook
  const formik = useFormik({
    initialValues,
    validationSchema: onboardSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      if (values) {
        employeeCrudAPI.createEmployee(values as any).then(
          (res: any) => {
            formik.setValues({} as any)
            setLoading(true)
            if (res.data.success) {
              setLoading(false)
              formik.resetForm()
              setSelectedDept([])
              setSelectedDesignation([])
              setSelectedEmpType([])
              navigate('/employee-list')
              toast(res.data.message, {
                theme: 'dark',
              })
            } else {
              setLoading(false)
              setStatus(res.data.message)
              setSubmitting(false)
              toast.error(res.data.message, {
                theme: 'dark',
              })
            }
          },
          (err: any) => {
            console.log(err.response.data.message)
            // loading(false)
            setLoading(false)
            //   if success === false
            if (err.response.data.success === false) {
              setStatus(err.response.data.message)
              setSubmitting(false)
              // alart -> error
              toast.error(err.response.data.message, {
                theme: 'dark',
              })
            }
          },
        )
      }
    },
  })

  const animatedComponents = makeAnimated()

  // initialize data
  useEffect(() => {
    // store employee types
    EmployeeTypeAPI.getEmployeeTypes().then((res: any) => {
      if (res?.data?.data) {
        let mapData = res.data.data.map((e: any) => {
          return {
            ...e,
            value: e.id,
            label: e.title,
          }
        })
        setEmpTypes(mapData)
      }
    })

    // store departments
    DepartmentTypeAPI.getTypes().then((res: any) => {
      if (res?.data?.data) {
        let mapData = res.data.data.map((e: any) => {
          return {
            ...e,
            value: e.id,
            label: e.title,
          }
        })
        setDeptList(mapData)
      }
    })
  }, [setEmpTypes, setDeptList])

  // select department action
  const onDepartmentAction = (value: any) => {
    console.log(value)
    initialValues.department_id = value?.value
    initialValues.designation_id = ''
    setSelectedDept(value?.value)
    setSelectedDesignation(null)
    formik.setFieldValue('department_id', value?.value)
    formik.setFieldValue('designation_id', '')
    // store designations
    DesignationAPI.getTypes().then((res: any) => {
      if (res?.data?.data) {
        let filterData = res?.data?.data?.filter(
          (e: any) => e.dept_id === value?.value,
        )
        let mapData = filterData.map((e: any) => {
          return {
            ...e,
            value: e.id,
            label: e.title,
          }
        })
        setDesignationList(mapData)
      }
    })

  }

  // select designation action
  const onDesignationAction = (value: any) => {
    console.log(value)
    initialValues.designation_id = value?.value
    setSelectedDesignation(value)
    formik.setFieldValue('designation_id', value?.value)
  }

  // select employee action
  const onEmployeeTypeAction = (value: any) => {
    console.log(value)
    initialValues.employee_type_id = value?.value
    setSelectedEmpType(value)
    formik.setFieldValue('employee_type_id', value?.value)
  }

  // render
  return (
    <>
      <PageTitle>Onboard Employee</PageTitle>
      
      <div className="card">
        <div className="col-lg-12 card-header border-0 py-5">
          {/* form starts */}
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="form w-100"
          >
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="employeeType" className="required">
                    First Name
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Enter First Name"
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
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group py-5">
                  <label htmlFor="details" className="required">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
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
                  <label htmlFor="employeeType" className="required">
                    Personal Email
                  </label>
                  <input
                    type="text"
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
                    User Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter User Name"
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
                    type="text"
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
                    placeholder="Enter Employee ID"
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
                  <label htmlFor="employeeType" className="required">
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
                    placeholder="Enter Employee Salary"
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
                    Employee Type
                  </label>
                  <Select
                    isClearable
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={empTypes}
                    onChange={onEmployeeTypeAction}
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
                    Employee Department
                  </label>
                  <Select
                    isClearable
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={deptList}
                    onChange={onDepartmentAction}
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
                    Employee Designation
                  </label>
                  <Select
                    isClearable
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    value={selectedDesignation}
                    options={designationList}
                    onChange={onDesignationAction}
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
                      style={{ display: 'block' }}
                    >
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
  )
}
