import React, { useState ,useEffect } from 'react';
import { PageTitle } from '../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx'
import { useFormik } from 'formik';
import quizAPI from '../../../api/quiz/quizAPI';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const initialValues = {
    question: '',
    
}

const validationSchema = Yup.object().shape({
    question: Yup.string().required('Question is required').min(2,'Question must be greater than 2 character').max(50,'Question must be less than 150 character'),
    
})



export const EditQuiz: React.FC = () => {

    const [buttonLoading, setbuttonLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema ,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            //console.log(values);
            setbuttonLoading(true)
            quizAPI.updateQuiz(details.id,values.question).then(
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


    const getDetails = (id: number) => {

        setLoading(true)
    
        quizAPI.getQuizDetail(id).then(
          (res: any) => {
            if (res.data.success === true) {
                setDetails(res.data.data)
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

       useEffect(() => {
          let url = window.location.href;
          var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
          //console.log(id)
          getDetails(id);
        }, [])
        
         useEffect(()=>{
            if(Object.keys(details).length !==0 ){
                setLoading(false)
                initialValues.question=details.question
            }
         },[details])

        //console.log("formik values",formik.values);
        //form field reset using formik resetForm function
        const handleReset = () => {
            formik.resetForm();
        }
    
   

    return (
        <>

            <PageTitle>Update Quiz</PageTitle>
            {/* card start */}
            { loading ? <Loading/> : (
            <div className="card shadow-sm py-8">
                <div className="card-body">
                   
                    <form onSubmit={formik.handleSubmit}>
                        
                            <div className="form-group">
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