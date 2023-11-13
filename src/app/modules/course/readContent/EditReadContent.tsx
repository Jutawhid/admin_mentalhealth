import React, { useState, useRef, useMemo,useEffect } from 'react';
import { PageTitle } from '../../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx'
import { useFormik } from 'formik';
import readContentAPI from '../../../../api/course/readContentAPI';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import '../../../../_jutemplate/assets/css/custom.css'
import JoditEditor from 'jodit-react';
import { configEditor } from '../../../utility/textEditorConfig';

const initialValues = {

    title: '',
    details:'',
    read_time:''

}

const validationSchema = Yup.object().shape({
    title: Yup.string().matches(/^[a-zA-Z0-9]/, "Title must be start with alphabet character or numeric value").required('Title is required').min(2,'Title must be greater than 2 character').max(50,'Title must be less than 50 character'),
    details:Yup.string().required('Details is required').min(10,'Details must be greater than 10 character'),
    read_time:Yup.string().matches(/^[0-9]+$/, "Read Time must be numeric value").required('Read Time is required').test('readTime','Read Time must be between 1 minute to 300 minute',(value:any)=>{
        return ( value <= 300 && value >= 1 );
    }),

})



export const EditReadContent: React.FC = () => {

    const [buttonLoading, setbuttonLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>({});
    const editor = useRef(null);
    const [ contentDetails, setContentDetails ] = useState<string>('')
    //const [courseId,setCourseId] = useState<number>(0)


    const navigate = useNavigate();

    const handleDetailsChange = (contentDetails:string)=>{
        setContentDetails(contentDetails)
        formik.setFieldValue('details',contentDetails)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema ,

        onSubmit: (values, { setStatus, setSubmitting } ) => {

            setbuttonLoading(true)
            readContentAPI.updateReadContent(details.id,details.course_id,values).then(
                (res: any) => {
                    setbuttonLoading(false)
                    if (res.data.success === true) {
                        formik.resetForm()
                        navigate(`../${details.course_id}`)
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
    //console.log("formik values",formik.values);
    //form field reset using formik resetForm function
    const handleReset = () => {
        formik.resetForm();
    }


    const getDetails = (id: number) => {

        setLoading(true)

        readContentAPI.getReadContentDetails(id).then(
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
        getDetails(id);
    },[])

    useEffect(()=>{

        if(Object.keys(details).length !==0 ){

            setLoading(false)
            initialValues.title = details.title;
            initialValues.details = details.details;
            initialValues.read_time = details.reading_time;
            setContentDetails(details.details)
            formik.setFieldValue('details',details.details)
            
        }
    },[details])

    // useEffect(() => {

    //     let url = window.location.href;
    //     var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
    //     console.log(id);
    //     //setCourseId(id);
    //   },[])

    //   useEffect(()=>{
    //     if(courseId){
    //         console.log(courseId)
    //     }
    //   },[courseId])

    return (
        <>

            <PageTitle>Update Read Content</PageTitle>
            {/* card start */}
            { loading ? <Loading/> : (
            <div className="card shadow-sm py-8">
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>

                      <div className='row'>
                            <div className="form-group col-md-6">
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
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.title}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="form-group col-md-6 form-m-top_upto_md">
                                <label htmlFor="readTime" className='required'>Read Time ( Minute )</label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    id="readTime"
                                    placeholder="Enter Read Time"
                                    {...formik.getFieldProps('read_time')}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.read_time && formik.errors.read_time,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.read_time &&
                                                !formik.errors.read_time,
                                        },
                                    )}
                                />

                                {formik.touched.read_time && formik.errors.read_time && (
                                    <div className="fv-plugins-message-container mt-2">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.read_time}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                       </div>
                        <div className="form-group mt-5 ">
                                <label htmlFor="readTime" className='required'>Details</label>
                            

                               <JoditEditor
                                    ref={editor}
                                    value={contentDetails}
                                    config={configEditor}
                                    // tabIndex={1} // tabIndex of textarea
                                    // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                    onChange={(newContent) => {handleDetailsChange(newContent)}}
                                />

                                {formik.touched.details && formik.errors.details && (
                                    <div className="fv-plugins-message-container mt-2 mb-5">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.details}
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
                                        <span className="indicator-label">Submit</span>
                                    )
                                }
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            )}
            {/* card end */}
        </>
    )
}