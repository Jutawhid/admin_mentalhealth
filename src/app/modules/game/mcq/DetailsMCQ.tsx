import React, { useState, useEffect } from "react";
import { PageTitle } from '../../../../_jutemplate/layout/core';
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import mcqAPI from "../../../../api/game/mcq/mcqAPI";




export const DetailsMCQ = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>({});
    
    const getDetails = (id:number)=>{

        setLoading(true)
        mcqAPI.getMcqDetails(id).then(
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
            (err: any)=>{
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
    }, [])

    return (
        <>  <PageTitle>MCQ Details</PageTitle>
            { loading ? <Loading /> : (
                <div className="card shadow-sm py-8">
                    <div className="card-body">

                    { Object.keys(details).length !== 0 && (
                      <>
                        <div className="form-group mt-5">
                            <label htmlFor="question">Topic Title</label>
                            <input
                                readOnly
                                type="text"
                                id="question"
                                className='form-control form-control-lg form-control-solid'
                                value={details.topic_title}
                            />

                        </div>

                        <div className="form-group mt-5">
                            <label htmlFor="question">Question</label>
                            <textarea
                                readOnly
                                cols={3}
                                id="question"
                                value={details.question}
                                className='form-control form-control-lg form-control-solid'
                            />

                        </div>
           
                       <div>
                            <p className='m-0 mt-5'>Option</p>

                            <div className='row'>
                              { details.options.map((value:any,index:number)=>(
                                  <div className='form-group col-md-6  mt-4'>
                                        
                                        <input
                                            key={index}
                                            readOnly
                                            type="text"
                                            className='form-control form-control-lg form-control-solid'
                                            value={value}
                                         />
                                  </div>
                                
                               ))
                              }
                                
                            </div>
                            
                       </div>     

                       <div className="form-group mt-5">
                                    <label htmlFor="answer">Answer</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="answer"
                                        value={details.answer}
                                        className='form-control form-control-lg form-control-solid'
                                    />
                        </div>
                     </>    
                    )} 

                  </div>
               </div>
             )}

        </>

    )
}
