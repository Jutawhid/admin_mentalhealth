import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { PageTitle } from '../../../../_jutemplate/layout/core'
import expertAPI from '../../../../api/expert/expertAPI'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../../_jutemplate/helpers'
import { ExpertTable } from './ExpertTable'
import Loading from "../../../components/Loading";

export const ExpertList: React.FC = () => {

    const [expertData, setExpertData] = useState<any>([])
    const [imgPath, setImgPath] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTitle, setSearchTitle] = useState<string>('');
    const [searchData, setSearchData] = useState<any>([])

    // get module list
    const getAllList = async () => {

        expertAPI.getAllExpertList().then(

            (res: any) => {
                setLoading(false)
                setImgPath(res.data.imageFolderPath)
                if (res.data.data) {
                    //console.log(res)
                    setExpertData(res.data.data.reverse())
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
            },
        )
    }

    // change status
    const statusChange = (id: number,status:number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to ${ status===1 ? "disable" : "enable"} this expert !`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it !',
        }).then((result) => {
            if (result.isConfirmed) {
                expertAPI.changeStatus(id).then(
                    (res: any) => {
                        if (res.data.success) {
                            toast.success(res.data.message, {
                                theme: 'dark',
                            })
                            getAllList()
                        } else {
                            toast.error(res.data.message, {
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
        })
    }

    // delete module
    const expertDelete = async (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this expert !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                expertAPI.deleteExpert(id).then(
                    (res: any) => {
                        if (res.data.success) {
                            toast.success(res.data.message, {
                                theme: 'dark',
                            })
                            getAllList()
                        } else {
                            toast.error(res.data.message, {
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
        })
    }
    // init
    useEffect(() => {
        // get Module list
        getAllList()
    }, [])


    const onChangeSearchTitle = (e: any) => {
        setSearchTitle(e.target.value)
    }

    const searchModuleData = () => {  // search Module function
        if (searchTitle.length > 0) {
            setSearchData(
                expertData.filter((value: any) => {
                  return ( value.name.toLowerCase().includes(searchTitle.toLowerCase()) || value.address.toLowerCase().includes(searchTitle.toLowerCase()) || value.insurance.toLowerCase().includes(searchTitle.toLowerCase())  || value.hourly_rate.toString().includes(searchTitle) || value.rating.toString().includes(searchTitle) );
                }
                ),
            )
        } else {
            setSearchData([])
        }
    }

    useEffect(() => {
        // search Module
        searchModuleData()
    }, [searchTitle,expertData])

    return (
        <>
            <PageTitle>All Experts</PageTitle>
            <div className={`card shadow-sm`}>
                {/* begin::Header */}
                <div className="card-header border-0 py-5">
                    <div className="card-title align-items-start flex-column mt-5">
                        <div className="d-flex align-items-center position-relative my-1">
                            <span className="svg-icon svg-icon-1 position-absolute ms-6">
                                <KTSVG
                                    path="/media/icons/duotune/general/gen021.svg"
                                    className="svg-icon-1"
                                />
                            </span>
                            <input
                                type="text"
                                data-kt-user-table-filter="search"
                                className="form-control form-control-solid w-250px ps-14"
                                placeholder="Search Expert"
                                value={searchTitle}
                                onChange={onChangeSearchTitle}
                            />
                        </div>
                        <span className="text-muted mt-1 fw-bold fs-7">
                            Total  {(searchData.length !== 0 || searchTitle.length !== 0) ? searchData.length : expertData?.length} Experts
                        </span>
                    </div>
                    <div className="card-toolbar mt-0">
                        {/* begin::Menu */}
                        <>
                            <Link to="create" className="btn btn-md btn-primary Add_new_button">
                                <span className="indicator-label">
                                    <KTSVG
                                        path="/media/icons/duotune/arrows/arr087.svg"
                                        className="svg-icon-3 ms-2 me-3"
                                    />
                                </span>
                                Add  Expert 
                            </Link>
                        </>
                    </div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                { loading ? <Loading /> : (
                    (searchData.length !== 0 || searchTitle.length !== 0) ? <ExpertTable
                                                                                    statusChange={statusChange}
                                                                                    expertDelete={expertDelete}
                                                                                    expertData={searchData}
                                                                                    imgPath={imgPath}

                                                                                /> :
                                                                                    <ExpertTable
                                                                                        statusChange={statusChange}
                                                                                        expertDelete={expertDelete}
                                                                                        expertData={expertData}
                                                                                        imgPath={imgPath}


                                                                                    />
                                            )
                }
            </div>
        </>
    )
}

