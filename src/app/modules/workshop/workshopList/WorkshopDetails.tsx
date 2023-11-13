import React, { useEffect, useState } from "react";
import { PageTitle } from '../../../../_jutemplate/layout/core';
import { Formik, useFormik } from "formik";
import workshopAPI from "../../../../api/workshop/workshopAPI";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import '../../../../_jutemplate/assets/css/custom.css'
import defaultImg from "../../blank.png";

const initialValues = {

    title: '',
    host_name: '',
    host_details: '',
    description: '',
    program_date: '',
    duration: '',
    // price: '',
    workShopTypeDetails:[],
    image:''
}


export const WorkshopDetails: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>([]);
    const [imgPath, setImgPath] = useState<string>("");


    const workshopDetails = (id: number) => {
        setLoading(true)

        workshopAPI.getDetails(id).then(
            (res: any) => {
                setImgPath(res.data.imageFolderPath)
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

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {

        }
    });

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
            initialValues.duration = details.duration;
            initialValues.host_name = details.host_name;
            initialValues.host_details = details.host_details;
            // initialValues.price = details.price;
            initialValues.program_date = details.program_date;
            initialValues.workShopTypeDetails=details.workShopTypeDetails;
            initialValues.image=details.image;
        }

    }, [details])

    return (
        <>

            <PageTitle> Workshop Details </PageTitle>
            {loading ? <Loading /> : (
                <div className="card shadow-sm py-8">
                    <div className="card-body">
                        <form>
                            <div>
                                <p className="m-0 mb-1">Workshop Image</p>
                                <div className="d-flex">
                                    <div className="workshop-details-img-box">
                                    
                                        <img
                                            src={`${imgPath}/${formik.values.image}`}
                                            onError={(e) => {
                                                ;(e.target as HTMLImageElement).onerror = null
                                                ;(e.target as HTMLImageElement).src = defaultImg as string
                                            }}
                                            className="custom-img"
                                            alt="workshop"
                                         />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-5" >
                                <div className="form-group col-md-6">

                                    <label htmlFor="title" className=" mb-1">Title</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="title"
                                        value={formik.values.title}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>

                                <div className="form-group col-md-6">

                                    <label htmlFor="host_name" className=" mb-1">Host Name</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="host_name"
                                        value={formik.values.host_name}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>

                            </div>

                            <div className="form-group mt-5">

                                <label htmlFor="host_details" className=" mb-1">Host Details</label>
                                <textarea
                                    readOnly
                                    rows={3}
                                    id="host_details"
                                    value={formik.values.host_details}
                                    className='form-control form-control-lg form-control-solid'
                                />

                            </div>

                            <div className="form-group mt-5">

                                <label htmlFor="description" className=" mb-1">Description</label>
                                {/* <textarea
                                    readOnly
                                    rows={3}
                                    id="description"
                                    value={formik.values.description}
                                    className='form-control form-control-lg form-control-solid'
                                /> */}

                                <div dangerouslySetInnerHTML={{ __html:formik.values.description }} 
                                     className='form-control form-control-lg form-control-solid' 
                                     style={{minHeight:'100px'}} />

                            </div>

                            <div className="row mt-5">

                                {/* <div className="form-group col-md-4">

                                    <label htmlFor="price" className=" mb-1">Price</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="price"
                                        value={ `${formik.values.price} $`}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div> */}

                                <div className="form-group col-md-6 form-m-top_upto_md">

                                    <label htmlFor="duration" className=" mb-1">Duration</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="duration"
                                        value={ `${formik.values.duration} Minute` }
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>

                                <div className="form-group col-md-6 form-m-top_upto_md">

                                    <label htmlFor="programDate" className=" mb-1">program Date</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="programDate"
                                        value={formik.values.program_date.split(" ")[0]}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>

                            </div>  

                            <div className="row mt-5">
                                <div className="col-md-12">

                                    <p className=" mb-1">WorkShop Topic</p>
                                      <div  className="d-flex p-1 flex-wrap align-items-center details-box-type">
                                        { formik.values.workShopTypeDetails.map((val:any,index)=>(
                                            
                                                <div key={index} className="rounded my-1 workshop-details-Box" >
                                                    
                                                    <p className="px-5 pt-3 font-weight-bold">{val.title}</p>
                                                    
                                                </div>
                                            
                                          ))
                                        }
                                        </div>
                                       
                                    
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            )
            }

        </>
    )
}
