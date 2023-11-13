import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx'
import Select from 'react-select'
import { useFormik } from 'formik';
import crossWordAPI from '../../../../api/game/crossWord/crossWordAPI';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const initialValues = {
    
    question:'',
    topic_id:'',
    answer:''
    
}

const validationSchema = Yup.object().shape({

    question: Yup.string().matches(/^[a-zA-Z]/, "Question must be start with alphabet character ! No space and special character allowed").required('Question is required').min(2,'Question must be greater than 2 character').max(150,'Question must be less than 150 character'),
    topic_id:Yup.string().required("Topic is Required"),
    answer:Yup.string().matches(/^[a-zA-Z]+$/, "Answer must be alphabet character ! No numeric and special character allowed").required('Answer is required').min(2,'Answer must be greater than 2 character').max(7,'Answer must be less than or equal 7 character'),
    
})



export const AddNewCrossWord: React.FC = () => {

    const [buttonLoading, setbuttonLoading] = useState<boolean>(false);
    const [activeGameTopic,setActiveGameTopic] = useState<any>([]);
    const [defaultGameTopic,setDefaultGameTopic] = useState<any>();
   
    
    
    const navigate = useNavigate();

    //Add CrossWord start
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema ,
       
        onSubmit: (values, { setStatus, setSubmitting }) => {
           
            setbuttonLoading(true)
            const answer = [values.answer];


            crossWordAPI.addNewCrossWord(values.topic_id,values.question,answer).then(
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
    //Add CrossWord end
    
    
    //form field reset using formik resetForm function and manual
    const handleReset = () => {
        formik.resetForm();
        setDefaultGameTopic(null)
       
    }

    
    

    const getActiveGameTopic = ()=>{

        crossWordAPI.getActiveGameTopic().then(

            (res: any) => {

                if (res.data.data) {
                    //console.log(res.data.data)
                    const data = res.data.data;
                    setActiveGameTopic(data.map((val: any) => {
                        return {
                                value: val.id,
                                label: `${val.title} ( ${val.role_id === 3 ? "parents" : "teen"} )`,
                               }
                        }));

                   

                } else {
                    toast.error(res.data.message,{
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
          //setDefaultGameTopic(val)
          formik.setFieldValue('topic_id',val.value);
          setDefaultGameTopic(val)
         
    }
    useEffect(()=>{
        getActiveGameTopic()
    },[])

   
    return (
        <>

            <PageTitle>Add Cross Word</PageTitle>
            {/* card start */}
            <div className="card shadow-sm py-8">
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>

                      <div className="form-group">
                                    <label htmlFor="topicId" className="required">Topic</label>
                                    <Select
                                        value={defaultGameTopic}
                                        closeMenuOnSelect={true}
                                        options={activeGameTopic}
                                        onBlur={formik.handleBlur}
                                        onChange={selectValueChange}
                                        className='mt-1'
                                     />

                                 
                                 {formik.touched.topic_id && formik.errors.topic_id && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.topic_id}
                                            </span>
                                        </div>
                                    </div>
                               )}    
                                   
                       </div>

                        <div className="form-group mt-5">
                            <label htmlFor="question" className='required'>Question</label>
                            <textarea
                                cols={3}
                                id="question"
                                placeholder="Enter Question "
                                {...formik.getFieldProps('question')}
                                className={clsx(
                                    'form-control form-control-lg form-control-solid',
                                    {
                                        'is-invalid':
                                            formik.touched.question && formik.errors.question,
                                            
                                    },
                                    {
                                        'is-valid':
                                            formik.touched.question &&
                                            !formik.errors.question,
                                    },
                                )}
                            />

                            {formik.touched.question && formik.errors.question && (
                                <div className="fv-plugins-message-container mt-2 mb-5">
                                    <div className="fv-help-block">
                                        <span role="alert" className="error text-danger">
                                            {formik.errors.question}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
           
                        <div className="form-group mt-5">
                            <label htmlFor="answer" className='required'>Answer</label>
                                 <input
                                        type="text"
                                        id="answer"
                                        placeholder="Enter Answer "
                                        {...formik.getFieldProps('answer')}
                                        className={clsx(
                                            'form-control form-control-lg form-control-solid',
                                            {
                                                'is-invalid':
                                                    formik.touched.answer && formik.errors.answer,
                                                    
                                            },        
                                            {
                                                'is-valid':
                                                    formik.touched.answer &&
                                                    !formik.errors.answer,
                                            },
                                        )}
                                  />

                            {formik.touched.answer && formik.errors.answer && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.answer}
                                            </span>
                                        </div>
                                    </div>
                             )}
                        </div>

                        
                       <div className="d-flex justify-content-end mt-5">
                            <button type="button" onClick={handleReset} className="btn btn-md btn-danger me-4 ">Reset</button>
                            <button
                                type="submit"
                                id="kt_sign_in_submit"
                                className="btn btn-md btn-primary"
                                disabled = { buttonLoading ? true : false}
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