import React, { useEffect, useState, useRef } from 'react';
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
import Loading from '../../../components/Loading';
import { imageValidation } from '../../../utility/customValidation/fileValidation';
import { configEditor } from '../../../utility/textEditorConfig';

import JoditEditor from 'jodit-react';

const initialValues = {

    expert_type_id:[],
    name: '',
    rating: '',
    // hourly_rate:'',
    address: '',
    insurance: '',
    image: ''

}


const validationSchema = Yup.object().shape({

    name: Yup.string().required('Name is required').min(3,'Name must be greater than 3 character').max(50,'Name must be less than 50 character'),
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
    address: Yup.string().required('Description is required'),
    insurance : Yup.string().required('Insurance is required')
   

})



export const EditExpert: React.FC = () => {

    const [buttonLoading, setbuttonLoading] = useState<boolean>(false);
    const [activeExpertTypeData, setActiveExpertTypeData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>({});
    const [defaultExpertType,setDefaultExpertType] =  useState<any>([])
    const [imageError,setImageError] = useState<string>("")
    const [image,setImage] = useState<string>('');
    const [ expertDescription , setExpertDescription ] = useState<string>('')
    const editor = useRef(null);
    const animatedComponents = makeAnimated()
    
    const navigate = useNavigate();

    //AddExpert start
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            //console.log(values)
            
                
                if(!imageError){
                    
                    setbuttonLoading(true)
                    let formData = new FormData();

                    formData.append('id', details.id);
                    formData.append('image', values.image);
                    formData.append('name', values.name);
                    formData.append('rating', values.rating);
                    // formData.append('hourly_rate',values.hourly_rate);

                    formData.append('address', values.address);
                    formData.append('insurance', values.insurance);
                
                    values.expert_type_id.forEach((val:any)=> formData.append('expert_type_id', val.toString()) )
        

                    expertAPI.updateExpert(formData).then(
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
           
          
        }

    });
    //AddExpert end

    
    //form field reset using formik resetForm function
    const handleReset = () => {
        formik.resetForm();
        const initialExpertType = details.expertTypeDetails.map((val:any)=>{
                return {
                value: val.id,
                label: val.title, 
                }

            }  
         )

         setDefaultExpertType(initialExpertType)
         const initialExpertTypeId = initialExpertType.map((val:any)=>val.value)
         formik.setFieldValue('expert_type_id',initialExpertTypeId)  
    }

   //image change and custom validation
    const fileChangeHandler = (e: any) => {
        
        if (e.target.files.length >= 0) {
            
            const file = e.target.files[0];
            setImage(file)
            console.log(file)
            const err = imageValidation(file.type,file.size,["image/jpg","image/jpeg","image/png"],2000000)

            if( err ){

                setImageError(err)

            } else{

                setImageError('')
                formik.setFieldValue('image',file )
                
            }

        } else{

            setImage('');
        }

    }

    useEffect(()=>{
       if(!image){
         setImageError('')
       }
    },[image])

    

    const getActiveExpertType = () => {

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

    const getDetails = (id: number) => {

        setLoading(true)

        expertAPI.getDetails(id).then(
            (res: any) => {

                if (res.data.success === true) {
                    setDetails(res.data.data)
                    console.log(res.data.data)
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

    const selectValueChange = (value: any) => {

        setDefaultExpertType(value)
        const expertTopicId =value.map((val: any) => val.value)
        formik.setFieldValue('expert_type_id',expertTopicId)
     }
     
    

    useEffect(() => {
        getActiveExpertType();
    },[])

    useEffect(() => {
        let url = window.location.href;
        var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
        getDetails(id);
    }, [])


    useEffect(() => {   //set all field default value
        if (Object.keys(details).length !== 0) {
            setLoading(false)
            initialValues.name=details.name;
            initialValues.address=details.address;
            setExpertDescription(details.address)
            // initialValues.hourly_rate=details.hourly_rate;
            initialValues.insurance=details.insurance;
            initialValues.rating=details.rating;

            const initialExpertType = details.expertTypeDetails.map((val:any)=>{
                return {
                        value: val.id,
                        label: val.title, 
                       }

               }  
            )

            setDefaultExpertType(initialExpertType)
            const initialExpertTypeId = initialExpertType.map((val:any)=>val.value)
            formik.setFieldValue('expert_type_id',initialExpertTypeId) 

           }
        }, [details])

        const handleDetailsChange = (contentDetails:string)=>{
            setExpertDescription(contentDetails)
            formik.setFieldValue('address',contentDetails)
        }

    return (
        <>

            <PageTitle>Update Expert</PageTitle>
            {/* card start */}
            { loading ? <Loading/> :(
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
                            <div className="form-group col-md-6">
                                <label htmlFor="image">Expert Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={fileChangeHandler}
                                    className='form-control form-control-lg form-control-solid'
                                />
                                <p className="text-danger">{ imageError ? imageError : ''}</p>
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

                            {/* <div className="form-group col-md-6">
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
                                    value={defaultExpertType}
                                    isMulti
                                    isClearable
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
                            <label htmlFor="address" className='required'>Address</label>
                            {/* <textarea
                                rows={3}
                                id="address"
                                placeholder="Enter Address "
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


                            { formik.touched.address && formik.errors.address && (
                                <div className="fv-plugins-message-container mt-2">
                                    <div className="fv-help-block">
                                        <span role="alert" className="error text-danger">
                                            {formik.errors.address }
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='row mt-5'>

                           <div className="form-group col-md-6">
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

                                    </span>) : (
                                    <span className="indicator-label">Update</span>
                                )
                                }
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            )
            }
            {/* card end */}
        </>
    )
}