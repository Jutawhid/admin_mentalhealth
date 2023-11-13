import React, { useState,useEffect } from 'react';
import { PageTitle } from '../../../_jutemplate/layout/core';
import configurationAPI from '../../../api/configuration/configurationAPI';
import { toast } from "react-toastify";
import Loading from '../../components/Loading';
import { formValidation } from '../../utility/customValidation/configurationFormValidation';


export const CongfigurationListANDUpdate = ()=>{

    const [initialData,setInitialData] = useState<any>([])
    const [loading,setLoading] = useState<boolean>(true)
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [details,setDetails] = useState<any>({})
    const [error,setError] = useState<any>({})
    




    const getConfigList = () => {

        configurationAPI.getConfigData().then(
            (res: any) => {
                setLoading(false)
                
                if (res.data.data) {
                    //console.log(res.data.data.app_config_text);
                    const modifyData:{[index: string]: string } = {}

                    res.data.data.app_config_text.map((val:any)=>{
                        modifyData[val.property_name]=val.data.en
                               
                    })

                       setDetails(modifyData)

                } else {
                    toast.error(res.data.message, {
                        theme: 'dark',
                    })
                }
            },
            (err: any) => {
                setLoading(false)
                if (err?.response?.data?.success === false) {
                    toast.error(err.response.data.message, {
                        theme: 'dark',
                    })
                }
            }
        )
    }
   
    useEffect(()=>{
        getConfigList();
    },[])

    useEffect(()=>{

        if(Object.keys(details).length !== 0 ){
            let data:{ name:string, label:string, value:string }[] = [];
            for( let key in details){
                data.push({name:key, label:key, value:details[key]})
            }
             //console.log(data)
            setInitialData(data)
            }
           
        
    },[details])

    //Form Submit
    const submitForm = (e:any)=>{
        e.preventDefault()

        const err =  formValidation(details);
        //console.log(err)
        setError(err)

        if(Object.keys(err).length == 0 ){
           
                setButtonLoading(true)
                configurationAPI.updateConfig(details).then(
                    (res: any) => {
                        setButtonLoading(false)
                        if (res.data.success === true) {
                            getConfigList(); 
                            toast.success(res?.data?.message, {
                                theme: 'dark'
                            })
                        }
                        else {
                            
                            toast.error(res?.data?.message, {
                                theme: 'dark'
                            })
                        }
                    },
                    (err: any) => {
                        setButtonLoading(false);
                        toast.error(err?.response?.data?.message, {
                            theme: 'dark'
                        })
                    }
                )
        }

    }

     const handleInputChange = (e:any)=>{
        setDetails({...details,[e.target.name]:e.target.value})
     }

  

    return (
        <>  
               <PageTitle>Configuration</PageTitle>
               { loading ? <Loading/> : (
               <div className="card shadow-sm py-8">
                 <div className="card-body">
                   
                    <form onSubmit={submitForm }>
                         {  Object.keys(initialData).length !== 0 && ( initialData.map((val:any,index:number)=>
                            <div key={index} className="form-group mb-5">
                                <label htmlFor="name" className='mb-1 text-capitalize required'>{val.label.split("_").join(" ")}</label>
                                <textarea
                                    rows={4}
                                    id="name"
                                    className='form-control form-control-lg form-control-solid'
                                    name={val.name}
                                    defaultValue={val.value}
                                    onChange={handleInputChange}
                                />
                                <p className='text-danger'>{ error[val.name] ? error[val.name].split("_").join(" ") : " " }</p>
                            </div>
                            ))
                         }
                            
                        <div className="d-flex justify-content-end mt-5">

                                {/* <button type="button" onClick={handleReset} className="btn btn-md btn-danger me-4 ">Reset</button> */}
                                <button
                                    type="submit"
                                    id="kt_sign_in_submit"
                                    className="btn btn-md btn-primary "
                                    disabled={ buttonLoading ? true : false }
                                //style={{ backgroundColor: '#000000' }}
                                // disabled={formik.isSubmitting || !formik.isValid}
                                >  
                                    
                                    { buttonLoading ? (
                                        <span
                                            className="indicator-progress"
                                            style={{ display: 'block' }}
                                        >
                                            Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        
                                        </span> ) : (
                                            <span className="indicator-label">Update</span>
                                        )
                                    }
                                </button>
                             
                           </div>
                    </form>
                </div>
            </div>
           )}
        </>
    )
}