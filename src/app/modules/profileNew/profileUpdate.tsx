import React, { useEffect, useState } from "react";
import { PageTitle } from '../../../_jutemplate/layout/core';
import '../../../_jutemplate/assets/css/custom.css'
import * as Yup from 'yup';
import { useFormik } from "formik";
import profileAPI from "../../../api/profile/profileAPI";
import { toast } from 'react-toastify';
import Loading from "../../components/Loading";

const initialValues = {
    name: '',
    address: '',
    
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required("Address is required"),
});

const EditAdminProfile: React.FC = () => {

    const [detailsAdmin, setDetailsAdmin] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [image,setImage]=useState<string>('')
    const [imagePath,setImagePath]=useState<string>('')
   
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,

        onSubmit: (values) => {
            //console.log(value);
            let formData = new FormData()

            formData.append('name', values.name);
            formData.append('address', values.address);

            setButtonLoading(true)
            profileAPI.updateProfile(formData as any).then(
                (res: any) => {
                    setButtonLoading(false)
                    if (res?.data?.success === true) {
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
                    toast.error(err?.response?.data?.message, {
                        theme: 'dark'
                    })
                }
            )
        }

    });

    const getDetails = () => {
        //setLoading(true)
        profileAPI.getDetails().then(
            (res: any) => {
                console.log(res.data);
                setLoading(false)
                if (res.data.success === true) {
                    
                    setDetailsAdmin(res.data.data)
                } else {
                    toast.error(res.data.message, {
                        theme: 'dark',
                    })
                }

            },
            (err: any) => {
                if (err?.response?.data?.success === false) {
                    setLoading(false)
                    toast.error(err?.response?.data?.message, {
                        theme: 'dark',
                    });
                }
            }

        )
    }

   
    const uploadImage = (e: any)=> {

        if( e.target.files.length >= 0 ){

            const file = e.target.files[0];
            let formData = new FormData();

            formData.append('name', detailsAdmin.name);
            formData.append('address', detailsAdmin.address);
            formData.append('image',file);
            //setUpdateSucess(false);
            profileAPI.updateProfile(formData as any).then(
                (res: any) => {
                    
                    if (res?.data?.success === true) {
                        //setUpdateSucess(true)
                        getDetails();
                        formik.resetForm();

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
                    toast.error(err?.response?.data?.message, {
                        theme: 'dark'
                    })
                }
            )
        }
    }

    useEffect(() => {
        getDetails();
    },[])

    // useEffect(() => {
    //     if(updateSucess===true){
    //       getDetails();
    //       formik.resetForm();
          
    //     }
    // }, [updateSucess])
    
    useEffect(() => {
        if (Object.keys(detailsAdmin).length !== 0) {
            setLoading(false)
            initialValues.name = detailsAdmin.name;
            initialValues.address = detailsAdmin.address;
            setImage(detailsAdmin.image)
            setImagePath(detailsAdmin.imageFolderPath)
        }

    }, [detailsAdmin])

    const handleReset = () => {
        formik.resetForm();
    }

    return (
        <>

            <PageTitle>Profile Update</PageTitle>
            {loading ? <Loading /> : (

                <div className="card shadow-sm py-8">
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>

                            <div className='row mb-6'>
                                <label className='col-lg-4 col-form-label fw-bold fs-6'>Image</label>
                                <div className='col-lg-8'>

                                    {/* <div className="d-flex flex-wrap flex-sm-nowrap mb-3"> */}
                                    <div className="me-7 mb-4 position-relative ">
                                        <div
                                            className='image-input image-input-outline'
                                            data-kt-image-input='true'
                                        >
                                            <div
                                                className='image-input-wrapper w-125px h-125px'
                                                style={{ backgroundImage: `url(${imagePath + '/' + image})` }}
                                            >

                                            </div>
                                        </div>
                                        <label
                                            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow prfl position-absolute bottom-0 start-0"
                                            // data-kt-image-input-action="change"
                                            data-bs-toggle="tooltip"
                                            data-kt-initialized="1"
                                        >
                                            <i className="bi bi-pencil-fill fs-7"></i>
                                            <input
                                                type="file"
                                                name="avatar"
                                                accept=" .png, .jpg, .jpeg"
                                                style={{ display: 'none' }}
                                                onChange={uploadImage}
                                            />
                                            {/* <input type="hidden" name="avatar_remove" /> */}
                                        </label>
                                    </div>
                                </div>
                            </div>


                            <div className='row mb-6'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>

                                <div className='col-lg-8 fv-row'>
                                    <input
                                        type='text'
                                        placeholder='Name'
                                        {...formik.getFieldProps('name')}
                                        className='form-control form-control-lg form-control-solid'
                                         
                                    />
                                    {formik.touched.name && formik.errors.name && (
                                        <div className='fv-plugins-message-container'>
                                            <div className='fv-help-block text-danger'>{formik.errors.name}</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='row mb-6'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Address</label>

                                <div className='col-lg-8 fv-row'>
                                    <input
                                        type='text'
                                        placeholder='Address'
                                        {...formik.getFieldProps('address')}
                                        className='form-control form-control-lg form-control-solid'
                                    />
                                    {formik.touched.address && formik.errors.address && (
                                        <div className='fv-plugins-message-container'>
                                            <div className='fv-help-block text-danger'>{formik.errors.address}</div>
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
                                //style={{ backgroundColor: '#000000' }}
                                // disabled={formik.isSubmitting || !formik.isValid}
                                >

                                    {buttonLoading ? (
                                        <span
                                            className="indicator-progress"
                                            style={{ display: 'block' }}
                                        >
                                            Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>

                                        </span>) : (
                                        <span className="indicator-label">Change Profile</span>
                                    )
                                    }
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default EditAdminProfile;