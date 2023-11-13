import React, { useEffect, useState, useRef } from "react";
import { PageTitle } from '../../../../_jutemplate/layout/core';
import * as Yup from 'yup';
import clsx from 'clsx';
import Select from 'react-select'
import { useFormik } from "formik";
import workshopAPI from "../../../../api/workshop/workshopAPI";
import workshopTypeAPI from "../../../../api/workshop/workshopTypeAPI";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import makeAnimated from 'react-select/animated'
import Loading from "../../../components/Loading";
import moment from 'moment';
import { imageValidation } from "../../../utility/customValidation/fileValidation";
import { configEditor } from '../../../utility/textEditorConfig';
import JoditEditor from 'jodit-react';

const initialValues = {
    workshop_type_id:[],
    title: '',
    host_name: '',
    host_details: '',
    description: '',
    program_date: '',
    duration: '',
    // price: '',
    image:''
}
 
 const today = new Date();



const validationSchema = Yup.object().shape({

    title: Yup.string().matches(/^[a-zA-Z]/, "Title must be start with alphabet character").required('Title is required').min(2, 'Title must be greater than 2 character').max(50, 'Title must be less than 50 character'),
    host_name: Yup.string().matches(/^[a-zA-Z]/, "Host Name be start with alphabet character").required('Host Name is required').min(3, 'Host Name must be greater than 3 character').max(50, 'Host Name must be less than 50 character'),
    duration: Yup.string().matches(/^[0-9]+$/, "Please enter numeric value only ! No alphabet character and special character is allowed").required('Duration is required').test('duration','Workshop Duration must be between 1 minute to 800 minute',(value:any)=>{
        
        if( parseInt(value) > 0 && parseInt(value) <= 800 ){
            return true
        } else {
            return false
        }
        
    }),
    // price: Yup.string().matches(/(^[0-9]+\.?[0-9]+$)|(^[0-9]+$)/, "Please enter valid number only").required('Price is required').max(10,'Price must be less than or equal 10 digit').test('Price','Price must be greater than 0 $',(value:any)=>{
    //     return value > '0';
    // }),

    program_date: Yup.string().required('Publish Date is required').test('publishYear',"Please select the current year or a year within next 5 year ", (value:any)=> {
        //console.log(value);
        if(value){
            const date = moment(value).format(
                'yyyy-MM-DD',
            );
        
            const userInputYear:number = parseInt(date.split('-')[0]); 
            if( ( today.getFullYear() <= userInputYear ) && ( today.getFullYear()+5 >= userInputYear ) ){
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }).test('publishDate',"Please select today or upcoming days", (value:any)=> {
        
        if(value){
            const date = moment(value).format(
                'yyyy-MM-DD',
            );
        
            const userInputDate:number = parseInt(date.split('-')[2]);
            const userInputMonth:number = parseInt(date.split('-')[1]);
            const userInputYear:number = parseInt(date.split('-')[0]);

            
            if( ( today.getFullYear() < userInputYear ) ){
                return true
            } else if( ( today.getMonth()+1 < userInputMonth ) && (today.getFullYear() === userInputYear )  ){
                return true
            } else if( ( today.getMonth()+1 === userInputMonth ) && ( today.getDate() <= userInputDate ) && ( today.getFullYear() === userInputYear ) ){
                return true
            } else {
                return false
            }

        } else {
            return false
        }
     }).test('publishTime', "Select current time or next upcoming time", (value: any) => {
        
        if (value) {
            
             //console.log(value.program_date.split("T")[1])
             const todayHour = today.getHours();
             const todayMinute = today.getMinutes();

             const date = moment(value).format(
                'yyyy-MM-DD',
             );
             console.log(date)

            const userInputDate: number = parseInt(date.split('-')[2]);
            const userInputMonth:number = parseInt(date.split('-')[1]);
            const userInputYear:number = parseInt(date.split('-')[0]); 

            //console.log(today.getDate())
            //console.log(userInputDate)

            const time = moment(value).format("HH:mm")
            //console.log(time)
            const userInputHour: number = parseInt(time.split(':')[0]);
            const userInputMinute: number = parseInt(time.split(':')[1]);

            


        //    if( ( today.getFullYear() < userInputYear ) ){
        //         return true
        //    } else if( ( userInputMonth > today.getMonth()+1 ) && ( today.getFullYear() === userInputYear ) ) {
        //        return true
        //    } else if( ( userInputDate === today.getDate() ) && ( userInputMonth === today.getMonth()+1 ) &&  ( today.getFullYear() === userInputYear ) ) {
        //         console.log("juuh")
        //         if( ( today.getHours() <= userInputHour ) && ( today.getMinutes() <=userInputMinute ) ) {
        //                  return true
        //              } else {
        //                  return false
        //              } 

        //    } else {
        //        console.log("false")
        //        return false 
        //    }

            if(( userInputDate === today.getDate() ) && ( userInputMonth === today.getMonth()+1 ) &&  ( today.getFullYear() === userInputYear )){
                
                if( ( today.getHours() <= userInputHour ) && ( today.getMinutes() <=userInputMinute ) ) {
                        return true
                    } else {
                        return false
                    }

            } else {
                return true
            }

       } else {
            return false
    }

  }),
   workshop_type_id: Yup.array().min(1, "At least one workshop Topic is required"),
});

export const EditWorkshop: React.FC = () => {

    const [defaultWorkshopType, setDefaultWorkshopType] = useState<any>([])
    const [buttonLoading, setbuttonLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [workshopTypeData, setWorkshopTypeData] = useState<any>([]);
    const [details, setDetails] = useState<any>([]);
    const [image,setImage] = useState<string>('');
    const [imageError,setImageError] = useState<string>('');
    const [ workshopDescription, setWorkshopDescription ] = useState<string>('')
    const editor = useRef(null);
    const animatedComponents = makeAnimated()

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,

        onSubmit: (values, { setStatus, setSubmitting }) => {
            console.log(values);

            if(!imageError){

                    setbuttonLoading(true)
                    const formData = new FormData();

                    // const today = new Date()
                    // console.log(values.program_date);
                    // //console.log(values.program_date.split("T")[1])
                    // const time = values.program_date.split("T")[1]+":00";
                    // const date = values.program_date.split("T")[0];
                    // console.log(time);
                    // const dateAndTime = date+" "+time;

                    values.workshop_type_id.forEach((val:any)=>{
                     
                        formData.append("workshop_type_id",val.toString())
                            
                     });
                    
                    formData.append('title', values.title);
                    formData.append('host_name', values.host_name);
                    formData.append('host_details', values.host_details);
                    formData.append('description', values.description);
                    formData.append('duration', values.duration);
                    // formData.append('price', values.price);
                    formData.append("program_date", values.program_date)
                    formData.append('image', values.image);
                    formData.append('id', details.id);


                    workshopAPI.updateWorkshop(formData as any).then(

                        (res: any) => {
                            setbuttonLoading(false);
                            if (res?.data?.success === true) {
                                formik.resetForm()
                                navigate("../");
                                toast.success(res?.data?.message, {
                                    theme: 'dark'
                                })
                            } else {
                                toast.error(res?.data?.message, {
                                    theme: 'dark'
                                })
                            }
                            //console.log(res)
                        }, (err: any) => {
                            setbuttonLoading(false);
                            toast.error(err?.response?.data?.message, {
                                theme: 'dark'
                            })
                        }
                    )
                }

        }

    });

    const workshopDetails = (id: number) => {
        setLoading(true)

        workshopAPI.getDetails(id).then(
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

    const fileChangeHandler = (e: any) => {

        if (e.target.files.length >= 0) {

            const file = e.target.files[0];
            setImage(file)

            const err = imageValidation(file.type,file.size,["image/jpg","image/jpeg","image/png"],5000000)

            if( err ){

                setImageError(err)

            } else{

                setImageError('')
                formik.setFieldValue('image',file )
                
            }

        } else{
            setImage('')
        }

    }

    useEffect(()=>{
        if(!image){
          setImageError('')
        }
     },[image])

    //form field reset using formik resetForm function
    const handleReset = () => {
        formik.resetForm();
        const workshopType = details.workShopTypeDetails.map((val: any) => {
            return {
                value: val.id,
                label: val.title,
            };
          }
        )
        setDefaultWorkshopType(workshopType)
        const workshopTypeId =  workshopType.map((val: any) => val.value);
        formik.setFieldValue('workshop_type_id',workshopTypeId);
    }
    
    //get list workshop type start
    //value: val.id,
    const getWorkShopType = () => {

        workshopTypeAPI.getWorkshopActivList().then(

            (res: any) => {

                if (res.data.data) {
                    console.log(res.data.data)
                    const data = res.data.data;
                    setWorkshopTypeData(data.map((val: any) => {
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
    useEffect(() => {
        getWorkShopType()
    },[])

    //get list workshop type end

    const selectValueChange = (value: any) => {
        //console.log(value)
         const workshopTypeId = value.map((val:any)=>val.value)
         formik.setFieldValue('workshop_type_id',workshopTypeId);
         setDefaultWorkshopType(value)

    }
    
   
    useEffect(() => {
        let url = window.location.href;
        var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
        workshopDetails(id);
    }, [])

    useEffect(() => {

        if (Object.keys(details).length !== 0) {
            setLoading(false);
            initialValues.title = details.title;
            initialValues.description = details.description;
            setWorkshopDescription( details.description )
            initialValues.duration = details.duration;
            initialValues.host_name = details.host_name;
            initialValues.host_details = details.host_details;
            // initialValues.price = details.price;
            initialValues.program_date = moment(details.program_date).format(
                'YYYY-MM-DD HH:mm:ss',
            );
            const workshopType = details.workShopTypeDetails.map((val: any) => {
                return {
                    value: val.id,
                    label: val.title,
                };
            }
            )
           
            setDefaultWorkshopType(workshopType)
            const workshopTypeId =  workshopType.map((val: any) => val.value);
            formik.setFieldValue('workshop_type_id',workshopTypeId);

        }



    }, [details])

    
    const handleDetailsChange = (contentDetails:string)=>{
        setWorkshopDescription(contentDetails)
        formik.setFieldValue('description',contentDetails)
    }
    
  
    return (
        <>

            <PageTitle>Update Workshop</PageTitle>
            {loading ? <Loading /> : (
                <div className="card shadow-sm py-8">
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>


                            <div className="form-group ">
                                <label htmlFor="title" className="required">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="Enter Title Name"
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

                            <div className="form-group mt-5">
                                <label htmlFor="hostName" className="required">Host Name</label>
                                <input
                                    type="text"
                                    id="hostName"
                                    placeholder="Enter Host Name"
                                    {...formik.getFieldProps('host_name')}
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid':
                                                formik.touched.host_name && formik.errors.host_name,
                                        },
                                        {
                                            'is-valid':
                                                formik.touched.host_name &&
                                                !formik.errors.host_name,
                                        },
                                    )}
                                />

                                {formik.touched.host_name && formik.errors.host_name && (
                                    <div className="fv-plugins-message-container mt-2 mb-5">
                                        <div className="fv-help-block">
                                            <span role="alert" className="error text-danger">
                                                {formik.errors.host_name}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>


                            <div className="form-group mt-5">
                                <label htmlFor="hostDetails">Host Details</label>
                                <textarea
                                    rows={3}
                                    id="hostDetails"
                                    placeholder="Enter Host Details "
                                    {...formik.getFieldProps('host_details')}
                                    className="form-control form-control-lg form-control-solid"
                                />
                            </div>

                            <div className="form-group mt-5">
                                <label htmlFor="description">Description</label>

                                {/* <textarea
                                    rows={3}
                                    id="description"
                                    placeholder="Enter Description "
                                    {...formik.getFieldProps('description')}
                                    className="form-control form-control-lg form-control-solid"
                                /> */}

                                <JoditEditor
                                    ref={editor}
                                    value={workshopDescription}
                                    config={configEditor}
                                    // tabIndex={1} // tabIndex of textarea
                                    // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                    onChange={(newContent) => {handleDetailsChange(newContent)}}
                                />

                            </div>

                            <div className="row mt-5">

                                {/* <div className="form-group col-md-4">
                                    <label htmlFor="price" className="required">Price $</label>
                                    <input
                                        type="text"
                                        id="price"
                                        placeholder="Enter Price"
                                        {...formik.getFieldProps('price')}
                                        className={clsx(
                                            'form-control form-control-lg form-control-solid',
                                            {
                                                'is-invalid':
                                                    formik.touched.price && formik.errors.price,
                                            },
                                            {
                                                'is-valid':
                                                    formik.touched.price &&
                                                    !formik.errors.price,
                                            },
                                        )}
                                    />

                                    {formik.touched.price && formik.errors.price && (
                                        <div className="fv-plugins-message-container mt-2">
                                            <div className="fv-help-block">
                                                <span role="alert" className="error text-danger">
                                                    {formik.errors.price}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                </div> */}

                                <div className="form-group col-md-6">
                                    <label htmlFor="programDate" className="required" >Program Date</label>
                                    <input
                                        type="datetime-local"
                                        autoComplete="off"
                                        id="programDate"
                                        {...formik.getFieldProps('program_date')}
                                        className={clsx(
                                            'form-control form-control-lg form-control-solid',
                                            {
                                                'is-invalid':
                                                    formik.touched.program_date && formik.errors.program_date,
                                            },
                                            {
                                                'is-valid':
                                                    formik.touched.program_date &&
                                                    !formik.errors.program_date,
                                            },
                                        )}
                                    />

                                    {formik.touched.program_date && formik.errors.program_date && (
                                        <div className="fv-plugins-message-container mt-2">
                                            <div className="fv-help-block">
                                                <span role="alert" className="error text-danger">
                                                    {formik.errors.program_date}
                                                </span>
                                            </div>
                                        </div>
                                    )}


                                </div>


                                <div className="form-group col-md-6">
                                    <label htmlFor="duration" className="required">Duration ( Minute )</label>
                                    <input
                                        type="text"
                                        id="duration ( Minute )"
                                        placeholder="Enter Duration Minute"
                                        {...formik.getFieldProps('duration')}
                                        className={clsx(
                                            'form-control form-control-lg form-control-solid',
                                            {
                                                'is-invalid':
                                                    formik.touched.duration && formik.errors.duration,
                                            },
                                            {
                                                'is-valid':
                                                    formik.touched.duration &&
                                                    !formik.errors.duration,
                                            },
                                        )}
                                    />

                                    {formik.touched.duration && formik.errors.duration && (
                                        <div className="fv-plugins-message-container mt-2">
                                            <div className="fv-help-block">
                                                <span role="alert" className="error text-danger">
                                                    {formik.errors.duration}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                </div>


                            </div>
                            <div className="row mt-5">
                                <div className="form-group col-md-6">
                                    <label htmlFor="workshopTypeId" className="required">
                                        Workshop Topic
                                    </label>
                                    <Select
                                        value={defaultWorkshopType}
                                        isClearable
                                        isMulti
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        options={workshopTypeData}
                                        onChange={selectValueChange}
                                    />
                                    {formik.touched.workshop_type_id && formik.errors.workshop_type_id && (
                                        <div className="fv-plugins-message-container mt-2">
                                            <div className="fv-help-block">
                                                <span role="alert" className="error text-danger">
                                                    {formik.errors.workshop_type_id}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>



                                <div className="form-group col-md-6">
                                    <label htmlFor="image">Workshop Image</label>
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={fileChangeHandler}
                                        className='form-control form-control-lg form-control-solid'

                                    />
                                    <p className="text-danger">{ imageError ? imageError : ''}</p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mt-5">
                                <button type="button" onClick={handleReset} className="btn btn-md btn-danger me-4">Reset</button>


                                <button
                                    type="submit"
                                    id="kt_sign_in_submit"
                                    className="btn btn-md btn-primary "
                                    disabled={ buttonLoading ? true : false}
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
                </div>
            )
            }

        </>
    )
}
