import React, { useEffect, useState } from "react";
import { PageTitle } from '../../../../_jutemplate/layout/core';
import { Formik, useFormik } from "formik";
import groupListAPI from "../../../../api/group/groupListAPI";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";


const initialValues = {
  
    title: "",
    description:"" ,
    total_member:"" ,
    groupTopicTitle:""
   
}


export const GroupDetails: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>([]);
   


    const workshopDetails = (id: number) => {
        setLoading(true)

        groupListAPI.getGroupDetails(id).then(
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
            initialValues.description=details.description;
            initialValues.groupTopicTitle=details.groupTopicTitle;
            initialValues.total_member=details.total_member;
        }

    }, [details])

    return (
        <>

            <PageTitle> Group Details </PageTitle>
            {loading ? <Loading /> : (
                <div className="card shadow-sm py-8">
                    <div className="card-body">

                        <form>
                           
                                <div className="form-group">

                                    <label htmlFor="title" className=" mb-1">Title</label>
                                    <input
                                        readOnly
                                        type="text"
                                        id="title"
                                        value={formik.values.title}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>

                                <div className="row mt-5">

                                    <div className="form-group col-md-6">

                                        <label htmlFor="groupTopicTitle" className=" mb-1">Group Topic</label>
                                        <input
                                            readOnly
                                            type="text"
                                            id="groupTopicTitle"
                                            value={formik.values.groupTopicTitle}
                                            className='form-control form-control-lg form-control-solid'
                                        />

                                    </div>

                                    <div className="form-group col-md-6 form-m-top_upto_md">

                                        <label htmlFor="totalMember" className=" mb-1">Total Member</label>
                                        <input
                                            readOnly
                                            type="text"
                                            id="discountPercentage"
                                            value={formik.values.total_member}
                                            className='form-control form-control-lg form-control-solid'
                                        />

                                    </div>

                                </div>

                                <div className="form-group mt-5">

                                    <label htmlFor="description" className=" mb-1">Description</label>
                                    <textarea
                                        readOnly
                                        rows={3}
                                        id="price"
                                        value={formik.values.description}
                                        className='form-control form-control-lg form-control-solid'
                                    />

                                </div>
                        </form>
                    </div>
                </div>
            )
            }

        </>
    )
}
