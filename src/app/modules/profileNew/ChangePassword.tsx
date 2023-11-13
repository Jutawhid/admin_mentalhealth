import React, { useState,useEffect } from "react";
import { PageTitle } from '../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import profileAPI from "../../../api/profile/profileAPI";

const initialValues = {

    currentPassword:'',
    newPassword:'',
    confirmPassword: '',
    
}

const validationSchema = Yup.object().shape({

    currentPassword:Yup.string().required("Current Password is required"),
    newPassword : Yup.string().min(6, ' New Password is too short - should be 6 Alphabet Character minimum.').required(" New Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords is not match').required("Confirm Password is required "),
});

export const ChangePassword:React.FC = ()=>{

    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {

          console.log(values)
          setButtonLoading(true)
          profileAPI.changePassword(values.currentPassword,values.newPassword).then(

            (res: any) => {
                setButtonLoading(false);
                if (res?.data?.success === true) {
                    formik.resetForm()
                    navigate("../");
                    toast.success(res?.data?.message, {
                        theme: 'dark'
                    })
                } else {
                    toast.error(res?.data?.message, {
                        theme: 'dark'
                    })
                }
                
            }, (err: any) => {
                setButtonLoading(false);
                toast.error(err?.response?.data?.message, {
                    theme: 'dark'
                })
            }
        )
        }

    });

    const handleReset = () => {
        formik.resetForm();
    }

   return (
      <> 
         <PageTitle>Update Profile Information</PageTitle>
         <div className=" card shadow-sm py-8">
             <div className="card-header">
                      <h3 className=" card-title"> Change Password</h3>
             </div>
             <div className=" card-body">
                  <form onSubmit={formik.handleSubmit}>
                       <div className="row">
                           <div className="form-group col-md-4">
                              <label htmlFor="currentPassword" className="required mb-1">Current Password</label>
                                <input 
                                    type="password"
                                    id="currentPassword"
                                    {...formik.getFieldProps('currentPassword')}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.currentPassword && formik.errors.currentPassword,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.currentPassword &&
                                                !formik.errors.currentPassword,
                                        },
                                    )}
                                />
                                {formik.touched.currentPassword && formik.errors.currentPassword && (
                                        <div className="fv-plugins-message-container mt-2">
                                            <div className="fv-help-block">
                                                <span role="alert" className="error text-danger">
                                                    {formik.errors.currentPassword}
                                                </span>
                                            </div>
                                        </div>
                                )}
                           </div>

                           <div className="form-group col-md-4 form-m-top_upto_md">
                               <label htmlFor="newPassword" className="required mb-1">New Password</label>
                               <input 
                                    type="password" 
                                    id="newPassword"
                                    {...formik.getFieldProps('newPassword')}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.newPassword  && formik.errors.newPassword,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.newPassword  &&
                                                !formik.errors.newPassword ,
                                        },
                                    )}
                                />
                                {formik.touched.newPassword && formik.errors.newPassword && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.newPassword}
                                            </span>
                                        </div>
                                    </div>
                                )}
                           </div>

                           <div className="form-group col-md-4 form-m-top_upto_md">
                               <label htmlFor="confirmPassword" className="required mb-1">Confirm Password</label>
                               <input 
                                    type="password" 
                                    id="confirmPassword"
                                    {...formik.getFieldProps('confirmPassword')}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.confirmPassword && formik.errors.confirmPassword,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.confirmPassword &&
                                                !formik.errors.confirmPassword,
                                        },
                                    )}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.confirmPassword}
                                            </span>
                                        </div>
                                    </div>
                                )}
                           </div>

                           <div className="d-flex justify-content-end mt-5">
                            <button type="button" onClick={handleReset} className="btn btn-md btn-danger me-4">Reset</button>


                            <button
                                type="submit"
                                id="kt_sign_in_submit"
                                className="btn btn-md btn-primary "
                                disabled={ buttonLoading ? true : false }
                            //style={{ backgroundColor: '#000000' }}
                            // disabled={formik.isSubmitting || !formik.isValid}
                            >
                                { !buttonLoading && <span className="indicator-label">Update</span>}
                                {  buttonLoading && (
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
             </div>
         </div>
      </>
   )
}