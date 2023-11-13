import React, { useState,useEffect } from 'react';
import { PageTitle } from '../../../../_jutemplate/layout/core';
import readContentAPI from '../../../../api/course/readContentAPI';
import { toast } from "react-toastify";
import Loading from '../../../components/Loading';




export const ReadContentDetails: React.FC = () => {


    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>({});
    


    const getDetails = (id: number) => {

        setLoading(true)

        readContentAPI.getReadContentDetails(id).then(
            (res: any) => {
                setLoading(false)
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

    useEffect(() => {
        let url = window.location.href;
        var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
        getDetails(id);
    },[])

   
   return (
        <>

            <PageTitle>Details Read Content</PageTitle>
            {/* card start */}
            { loading ? <Loading/> : (
            <div className="card shadow-sm py-8">
                <div className="card-body">
                    <form>

                      <div className='row'>
                            <div className="form-group col-md-6">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    readOnly
                                    defaultValue={details.title}
                                    className='form-control form-control-lg form-control-solid'
                                />

                            </div>

                            <div className="form-group col-md-6 form-m-top_upto_md">
                                <label htmlFor="readTime">Read Time</label>
                                <input
                                    type="text"
                                    id="readTime"
                                    readOnly
                                    defaultValue={details.reading_time}
                                    className='form-control form-control-lg form-control-solid'
                                />
                            </div>
                       </div>
                        <div className="form-group mt-5 ">
                                <label htmlFor="details">Details</label>
                                {/* <textarea
                                    rows={10}
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
            )}
            {/* card end */}
        </>
    )
}