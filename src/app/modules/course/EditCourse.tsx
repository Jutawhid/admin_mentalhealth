import React, { useState, useEffect,useRef } from 'react';
import { PageTitle } from '../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx';
import Select from 'react-select';
import { useFormik } from 'formik';
import courseAPI from '../../../api/course/courseAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import makeAnimated from 'react-select/animated';
import Loading from '../../components/Loading';
import { imageValidation } from '../../utility/customValidation/fileValidation';
import JoditEditor from 'jodit-react';
// import { configEditor } from '../../../utility/textEditorConfig';
import { configEditor } from '../../utility/textEditorConfig';

const initialValues = {
  title: '',
  details: '',
  image: '',
  roleId: [],
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[a-zA-Z]/, 'Title must be start with alphabet character')
    .required('Title is required')
    .min(2, 'Title must be greater than or equal 2 character'),
  roleId: Yup.array().min(1, 'At least one Role is Required'),
});

const roleOptions = [
  { value: 4, label: 'teen' },
  { value: 3, label: 'Parent' },
];

export const EditCourse: React.FC = () => {
  const [buttonLoading, setbuttonLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<any>({});
  const [defaultRoleOptions, setDefaultRoleOptions] = useState<any>([]);
  const [imageError, setImageError] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const editor = useRef(null);
  const [contentDetails, setContentDetails] = useState<string>('');
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: values => {
      console.log(values);
      //console.log(values.roleId);

      if (!imageError) {
        const formData = new FormData();
        setbuttonLoading(true);

        values.roleId.forEach((val: any) => {
          formData.append('role_id', val.toString());
        });
        formData.append('id', details.id);
        formData.append('title', values.title);
        formData.append('details', values.details);
        formData.append('image', values.image);

        courseAPI.updateCourse(formData as any).then(
          (res: any) => {
            setbuttonLoading(false);
            if (res?.data?.success === true) {
              formik.resetForm();
              navigate('../');
              toast.success(res?.data?.message, {
                theme: 'dark',
              });
            } else {
              toast.error(res?.data?.message, {
                theme: 'dark',
              });
            }
            //console.log(res)
          },
          (err: any) => {
            setbuttonLoading(false);
            toast.error(err?.response?.data?.message, {
              theme: 'dark',
            });
          },
        );
      }
    },
  });
  //console.log("formik values",formik.values);

  const getDetails = (id: number) => {
    setLoading(true);

    courseAPI.getCourseDetails(id).then(
      (res: any) => {
        if (res.data.success === true) {
          setDetails(res.data.data);
        } else {
          toast.error(res.data.message, {
            theme: 'dark',
          });
        }
      },
      (err: any) => {
        if (err?.response?.data?.success === false) {
          setLoading(false);
          toast.error(err?.response?.data?.message, {
            theme: 'dark',
          });
        }
      },
    );
  };

  useEffect(() => {
    let url = window.location.href;
    var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
    getDetails(id);
  }, []);

  useEffect(() => {
    if (Object.keys(details).length !== 0) {
      setLoading(false);
      initialValues.title = details.title;
      initialValues.details = details.details;
      setContentDetails(details.details);
      // formik.setFieldValue('details',details.details)
      const role = details.roleDetails.map((val: any) => {
        return {
          value: val.id,
          label: val.title,
        };
      });
      setDefaultRoleOptions(role);
      const roleId = role.map((val: any) => val.value);
      formik.setFieldValue('roleId', roleId);
    }
  }, [details]);

  const fileChangeHandler = (e: any) => {
    if (e.target.files.length >= 0) {
      const file = e.target.files[0];
      setImage(file);
      console.log(file);
      const err = imageValidation(
        file.type,
        file.size,
        ['image/jpg', 'image/jpeg', 'image/png'],
        2000000,
      );

      if (err) {
        setImageError(err);
      } else {
        setImageError('');
        formik.setFieldValue('image', file);
      }
    } else {
      setImage('');
    }
  };

  useEffect(() => {
    if (!image) {
      setImageError('');
    }
  }, [image]);

  //form field reset using formik resetForm function
  const handleReset = () => {
    formik.resetForm();
    const role = details.roleDetails.map((val: any) => {
      return {
        value: val.id,
        label: val.title,
      };
    });
    setDefaultRoleOptions(role);
    const roleId = role.map((val: any) => val.value);
    formik.setFieldValue('roleId', roleId);
  };

  const selectValueChange = (value: any) => {
    //console.log(value)
    const roleId = value.map((val: any) => val.value);
    formik.setFieldValue('roleId', roleId);
    setDefaultRoleOptions(value);
  };

  const handleDetailsChange = (contentDetails: string) => {
    setContentDetails(contentDetails);
    formik.setFieldValue('details', contentDetails);
  };

  return (
    <>
      <PageTitle>Edit Course</PageTitle>
      {loading ? (
        <Loading />
      ) : (
        <div className="card shadow-sm py-8">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title" className="required">
                  Title
                </label>
                <textarea
                  rows={4}
                  style={{ whiteSpace: 'pre-line' }}
                  placeholder="Enter Course Title"
                  {...formik.getFieldProps('title')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {
                      'is-invalid': formik.touched.title && formik.errors.title,
                    },
                    {
                      'is-valid': formik.touched.title && !formik.errors.title,
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

              <div className=" row mt-5">
                <div className="form-group col-md-6">
                  <label htmlFor="workshopTypeId" className="required">
                    Role
                  </label>
                  <Select
                    isClearable
                    isMulti
                    value={defaultRoleOptions}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={roleOptions}
                    onChange={selectValueChange}
                  />
                  {formik.touched.roleId && formik.errors.roleId && (
                    <div className="fv-plugins-message-container mt-2">
                      <div className="fv-help-block">
                        <span role="alert" className="error text-danger">
                          {formik.errors.roleId}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group col-md-6 form-m-top_upto_md">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    id="image"
                    //onBlur={formik.handleBlur}
                    onChange={fileChangeHandler}
                    className="form-control form-control-lg form-control-solid"
                  />
                  <p className="text-danger">{imageError ? imageError : ''}</p>
                </div>
              </div>

              <div className="form-group mt-5">
                <label htmlFor="details">Details</label>
                {/* <textarea
                  rows={3}
                  id="details"
                  placeholder="Enter Details"
                  {...formik.getFieldProps('details')}
                  className="form-control form-control-lg form-control-solid"
                /> */}
                <JoditEditor
                  ref={editor}
                  value={contentDetails}
                  config={configEditor}
                  // tabIndex={1} // tabIndex of textarea
                  // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={newContent => {
                    handleDetailsChange(newContent);
                  }}
                />
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
      )}
    </>
  );
};
