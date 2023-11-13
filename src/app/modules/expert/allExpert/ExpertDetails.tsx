import React, { useEffect, useState } from "react";
import { PageTitle } from '../../../../_jutemplate/layout/core';
import { Formik, useFormik } from "formik";
import expertAPI from "../../../../api/expert/expertAPI";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import '../../../../_jutemplate/assets/css/custom.css'
import defaultImg from "../../blank.png";

const initialValues = {

        name:"",
        image:"",
        rating:"",
        hourly_rate:"",
        address:"",
        insurance:"",
        expertTypeDetails:[]
}


export const ExpertDetails: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>([]);
    const [imgPath, setImgPath] = useState<string>("");


    const workshopDetails = (id: number) => {
        setLoading(true)

        expertAPI.getDetails(id).then(
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
            initialValues.name=details.name;
            initialValues.address=details.address;
            initialValues.insurance=details.insurance;
            initialValues.expertTypeDetails=details.expertTypeDetails;
            initialValues.hourly_rate=details.hourly_rate;
            initialValues.rating=details.rating;
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
                                <p className="m-0 mb-1">Expert Image</p>
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

                            
                            <div className="form-group mt-5">

                                <label htmlFor="name" className=" mb-1">Name</label>
                                <input
                                    readOnly
                                    type="text"
                                    id="name"
                                    value={formik.values.name}
                                    className='form-control form-control-lg form-control-solid'
                                />

                            </div>

                            <div className="row mt-5">

                                <div className="form-group col-md-6">

                                    <label htmlFor="rating" className=" mb-1">Rating</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="rating"
                                        value={formik.values.rating}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>


                                {/* <div className="form-group col-md-4 form-m-top_upto_md ">

                                        <label htmlFor="hourly_rate" className=" mb-1">Hourly Rate</label>
                                        <input
                                            readOnly
                                            type="text"
                                            id="hourly_rate"
                                            value={formik.values.hourly_rate}
                                            className='form-control form-control-lg form-control-solid'
                                        />

                                </div> */}

                                <div className="form-group col-md-6 form-m-top_upto_md ">

                                        <label htmlFor="insurance" className=" mb-1">Insurancen</label>
                                        <input
                                            readOnly
                                            type="text"
                                            id="insurance"
                                            value={formik.values.insurance}
                                            className='form-control form-control-lg form-control-solid'
                                        />

                                </div>

                            </div>

                            <div className="form-group mt-5">

                                <label htmlFor="address" className=" mb-1">Description</label>
                                {/* <textarea
                                    readOnly
                                    rows={3}
                                    id="address"
                                    value={formik.values.address}
                                    className='form-control form-control-lg form-control-solid'
                                /> */}
                                 <div dangerouslySetInnerHTML={{ __html:formik.values.address}} 
                                     className='form-control form-control-lg form-control-solid' 
                                     style={{minHeight:'100px'}} />

                            </div>

                            <div className="row mt-5">
                                <div className="col-md-12">

                                    <p className=" mb-1">Expert Type</p>
                                      <div  className="d-flex p-1 flex-wrap align-items-center details-box-type">
                                        { formik.values.expertTypeDetails.map((val:any,index)=>(
                                            
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
