import { PageTitle } from '../../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx'
import { useFormik } from 'formik';

const initialValues = {

  firstName: '',
  lastName: '',
  companyName: '',
  contactPhone: '',
  contactSite: '',
  countryName: '',
  communication: '',
  image: ''
}

const ParentSchema = Yup.object().shape({
  firstName: Yup.string().required('This first name field is Required'),
  lastName: Yup.string().required(' This last name field is Required'),
  companyName: Yup.string().required(" This company name field is Required"),
  contactPhone: Yup.string().required(" This contact Phone field is Required"),
  contactSite: Yup.string().required(" This contact Site field is Required"),
  countryName: Yup.string().required(" This country name field is Required"),
  communication: Yup.string().required(" This communication field is Required"),

});




const AddNewParents = () => {


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ParentSchema,
    onSubmit: (value) => {
      console.log(value);
    }

  });
  //console.log("formik values",formik.values);
  return (
    <>

      <PageTitle>Add Parents</PageTitle>

      <div className="card shadow-sm py-8">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="firstName" className="required">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  {...formik.getFieldProps('firstName')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {
                      'is-invalid':
                        formik.touched.firstName && formik.errors.firstName,
                    },
                    {
                      'is-valid':
                        formik.touched.firstName &&
                        !formik.errors.firstName,
                    },
                  )}
                />

                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="fv-plugins-message-container mt-2 mb-5">
                    <div className="fv-help-block">
                      <span role="alert" className="error text-danger">
                        {formik.errors.firstName}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="lastName" className="required">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  {...formik.getFieldProps('lastName')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {
                      'is-invalid':
                        formik.touched.lastName && formik.errors.lastName,
                    },
                    {
                      'is-valid':
                        formik.touched.lastName &&
                        !formik.errors.lastName,
                    },
                  )}
                />

                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="fv-plugins-message-container mt-2 mb-5">
                    <div className="fv-help-block">
                      <span role="alert" className="error text-danger">
                        {formik.errors.lastName}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>


            <div className="form-group mt-5">
              <label htmlFor="companyName" className="required">Company Name</label>
              <input
                type="text"
                id="companyName"
                placeholder="Company Name"
                {...formik.getFieldProps('companyName')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid':
                      formik.touched.companyName && formik.errors.companyName,
                  },
                  {
                    'is-valid':
                      formik.touched.companyName &&
                      !formik.errors.companyName,
                  },
                )}
              />

              {formik.touched.companyName && formik.errors.companyName && (
                <div className="fv-plugins-message-container mt-2 mb-5">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.companyName}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="form-group mt-5">
              <label htmlFor="contactPhone" className="required">Contact Phone</label>
              <input
                type="text"
                id="contactPhone"
                placeholder="Contact Phone"
                {...formik.getFieldProps('contactPhone')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid':
                      formik.touched.contactPhone && formik.errors.contactPhone,
                  },
                  {
                    'is-valid':
                      formik.touched.contactPhone &&
                      !formik.errors.contactPhone,
                  },
                )}
              />

              {formik.touched.contactPhone && formik.errors.contactPhone && (
                <div className="fv-plugins-message-container mt-2 mb-5">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.contactPhone}
                    </span>
                  </div>
                </div>
              )}

            </div>

            <div className="form-group mt-5">
              <label htmlFor="contactSite" className="required">Contact Site</label>
              <input
                type="text"
                id="contactSite"
                placeholder="Contact Site"
                {...formik.getFieldProps('contactSite')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid':
                      formik.touched.contactSite && formik.errors.contactSite,
                  },
                  {
                    'is-valid':
                      formik.touched.contactSite &&
                      !formik.errors.contactSite,
                  },
                )}
              />

              {formik.touched.contactSite && formik.errors.contactSite && (
                <div className="fv-plugins-message-container mt-2 mb-5">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.contactSite}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="form-group mt-5">
              <label htmlFor="countryName" className="required">Country Name</label>
              <input
                type="text"
                id="countryName"
                placeholder="Country Name"
                {...formik.getFieldProps('countryName')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid':
                      formik.touched.countryName && formik.errors.countryName,
                  },
                  {
                    'is-valid':
                      formik.touched.countryName &&
                      !formik.errors.countryName,
                  },
                )}
              />

              {formik.touched.countryName && formik.errors.countryName && (
                <div className="fv-plugins-message-container mt-2 mb-5">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.countryName}
                    </span>
                  </div>
                </div>
              )}
            </div>


            <div className="form-group mt-5">
              <label htmlFor="communication" className="required">Communication</label>
              <input
                type="text"
                id="communication"
                placeholder="Email or Phone"
                {...formik.getFieldProps('communication')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid':
                      formik.touched.communication && formik.errors.communication,
                  },
                  {
                    'is-valid':
                      formik.touched.communication &&
                      !formik.errors.communication,
                  },
                )}
              />

              {formik.touched.communication && formik.errors.communication && (
                <div className="fv-plugins-message-container mt-2 mb-5">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.communication}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="form-group mt-5">
              <label htmlFor="file" className="required">Upload Image</label>
              <input
                type="file"
                id="file"
                placeholder="Upload Image"
                {...formik.getFieldProps('image')}
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
                <div className="fv-plugins-message-container mt-2 mb-5">
                  <div className="fv-help-block">
                    <span role="alert" className="error text-danger">
                      {formik.errors.image}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-end mt-5">
              <button type="reset" className="btn btn-md btn-danger me-4 ">Discard</button>
              <button type="submit" className="btn btn-md btn-success ">Save</button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default AddNewParents;