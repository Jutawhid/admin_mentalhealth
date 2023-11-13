import React, { useState, useEffect } from 'react';
import { PageTitle } from '../../../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import { KTSVG } from '../../../../../_jutemplate/helpers';
import courseAttachmentAPI from '../../../../../api/course/courseAttachmentAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../../../../_jutemplate/assets/css/custom.css';


const initialValues = {
  content_type: '',
  file_name: '',
  url: '',
};

const validationSchema = Yup.object().shape({
  content_type: Yup.string().required('Title is required'),
  // details:Yup.string().required('Details is required').min(10,'Details must be greater than 10 character'),
  // read_time:Yup.string().matches(/^[0-9]+$/, "Read Time must be numeric value").required('Read Time is required').test('readTime','Read Time must be between 1 minute to 300 minute',(value:any)=>{
  //     return ( value <= 300 && value >= 1 );
  // }),
});

const courseAttachmentType: any = [
  { id: 0, type: 'select...' },
  { id: 1, type: 'pdf' },
  { id: 2, type: 'url' },
];

export const EditAttachment: React.FC = () => {
  const [ buttonLoading, setbuttonLoading ] = useState<boolean>(false);
  const [ courseAttachmentEditId, setCourseAttachmentEditId ] = useState<number>(0);
  const [ contentType, setContentType ] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [ filePath, setfilePath ] = useState<string>('')
  const [ fileName, setFileName ] = useState<string>('')

  const location:any = useLocation();
  // const [ contentDetails, setContentDetails ] = useState<string>('')
 
  const navigate = useNavigate();

  const attachmentId = location?.state?.attachmentId;

  console.log(attachmentId)

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: (values, { setStatus, setSubmitting }) => {
      console.log(values);
      setbuttonLoading(true);
      const formData = new FormData();

      // const data:any = {
      //   course_read_content_id:courseAttachmentId,
      //   content_type:values.content_type,
      //   file_name:values.file_name,
      //   url:values.url
      //  }

       formData.append('id', courseAttachmentEditId.toString());
       formData.append('content_type', values.content_type);
       formData.append('file_name', values.file_name);
       formData.append('url', values.url );

      courseAttachmentAPI.updateCourseAttachment(formData).then(
        (res: any) => {
          setbuttonLoading(false);
          if (res.data.success === true) {
            formik.resetForm();
            navigate(`../${attachmentId}`);
            toast.success(res?.data?.message, {
              theme: 'dark',
            });
          } else {
            setStatus(res.data.message);
            setSubmitting(false);
            toast.error(res?.data?.message, {
              theme: 'dark',
            });
          }
        },
        (err: any) => {
          setbuttonLoading(false);
          toast.error(err?.response?.data?.message, {
            theme: 'dark',
          });
        },
      );
    },
  });
  //console.log("formik values",formik.values);
  //form field reset using formik resetForm function

  const handleReset = () => {
    formik.resetForm();
  };

  useEffect(() => {
    let url = window.location.href;
    var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
    console.log(id);
    setCourseAttachmentEditId(id);
  }, []);

  const fileChangeHandler = (e: any) => {
    if (e.target.files.length >= 0) {
      // console.log(e.target.files[0])
      const file = e.target.files[0];
      formik.setFieldValue('file_name', file);
    }
  };

  const handleContentTypeChange = (e: any) => {
    setContentType(e.target.value);
    formik.setFieldValue('content_type', e.target.value);
  };
  
  const getInitialValue = (id:number)=>{

    courseAttachmentAPI.getCourseAttachmentById(id).then(
      
      (res: any) => {
        setLoading(false)
        if (res.data.data) {
          console.log(res)
          console.log(res.data.data)
          // setCourseReadAttachmentData(res.data.data)
          setContentType(res.data.data.content_type)
          formik.setFieldValue('content_type',res.data.data.content_type)
          formik.setFieldValue('file_name',res.data.data.content_type)
          setfilePath(res.data.attachmentFolderPath);
          setFileName(res.data.data.file_name);
          formik.setFieldValue('url',res.data.data.url)

          
        } else{
          toast.error(res.data.message, {
            theme: 'dark',
          })
        }
      },
      (err: any) => {
        setLoading(false)
        if (err?.response?.data?.success === false) {
          toast.error(err.response.data.message, {
            theme: 'dark',
          })
        }
      },
    )

  }

  useEffect(()=>{
    if(courseAttachmentEditId){
       getInitialValue(courseAttachmentEditId)
    }
  },[courseAttachmentEditId])
  return (
    <>
      <PageTitle>Edit Attachment</PageTitle>
      {/* card start */}
      <div className="card shadow-sm py-8">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="title" className="required">
                  Select Attachment Type
                </label>
                <select
                  className="form-select form-select-lg mt-3"
                  aria-label=".form-select-lg example"
                  value={contentType}
                  onChange={handleContentTypeChange}>
                  {courseAttachmentType.map((item: any) => {
                    if (item.id === 0) {
                      return (
                        <option disabled key={item.id} value={item.id}>
                          {item.type}
                        </option>
                      );
                    } else {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.type}
                        </option>
                      );
                    }
                  })}
                </select>

                {formik.touched.content_type && formik.errors.content_type && (
                  <div className="fv-plugins-message-container mt-2 mb-5">
                    <div className="fv-help-block">
                      <span role="alert" className="error text-danger">
                        {formik.errors.content_type}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {contentType == 2 && (
                <div className="form-group col-md-6">
                  <label htmlFor="title" className="required">
                    URL
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    id="title"
                    placeholder="Enter Title "
                    {...formik.getFieldProps('url')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid mt-3',
                      {
                        'is-invalid': formik.touched.url && formik.errors.url,
                      },
                      {
                        'is-valid': formik.touched.url && !formik.errors.url,
                      },
                    )}
                  />

                  {formik.touched.url && formik.errors.url && (
                    <div className="fv-plugins-message-container mt-2 mb-5">
                      <div className="fv-help-block">
                        <span role="alert" className="error text-danger">
                          {formik.errors.url}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {contentType == 1 && (
                
                <div className="form-group col-md-5  form-m-top_upto_md">
                  <label htmlFor="image" className="required">
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    //onBlur={formik.handleBlur}
                    onChange={fileChangeHandler}
                    className={clsx(
                      'form-control form-control-lg form-control-solid mt-3',
                      {
                        'is-invalid':
                          formik.touched.file_name && formik.errors.file_name,
                      },
                      {
                        'is-valid':
                          formik.touched.file_name && !formik.errors.file_name,
                      },
                    )}
                  />

                  {formik.touched.file_name && formik.errors.file_name && (
                    <div className="fv-plugins-message-container mt-2">
                      <div className="fv-help-block">
                        <span role="alert" className="error text-danger">
                          {formik.errors.file_name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
               
              )}

              {/* { contentType == 1 && (
              <div className='col-md-1 mt-11'>
                   
                     <Link
                        to={`${filePath}/${fileName}`}
                        target="_blank"
                        //state={{ rowIdx }}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTSVG
                          path="/media/icons/duotune/art/art005.svg"
                          className="svg-icon-3"
                        />
                      </Link>
              </div>
              )
              } */}
            </div>

            <div className="d-flex justify-content-end mt-5">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-md btn-danger me-4 ">
                Reset
              </button>

              <button
                type="submit"
                id="kt_sign_in_submit"
                className="btn btn-md btn-primary "
                disabled={buttonLoading ? true : false}
                //style={{ backgroundColor: '#000000' }}
                // disabled={formik.isSubmitting || !formik.isValid}
              >
                {buttonLoading ? (
                  <span
                    className="indicator-progress"
                    style={{ display: 'block' }}>
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                ) : (
                  <span className="indicator-label">Submit</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* card end */}
    </>
  );
};