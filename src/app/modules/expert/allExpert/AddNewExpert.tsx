import React, { useEffect, useState,useRef } from 'react';
import { PageTitle } from '../../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx'
import Select from 'react-select'
import { useFormik } from 'formik';
import expertAPI from '../../../../api/expert/expertAPI';
import expertTypeAPI from '../../../../api/expert/expertTypeAPI';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import makeAnimated from 'react-select/animated';
import { configEditor } from '../../../utility/textEditorConfig';

import JoditEditor from 'jodit-react';


const initialValues = {
    name:'',
    rating: '',
    // hourly_rate:'',
    address:'',
    insurance:'',
    image:'',
    expert_type_id:[]
    
}

const validationSchema = Yup.object().shape({

    name: Yup.string().required('Name is required').min(3,'Title must be greater than 3 character').max(50,'Title must be less than 50 character'),
    rating: Yup.string().matches(/^[0-9]+$/, "Please Enter numeric value only").required('Rating is required').test('rating',"Rating must be between 1 to 5",( value:any )=> {
        
        if( value >= 1 && value <= 5){
            return true
        } else {
            return false
        }
    }),
    expert_type_id:Yup.array().min(1,"At least one expert topic is required"),
    // hourly_rate: Yup.string().matches(/(^[0-9]+\.?[0-9]+$)|(^[0-9]+$)/, "Please enter valid number only").required('Hourly Rate is required').max(10,'Hourly Rate must be less than or equal 10 digit').test('Hourly Rate','Hourly Rate must be greater than 0 $',((value:any)=>{
    //     return value > '0';
    //   })),
    address : Yup.string().required('Description is required'),
    insurance : Yup.string().required('Insurance is required'),
    image: Yup.mixed().required('Image is required').test('fileSize','Unsupported File Size ! only  5 Mb image is required', (value) => {
        console.log(value); return value && value.size <= 5000000 }).test('fileType','Unsupported File Format ! only png , jpg and jpeg required', (value) => {
        console.log(value); return value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)})
   
   })



