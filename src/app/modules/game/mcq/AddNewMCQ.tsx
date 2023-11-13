import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx'
import Select from 'react-select'
import { useFormik } from 'formik';
import mcqAPI from '../../../../api/game/mcq/mcqAPI';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Console } from 'console';


const initialValues = {
    
    question:'',
    topic_id:'',
    answer:'',
    option:[]
    
}

 
const validationSchema = Yup.object().shape({

    question: Yup.string().matches(/^[a-zA-Z]/, "Question must be start with alphabet character ! No space and special character allowed").required('Question is required').min(2,'Question must be greater than 2 character').max(200,'Question must be less than 200 character'),
    topic_id:Yup.string().required("Topic is Required"),
    answer:Yup.string().required('Answer is required').min(2,'Question must be greater than 2 character').max(30,'Question must be less than 30 character').test('answer','Answer not match with any option ',((value:any,context:any)=> {
        return context.parent.option.includes(value)
    })),
    option:Yup.array().min(2,"At least two option is required").test("option","Option length should be between 2 to 30 character",( (value:any)=>{
        if(value.length !== 0 ){
            
            let validatioPass=0;

            for(let val of value){
                
                    if( val.length >=2 && val.length <=30 ){
                        validatioPass = validatioPass + 1;
                    }
            }

            if( validatioPass === value.length){
                return true
            } else {
                return false
            }

        } else {
            return value
        }
            
                
    })),
    
})

const initialOption = {
    option_1:'',
    option_2:'',
    option_3:'',
    option_4:'',
    option_5:''
}

export const AddNewMCQ: React.FC = () => {

    const [buttonLoading, setbuttonLoading] = useState<boolean>(false);
    const [activeGameTopic,setActiveGameTopic] = useState<any>([]);
    const [defaultGameTopic,setDefaultGameTopic] = useState<any>();
    const [mcqOption,setMCQOption] = useState<any>(initialOption);
    
    
    const navigate = useNavigate();

    //Add mcq start
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema ,
       
        onSubmit: (values, { setStatus, setSubmitting }) => {
               
            console.log(values)
               setbuttonLoading(true)
               const answer = [values.answer];

               mcqAPI.addNewMCQ(values,answer).then(
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
   //Addmcq end
    
    
    //form field reset using formik resetForm function and manual
    const handleReset = () => {
        formik.resetForm();
        setMCQOption(initialOption);
        setDefaultGameTopic(null)
    }

    const handleOptionChange = (e:any)=>{
        setMCQOption({...mcqOption,[e.target.name]:e.target.value})
    }
    

    const getActiveGameTopic = ()=>{

        mcqAPI.getActiveGameTopic().then(

            (res: any) => {

                if (res.data.data) {
                    //console.log(res.data.data)
                    const data = res.data.data;
                    setActiveGameTopic(data.map((val: any) => {
                        return {
                                value: val.id,
                                label: `${val.title} ( ${val.role_id === 3 ? "Parents" : "Teen"} )`,
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

    useEffect(()=>{
        const option:string[] = [];
        for(let key in mcqOption){
           if(mcqOption[key]){
              option.push(mcqOption[key])
           }
        }

        if( option.length !== 0 ){
            formik.setFieldValue('option',option)
         }
         

    },[mcqOption])

    const selectValueChange = (val:any)=>{
          console.log(val)
          formik.setFieldValue('topic_id',val.value);
          setDefaultGameTopic(val)
         
    }
    useEffect(()=>{
        getActiveGameTopic()
    },[])

   
    return (
        <>

            <PageTitle>Add MCQ Question</PageTitle>
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

                                 { formik.touched.topic_id && formik.errors.topic_id && (
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
                                rows={3}
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
           
                       
                     
                       <div className=''>
                            <p className='m-0 mt-5 required'>Option</p>
                            <div className='row mt-2'>
                                <div className="form-group col-md-6">
                                        
                                        <input
                                            type="text"
                                            placeholder="Enter Option"
                                            className='form-control form-control-lg form-control-solid'
                                            name="option_1"
                                            value={mcqOption.option_1}
                                            onChange={handleOptionChange}
                                        />
                                </div>
                                <div className="form-group col-md-6 form-m-top_upto_md_mcq_option">
                                        
                                        <input
                                            type="text"
                                            placeholder="Enter Option"
                                            className='form-control form-control-lg form-control-solid'
                                            name="option_2"
                                            value={mcqOption.option_2}
                                            onChange={handleOptionChange}
                                        />
                                </div>
                                <div className="form-group col-md-6 mt-5">
                        
                                        <input
                                            type="text"
                                            placeholder="Enter Option"
                                            className='form-control form-control-lg form-control-solid'
                                            name="option_3"
                                            value={mcqOption.option_3}
                                            onChange={handleOptionChange}
                                        />
                                </div>
                                <div className="form-group col-md-6 mt-5">
                                        
                                        <input
                                            type="text"
                                            placeholder="Enter Option"
                                            className='form-control form-control-lg form-control-solid'
                                            name="option_4"
                                            value={mcqOption.option_4}
                                            onChange={handleOptionChange}
                                        />
                                </div>
                                <div className="form-group col-md-6 mt-5">
                                    
                                        <input
                                            type="text"
                                            placeholder="Enter Option"
                                            className='form-control form-control-lg form-control-solid'
                                            name="option_5"
                                            value={mcqOption.option_5}
                                            onChange={handleOptionChange}
                                        />
                                </div>
                            </div>
                            {formik.touched.option && formik.errors.option && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.option}
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