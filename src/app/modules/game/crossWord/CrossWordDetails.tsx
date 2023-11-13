import React, { useState, useEffect } from "react";
import { PageTitle } from '../../../../_jutemplate/layout/core';
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import crossWordAPI from "../../../../api/game/crossWord/crossWordAPI";




export const DetailsCrossWord = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>({});
    const [activeGameTopic,setActiveGameTopic] = useState<any>([]);
    const [topicTitle,setTopicTitle] = useState<string>("")

    const getDetails = (id:number)=>{

        setLoading(true)
        crossWordAPI.crossWordDetails(id).then(
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
    
    const getActiveGameTopic = ()=>{

        crossWordAPI.getActiveGameTopic().then(

            (res: any) => {

                if (res.data.data) {
                    //console.log(res.data.data)
                    const data = res.data.data;
                    const topicDetails = data.map((val: any) => {
                        return {
                                value: val.id,
                                label: val.title,
                               }
                        })

                    setActiveGameTopic(topicDetails);
                        

                } else {
                    toast.error(res.data.message,{
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

    useEffect(()=>{
        getActiveGameTopic()
    },[])


    
    useEffect(() => {
        let url = window.location.href;
        var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
        getDetails(id);
    },[])

    
    
    useEffect(()=>{
        
        if( Object.keys(details).length !==0 && activeGameTopic.length !== 0 ){
             const topic = activeGameTopic.find((val:any)=> val.value === details.topic_id)
             setTopicTitle(topic.label);
         }
    },[details,activeGameTopic])

    return (
        <>  
        <PageTitle>Cross Word Details</PageTitle>
            { loading ? <Loading /> : (
                <div className="card shadow-sm py-8">
                    <div className="card-body">

                    { Object.keys(details).length !== 0 && activeGameTopic.length !==0 && (
                      <>
                        <div className="form-group mt-5">
                            <label htmlFor="TopicTitle">Topic Title</label>
                            <input
                                readOnly
                                type="text"
                                id="TopicTitle"
                                className='form-control form-control-lg form-control-solid'
                                value={topicTitle}
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
