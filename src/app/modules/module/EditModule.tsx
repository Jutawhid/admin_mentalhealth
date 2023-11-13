import React, { useEffect, useState } from "react";
import { PageTitle } from '../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useFormik } from "formik";
import ModuleAPI from '../../../api/module/moduleAPI'
import { toast } from 'react-toastify';
import Loading  from "../../components/Loading";
import  {useNavigate } from "react-router-dom";
const initialValues = {
  title: '',
  keyName: '',
}

const ParentSchema = Yup.object().shape({
  title: Yup.string().required('Title is Required field'),
  keyName: Yup.string().required('key Name is Required field'),
});

export const EditModule: React.FC = () => {

  const [moduleDetails, setModuleDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ParentSchema,
    onSubmit: (values,{setStatus, setSubmitting}) => {
      setButtonLoading(true)
      ModuleAPI.updateModule(moduleDetails.id,values as any).then(
        
        (res: any) => {
          setButtonLoading(false)
          if (res.data.success === true) {
            formik.resetForm()
            navigate("../")
            toast.success(res?.data?.message, {
              theme: 'dark'
            })
          }
          else {
            setStatus(res.data.message)
            toast.error(res?.data?.message, {
              theme: 'dark'
            })
          }
        },
        (err: any) => {
          setButtonLoading(false)
          toast.error(err?.response?.data?.message, {
            theme: 'dark'
          })
        }
      )
    }

  });

  const getDetails = (id: number) => {

    setLoading(true)

    ModuleAPI.getModuleDetail(id).then(
      (res: any) => {

        if (res.data.success === true) {
          setModuleDetails(res.data.data)
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
  

  const handleReset = () => {
    formik.resetForm();
    //initialValues.title="";
   // initialValues.keyName="";
  }

  useEffect(() => {
    let url = window.location.href;
    var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
    //console.log(id)
    getDetails(id);
  }, [])


  useEffect(() => {
    if (Object.keys(moduleDetails).length !== 0) {
      setLoading(false); //set loading set false when moduleDetails Isnot empty 
      initialValues.title = moduleDetails.title;
      initialValues.keyName = moduleDetails.key_name;

    }
  }, [moduleDetails])




  return (
    <>

      <PageTitle>Edit Module</PageTitle>
      {/* card start */}
      {loading ? <Loading /> : (
        <div className="card shadow-sm py-8">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>

              <div className="form-group">
                <label htmlFor="title" className="required">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="First Title "
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

              <div className="form-group mt-4">
                <label htmlFor="keyName" className="required">Key Name</label>
                <input
                  type="text"
                  id="keyName"
                  placeholder="Key Name"
                  {...formik.getFieldProps('keyName')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {
                      'is-invalid':
                        formik.touched.keyName && formik.errors.keyName,
                    },
                    {
                      'is-valid':
                        formik.touched.keyName &&
                        !formik.errors.keyName,
                    },
                  )}
                />

                {formik.touched.keyName && formik.errors.keyName && (
                  <div className="fv-plugins-message-container mt-2 mb-5">
                    <div className="fv-help-block">
                      <span role="alert" className="error text-danger">
                        {formik.errors.keyName}
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
                //style={{ backgroundColor: '#000000' }}
                // disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!buttonLoading && <span className="indicator-label">Update</span>}
                  {buttonLoading && (
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
        </div>)
      }
    </>
  )
}