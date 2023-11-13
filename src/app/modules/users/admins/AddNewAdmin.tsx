import React, { useState,useEffect } from "react";
import { PageTitle } from '../../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useFormik } from "formik";
import AdminAPI from "../../../../api/users/allAdminAPI";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { imageValidation } from '../../../utility/customValidation/fileValidation';

const initialValues = {

    email: '',
    name: '',
    address: '',
    password: '',
    confirmPassword: '',
    image:''
}

const validationSchema = Yup.object().shape({

    email: Yup.string().email('invalid email').required('Email is required'),
    name: Yup.string().matches(/^[a-zA-Z]/, "Name must be start with alphabet character").required('Name is required').min(2,'Name must be greater than or equal 2 character').max(50,'Name must be less than 50 character'),
    address: Yup.string(),
    password: Yup.string().min(6, 'Password is too short - should be 6 Alphabet Character minimum.').required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords is not match').required("Confirm Password is required"),
});

export const AddNewAdmin: React.FC = () => {
   
    
    const [imageError,setImageError] = useState<string>('');
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [image,setImage] = useState<string>('');

    //const location = useLocation();
    //console.log(location);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {

            if ( ! imageError ) {
                setButtonLoading(true)
                let formData = new FormData()
                formData.append('email', values.email);
                formData.append('name', values.name);
                formData.append('address', values.address);
                formData.append('password', values.password);
                formData.append('confirm_password', values.confirmPassword);
                formData.append('image', values.image);
                


                AdminAPI.createAdmin(formData as any).then(

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
                        //console.log(res)
                    }, (err: any) => {
                        setButtonLoading(false);
                        toast.error(err?.response?.data?.message, {
                            theme: 'dark'
                        })
                    }
                )

            }
        }

    });
   

    const fileChangeHandler = (e: any) => {

        if (e.target.files.length >= 0) {

            const file = e.target.files[0];
            //console.log(file)

            //console.log(file.size);
            setImage(file)
            const err = imageValidation(file.type,file.size,["image/jpg","image/jpeg","image/png"],5000000)

            if( err ){

                setImageError(err)

            } else{

                setImageError('')
                formik.setFieldValue('image',file )
                
            }

        } else{
            setImage('')
        }
    }

    //when Click on image select and not select any error then setImg error is show empty
    useEffect(()=>{
        if(!image){
          setImageError('')
        }
     },[image])

    //form field reset using formik resetForm function
    const handleReset = () => {
        formik.resetForm();
    }

    return (
        <>

            <PageTitle>Add Admin</PageTitle>

            <div className="card shadow-sm py-8">
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">

                            <div className="form-group col-md-4">
                                <label htmlFor="name" className="required">Name</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    id="name"
                                    placeholder="Enter Name"
                                    {...formik.getFieldProps('name')}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.name && formik.errors.name,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.name &&
                                                !formik.errors.name,
                                        },
                                    )}
                                />

                                {formik.touched.name && formik.errors.name && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.name}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="form-group col-md-4 form-m-top_upto_md">
                                <label htmlFor="email" className="required">Email</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    id="email"
                                    placeholder="Enter email"
                                    {...formik.getFieldProps('email')}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.email && formik.errors.email,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.email &&
                                                !formik.errors.email,
                                        },
                                    )}
                                />

                                {formik.touched.email && formik.errors.email && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.email}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="form-group col-md-4 form-m-top_upto_md">
                                <label htmlFor="file">Upload Image</label>
                                <input
                                    type="file"
                                    id="file"
                                    placeholder="Upload Image"
                                    onChange={fileChangeHandler}
                                    className="form-control form-control-lg form-control-solid"
                                />
                                 <p className="text-danger mb-0">{ imageError ? imageError : ''}</p>
                            </div>


                        </div>
                        <div className="form-group mt-5">
                            <label htmlFor="address">Address</label>
                            <textarea
                                rows={3}
                                id="address"
                                placeholder="Enter Address"
                                {...formik.getFieldProps('address')}
                                className="form-control form-control-lg form-control-solid"
                            />
                        </div>
                        <div className="row mt-5">
                            <div className="form-group col-md-6">
                                <label htmlFor="password" className="required">Password</label>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    id="password"
                                    placeholder="Enter Password"
                                    {...formik.getFieldProps('password')}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.password && formik.errors.password,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.password &&
                                                !formik.errors.password,
                                        },
                                    )}
                                />

                                {formik.touched.password && formik.errors.password && (
                                    <div className="fv-plugins-message-container mt-2 mb-5">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.password}
                                            </span>
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="form-group col-md-6 form-m-top_upto_md">
                                <label htmlFor="confirmPassword" className="required">Confirm Password</label>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    id="confirmPassword"
                                    placeholder="Enter Confirm Password"
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
                                { !buttonLoading && <span className="indicator-label">Submit</span>}
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

                    </form>
                </div>
            </div>
        </>
    )
}
