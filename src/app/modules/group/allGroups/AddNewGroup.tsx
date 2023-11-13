import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx'
import Select from 'react-select'
import { useFormik } from 'formik';
import groupListAPI from '../../../../api/group/groupListAPI';
import groupTopicAPI from '../../../../api/group/groupTopicAPI';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import makeAnimated from 'react-select/animated';


const initialValues = {
    
    title:'',
    description:'',
    total_member:'',
    group_topic_id:''
    
}

const validationSchema = Yup.object().shape({

    title: Yup.string().matches(/^[a-zA-Z]/, "Title must be start with alphabet character").required('Title is required').min(2,'Title must be greater than 2 character').max(50,'Title must be less than 50 character'),
    total_member: Yup.string().matches(/^[0-9]+$/, "Please enter numeric value only ! No alphabet character and special character allowed").required('Total Member is required').test('total_member','At least one member is required',((value:any)=>{
        if(value){
            return (! value.startsWith('0'));
        } else {
            return value;
        }
    })),
    group_topic_id:Yup.string().required('Group Topic is required'),
    
})



export const AddNewGroup:React.FC = () => {

    const [buttonLoading, setbuttonLoading] = useState<boolean>(false);
    const [activeGroupType,setActiveGroupType] = useState<any>([]);
    const [defaultActiveGroupType,setDefaultActiveGroupType] = useState<any>();
    const animatedComponents = makeAnimated()
    const navigate = useNavigate();

    //Add Group start
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
       
        onSubmit: (values, { setStatus, setSubmitting }) => {
                //console.log(values)
                setbuttonLoading(true)
                groupListAPI.addNewGroup(values).then(
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
   //Add Group end
    
    //console.log("formik values",formik.values);
    //form field reset using formik resetForm function
    const handleReset = () => {
        formik.resetForm();
        setDefaultActiveGroupType(null);
    }
    
    const getActiveGroupType = ()=>{

        groupTopicAPI.getActiveGroupTopic().then(

            (res: any) => {

                if (res.data.data) {
                    //console.log(res.data.data)
                    const data = res.data.data;
                    setActiveGroupType(data.map((val: any) => {
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

    const selectValueChange = (val:any)=>{
         //console.log(val)
         formik.setFieldValue('group_topic_id',val.value);
         setDefaultActiveGroupType(val)
    }
    useEffect(()=>{
        getActiveGroupType()
    },[])

   

    return (
        <>

            <PageTitle>Add Group</PageTitle>
            {/* card start */}
            <div className="card shadow-sm py-8">
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>

                        <div className="form-group mt-5">
                            <label htmlFor="title" className='required'>Title</label>
                            <input
                                type="text"
                                autoComplete='off'
                                id="title"
                                placeholder="Enter Title "
                                {...formik.getFieldProps('title')}
                                className={clsx(
                                    'form-control form-control-lg form-control-solid',
                                    {
                                        'is-invalid':
                                            formik.touched.title && formik.errors.title,
                                    },
                                    {
                                        'is-valid':
                                            formik.touched.title &&
                                            !formik.errors.title,
                                    },
                                )}
                            />

                            {formik.touched.title && formik.errors.title && (
                                <div className="fv-plugins-message-container mt-2 mb-5">
                                    <div className="fv-help-block">
                                        <span role="alert" className="error text-danger">
                                            {formik.errors.title}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className='row mt-5'>
                               <div className="form-group col-md-6">
                                    <label htmlFor="workshopTypeId" className="required">
                                        Group Topic
                                    </label>
                                    <Select
                                        closeMenuOnSelect={true}
                                        value={defaultActiveGroupType}
                                        components={animatedComponents}
                                        options={activeGroupType}
                                        onChange={selectValueChange}
                                    />
                                    {formik.touched.group_topic_id && formik.errors.group_topic_id && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                { formik.errors.group_topic_id }
                                            </span>
                                        </div>
                                    </div>
                                )}
                                   
                                </div>

                                <div className="form-group col-md-6 form-m-top_upto_md">
                                    <label htmlFor="totalMember" className='required'>Total Member</label>
                                    <input
                                        type="text"
                                        autoComplete='off'
                                        id="totalMember"
                                        placeholder="Enter Total Member "
                                        {...formik.getFieldProps('total_member')}
                                        className={clsx(
                                            'form-control form-control-lg form-control-solid',
                                            {
                                                'is-invalid':
                                                    formik.touched.total_member && formik.errors.total_member,
                                                    
                                            },        
                                            {
                                                'is-valid':
                                                    formik.touched.total_member &&
                                                    !formik.errors.total_member,
                                            },
                                        )}
                                    />

                               {formik.touched.total_member && formik.errors.total_member && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.total_member}
                                            </span>
                                        </div>
                                    </div>
                               )}
                           </div>

                        </div>

                        <div className="form-group mt-5">
                            <label htmlFor="description">Description</label>
                            <textarea
                                rows={3}
                                id="description"
                                placeholder="Enter Description"
                                {...formik.getFieldProps('description')}
                                className='form-control form-control-lg form-control-solid'
                                  
                            />
                        </div>

                        
                       <div className="d-flex justify-content-end mt-5">
                            <button type="button" onClick={handleReset} className="btn btn-md btn-danger me-4 ">Reset</button>
                            <button
                                type="submit"
                                id="kt_sign_in_submit"
                                className="btn btn-md btn-primary "
                                disabled={ buttonLoading ? true : false}
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