export const AddNewExpert: React.FC = () => {

    const [ buttonLoading, setbuttonLoading ] = useState<boolean>(false);
    const [ activeExpertTypeData,setActiveExpertTypeData ] = useState<any>([]);
    const [ defaultExpertType,setDefaultExpertType ] =  useState<any>()
    const [ expertDescription, setExpertDescription ] = useState<string>('')
    const editor = useRef(null);
    const animatedComponents = makeAnimated()
    
    
    const navigate = useNavigate();

    //Add  Expert start
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema ,
        
        onSubmit: (values, { setStatus, setSubmitting }) => {
                //console.log(Values);
         
                setbuttonLoading(true)

                let formData = new FormData();

                values.expert_type_id.forEach((val:any)=>{
                     
                        formData.append("expert_type_id",val.toString())
                            
                 });

               
                formData.append('name',values.name);
                formData.append('rating',values.rating);
                // formData.append('hourly_rate',values.hourly_rate);
                formData.append('address',values.address);
                formData.append('insurance',values.insurance);
                formData.append('image',values.image);
                

                expertAPI.addExpert(formData).then(
                    (res: any) => {
                        setbuttonLoading(false)
                        if (res.data.success === true) {
                            formik.resetForm()
                            navigate("../")
                            toast.success(res?.data?.message, {
                                theme: 'dark'
                            })
                        }
                        else {
                            setStatus(res.data.message)
                            setSubmitting(false)
                            toast.error(res?.data?.message, {
                                theme: 'dark'
                            })
                        }
                    },
                    (err: any) => {
                        setbuttonLoading(false);
                        toast.error(err?.response?.data?.message, {
                            theme: 'dark'
                        })
                    }
                )
      
          }
     });
   //Add  Expert end
    
    
    //form field reset using formik resetForm function
    const handleReset = () => {
        formik.resetForm();
        setDefaultExpertType(null);
    }

    const fileChangeHandler = (e: any) => {
        
        if ( e.target.files.length >= 0) {
                const file = e.target.files[0];
                formik.setFieldValue('image', file)
           
         }

    }
   
   
    
    
    const getActiveExpertType = ()=>{

        expertTypeAPI.getAllActiveExpertType().then(

            (res: any) => {

                if (res.data.data) {
                    //console.log(res.data.data)
                    const data = res.data.data;
                    setActiveExpertTypeData(data.map((val: any) => {
                        return {
                            //...val,
                            value: val.id,
                            label: val.title,
                        }
                    }));

                } else {
                    toast.error(res.data.message, {
                        theme: 'dark',
                    })
                }
            },
            (err: any) => {

                if (err?.response?.data?.success === false) {
                    toast.error(err.response.data.message, {
                        theme: 'dark',
                    })
                }
            },
        )
    }

    const selectValueChange = (value:any)=>{
         console.log(value)
         const expertTypeId = value.map((val:any)=>val.value)
         formik.setFieldValue('expert_type_id',expertTypeId)
         setDefaultExpertType(value);
         
    }

    useEffect(()=>{
        getActiveExpertType();
    },[])

    const handleDetailsChange = (contentDetails:string)=>{
        setExpertDescription(contentDetails)
        formik.setFieldValue('address',contentDetails)
    }

    return (
        <>

            <PageTitle>Add  Expert</PageTitle>
            {/* card start */}
            <div className="card shadow-sm py-8">
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                    
                        <div className='row'>
                            <div className="form-group col-md-6">
                                <label htmlFor="name" className='required'>Name</label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    id="name"
                                    placeholder="Enter Expert Name"
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
                             <div className="form-group col-md-6 form-m-top_upto_md">
                                <label htmlFor="file" className='required'>Expert Image</label>
                                <input
                                    type="file"
                                    id="file"
                                    onBlur={formik.handleBlur}
                                    onChange={fileChangeHandler}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.image && formik.errors.image,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.image &&
                                                !formik.errors.image,
                                        },
                                    )}
                                />

                                {formik.touched.image && formik.errors.image && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.image}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='row mt-6'>
                            <div className="form-group col-md-6">
                                <label htmlFor="rating" className='required'>Rating</label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    id="rating"
                                    placeholder="Enter Rating "
                                    {...formik.getFieldProps('rating')}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.rating && formik.errors.rating,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.rating &&
                                                !formik.errors.rating,
                                        },
                                    )}
                                />

                                {formik.touched.rating && formik.errors.rating && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.rating}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* <div className="form-group col-md-6 form-m-top_upto_md">
                                <label htmlFor="hourlyRate" className='required'>Hourly Rate $</label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    id="hourlyRate"
                                    placeholder="Hourly Rate"
                                    {...formik.getFieldProps('hourly_rate')}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.hourly_rate && formik.errors.hourly_rate,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.hourly_rate &&
                                                !formik.errors.hourly_rate,
                                        },
                                    )}
                                />

                                {formik.touched.hourly_rate && formik.errors.hourly_rate && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.hourly_rate}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div> */}

                            <div className="form-group col-md-6">
                                        <label htmlFor=" expertTypeId" className="required">
                                        Expert Topic
                                        </label>
                                        <Select
                                            isMulti
                                            isClearable
                                            value={defaultExpertType}
                                            closeMenuOnSelect={true}
                                            components={animatedComponents}
                                            options={activeExpertTypeData}
                                            onChange={selectValueChange}
                                        />
                                        {formik.touched.expert_type_id && formik.errors.expert_type_id && (
                                            <div className="fv-plugins-message-container mt-2">
                                                <div className="fv-help-block">
                                                    <span role="alert" className="error text-danger">
                                                        { formik.errors.expert_type_id }
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                </div>

                        </div>

                        <div className="form-group mt-5">
                                <label htmlFor="description" className='required'>Description</label>
                                {/* <textarea
                                    rows={3}
                                    id="description"
                                    placeholder="Enter Description "
                                    {...formik.getFieldProps('address')}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.address && formik.errors.address,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.address &&
                                                !formik.errors.address,
                                        },
                                    )}
                                /> */}

                               <JoditEditor
                                    ref={editor}
                                    value={expertDescription}
                                    config={configEditor}
                                    // tabIndex={1} // tabIndex of textarea
                                    // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                    onChange={(newContent) => {handleDetailsChange(newContent)}}
                                />



                                {formik.touched.address && formik.errors.address && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                { formik.errors.address }
                                            </span>
                                        </div>
                                    </div>
                                )}
                        </div>

                        <div className='row mt-5'>

                                

                                <div className="form-group col-md-6 form-m-top_upto_md">
                                    <label htmlFor="insurance" className='required'>Insurance</label>
                                    <input
                                        type="text"
                                        autoComplete='off'
                                        id="insurance"
                                        placeholder="Enter Insurance Type "
                                        {...formik.getFieldProps('insurance')}
                                        className={clsx(
                                            'form-control form-control-lg form-control-solid',
                                            {
                                                'is-invalid':
                                                    formik.touched.insurance && formik.errors.insurance,
                                                    
                                            },        
                                            {
                                                'is-valid':
                                                    formik.touched.insurance &&
                                                    !formik.errors.insurance,
                                            },
                                        )}
                                    />

                                    {formik.touched.insurance && formik.errors.insurance && (
                                        <div className="fv-plugins-message-container mt-2">
                                            <div className="fv-help-block">
                                                <span role="alert" className="error text-danger">
                                                    {formik.errors.insurance}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                        </div>
                      

                        <div className="d-flex justify-content-end mt-5">

                            <button type="button" onClick={handleReset} className="btn btn-md btn-danger me-4 ">Reset</button>
                            <button
                                type="submit"
                                id="kt_sign_in_submit"
                                className="btn btn-md btn-primary "
                                disabled={ buttonLoading ? true : false }
                            //style={{ backgroundColor: '#000000' }}
                            // disabled={formik.isSubmitting || !formik.isValid}
                            >
                                
                                { buttonLoading ? (
                                    <span
                                        className="indicator-progress"
                                        style={{ display: 'block' }}
                                    >
                                        Please wait...
                                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                    
                                    </span> ) : (
                                        <span className="indicator-label">Submit</span>
                                    )
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* card end */}
        </>
    )
}