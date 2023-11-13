import React, { useState,useEffect } from 'react';
import { PageTitle } from '../../../_jutemplate/layout/core';
import courseAPI from '../../../api/course/courseAPI';
import { toast } from "react-toastify";
import Loading from '../../components/Loading';
import defaultImg from "../blank.png";
import '../../../_jutemplate/assets/css/custom.css'

export const CourseDetails: React.FC = () => {

    
    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>({});
    const [imgPath, setImgPath] = useState<string>('');
    
    
    const getDetails = (id: number) => {
        
        setLoading(true)

        courseAPI.getCourseDetails(id).then(
            (res: any) => {
                setLoading(false)    
                if (res.data.success === true) {
                    setImgPath(res.data.imageFolderPath)
                    setDetails(res.data.data)
                    console.log(res.data.data);
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

    


    return (
        <>

            <PageTitle>Course Details</PageTitle>
            {/* card start */}
            
            {loading ? <Loading /> : (
                <div className="card shadow-sm py-8">
                    <div className="card-body">
                        <form>
                            <div>
                                <p className="m-0 mb-1">Course Image</p>
                                <div className="d-flex">
                                    <div className="workshop-details-img-box">
                                    
                                        <img
                                            src={`${imgPath}/${details.image}`}
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

                            <div className="row mt-5">
                                <div className="form-group col-md-6">

                                    <label htmlFor="title" className=" mb-1">Title</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="title"
                                        defaultValue={details.title}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>

                                <div className="col-md-6 form-m-top_upto_md">

                                    <p className=" mb-1">Role Type</p>
                                    <div  className="d-flex align-items-center details-box-type">
                                        { details.roleDetails?.map((val:any,index:number)=>(
                                            
                                                <div key={index} className=" rounded workshop-details-Box" >
                                                    
                                                    <p className="px-5 pt-3 font-weight-bold">{val.title}</p>
                                                    
                                                </div>
                                            
                                          ))
                                        }
                                        </div>
                               </div>

                            </div>

                            <div className="form-group mt-5 ">
                                <label htmlFor="details">Details</label>
                                {/* <textarea
                                    rows={5}
                                    id="details"
                                    readOnly
                                    defaultValue={details.details}
                                    className='form-control form-control-lg form-control-solid'
                                /> */}
                                <div dangerouslySetInnerHTML={{ __html:details.details }} 
                                     className='form-control form-control-lg form-control-solid' 
                                     style={{minHeight:'100px'}} />
                            </div>

                           

                        </form>
                    </div>
                </div>
            )
            }
            {/* card end */}
        </>
    )
}