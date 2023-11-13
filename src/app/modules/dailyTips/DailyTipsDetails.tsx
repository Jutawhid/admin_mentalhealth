import React, { useState, useEffect } from "react";
import { PageTitle } from '../../../_jutemplate/layout/core';
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import dailyTipsAPI from "../../../api/dailyTips/dailyTipsAPI";
import '../../../_jutemplate/assets/css/custom.css'
import defaultImg from "../blank.png";
import moment from 'moment';


export const DailyTipsDetails = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>({});
    const [imgPath, setImgPath] = useState<string>("");
   
    
    const workshopDetails = (id: number) => {

        setLoading(true)

        dailyTipsAPI.getDailyTipsDetails(id).then(
            (res: any) => {
                setLoading(false)
                setImgPath(res.data.imageFolderPath)
                if (res.data.success === true) {
                    console.log(res.data)
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
    useEffect(()=>{
        
    },[details])
    useEffect(() => {
        let url = window.location.href;
        var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
        workshopDetails(id);
    }, [])

    return (
        <>  <PageTitle>Daily Tips Details</PageTitle>
            {loading ? <Loading /> : (
                <div className="card shadow-sm py-8">
                    <div className="card-body">

                        {/* {Object.keys(details).length !== 0 && ( */}
                            
                                <div>
                                    <p className="m-0 mb-1">Daily Tips Image</p>
                                    <div className="d-flex">
                                        <div className="workshop-details-img-box">

                                            <img
                                                src={`${imgPath}/${details?.image}`}
                                                onError={(e) => {
                                                    ; (e.target as HTMLImageElement).onerror = null
                                                        ; (e.target as HTMLImageElement).src = defaultImg as string
                                                }}
                                                className="custom-img"
                                                alt="workshop image"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-5">
                                    <div className="form-group col-md-6">

                                        <label htmlFor="title" className=" mb-1">Title</label>
                                        <input
                                            readOnly
                                            type="text"
                                            id="title"
                                            value={details?.title}
                                            className='form-control form-control-lg form-control-solid'
                                        />

                                    </div>

                                    <div className="form-group col-md-6 form-m-top_upto_md">

                                        <label htmlFor="published_date" className=" mb-1">Published Date</label>
                                        <input
                                            readOnly
                                            type="text"
                                            id="published_date"
                                            value={moment(details.published_date).format('yyyy-MM-DD')}
                                            className='form-control form-control-lg form-control-solid'
                                        />

                                    </div>

                                </div>



                                <div className="form-group mt-5">

                                    <label htmlFor="details" className=" mb-1">Details</label>
                                    <textarea
                                        readOnly
                                        rows={3}
                                        id="description"
                                        value={details?.details}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>



                                <div className="row mt-5">
                                    <div className="col-md-12">

                                        <p className=" mb-1">Roles</p>
                                        <div className="d-flex align-items-center details-box-type">
                                            {details?.roleDetails?.map((val: any, index: number) => (

                                                <div key={index} className=" rounded workshop-details-Box" >

                                                    <p className="px-5 pt-3 font-weight-bold">{val.title}</p>

                                                </div>

                                            ))
                                            }
                                        </div>


                                    </div>

                                </div>
                            
                        {/* )} */}

                    </div>
                </div>
             )}

        </>

    )
}
