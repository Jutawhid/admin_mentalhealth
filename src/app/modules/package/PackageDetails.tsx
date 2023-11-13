import React, { useEffect, useState } from "react";
import { PageTitle } from '../../../_jutemplate/layout/core';
import { Formik, useFormik } from "formik";
import packageAPI from "../../../api/package/packageAPI";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import '../../../_jutemplate/assets/css/custom.css'

const initialValues = {
  
        title : "",
        duration: "",
        price:"",
        discount_amount:"",
        discount_percentage:"",
        userUnderThisPackage: ""
   
}


export const PackageDetails: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>([]);
   


    const workshopDetails = (id: number) => {
        setLoading(true)

        packageAPI.getPackageDetail(id).then(
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
            initialValues.price=details.price;
            initialValues.duration=details.duration;
            initialValues.discount_amount=details.discount_amount;
            initialValues.discount_percentage=details.discount_percentage;
            initialValues.userUnderThisPackage=details.userUnderThisPackage;
        }

    }, [details])

    return (
        <>

            <PageTitle> Package Details </PageTitle>
            {loading ? <Loading /> : (
                <div className="card shadow-sm py-8">
                    <div className="card-body">
                        <form>
                           

                            <div className="row mt-5">
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

                                <div className="form-group col-md-6 form-m-top_upto_md">

                                    <label htmlFor="price" className=" mb-1">Price</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="price"
                                        value={formik.values.price}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>

                            </div>
                            <div className="row mt-5">

                                <div className="form-group col-md-6">

                                    <label htmlFor="duration" className=" mb-1">Duration</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="duration"
                                        value={formik.values.duration}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>

                                <div className="form-group col-md-6 form-m-top_upto_md">

                                    <label htmlFor="discountPercentage" className=" mb-1">Discount</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="discountPercentage"
                                        value={formik.values.discount_percentage+" % "}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>

                            </div>

                            <div className="row mt-5">

                                <div className="form-group col-md-6">

                                    <label htmlFor="userUnderThisPackage" className=" mb-1">User Under This Package</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="userUnderThisPackage"
                                        value={formik.values.userUnderThisPackage}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>

                                <div className="form-group col-md-6 form-m-top_upto_md">

                                    <label htmlFor="discountAmount" className=" mb-1">Discount Amount</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="discountAmount"
                                        value={formik.values.discount_amount}
                                        className='form-control form-control-lg form-control-solid'
                                    />
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
