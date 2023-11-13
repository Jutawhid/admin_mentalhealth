import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { PageTitle } from '../../../_jutemplate/layout/core';
import { PackageTable } from './PackageTable';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../_jutemplate/helpers';
import packageAPI from '../../../api/package/packageAPI';
import Loading from "../../components/Loading";


export const PackageList: React.FC = () => {
    const [packageData, setPackageData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTitle,setSearchTitle] = useState<string>('');
    const [searchData, setSearchData] = useState<any>([]);

    //get all skill
    const getPackageList = async () => {
        packageAPI.getAllPackage().then(
            (res: any) => {
                setLoading(false)
                
                if (res.data.data) {
                    setPackageData(res.data.data.reverse())
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
    //skill status change
    const changeStatus = async (id:number,status:number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to ${ status==1 ? "disable" : "enable"} this package !`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
        }).then((result) => {
            if (result.isConfirmed) {
                packageAPI.changeStatus(id).then(
                    (res: any) => {
                        if (res.data.success) {
                            toast.success(res.data.message, {
                                theme: 'dark',
                            })
                            getPackageList();
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
    //delete skill
    const deletePackage = async (id: number) => {
        console.log("hello");
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this package!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                packageAPI.deletePackage(id).then(
                    (res: any) => {
                        if (res.data.success) {
                            toast.success(res.data.message, {
                                theme: 'dark',
                            })
                            getPackageList();
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

    const onChangeSearchTitle = (e: any) => {
        setSearchTitle(e.target.value)
    }

    const searchModuleData = () => {  // search Module function
        if (searchTitle.length > 0) {
            setSearchData(
                packageData.filter((value: any) =>{
                     return value.title.toLowerCase().includes(searchTitle.toLowerCase()) || value.duration.toString().includes(searchTitle) || value.price.toString().includes(searchTitle) ;
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
    }, [searchTitle,packageData])

    useEffect(() => {
        getPackageList();
    }, [])



    return (
        <>

            <PageTitle>All Package</PageTitle>

            <div className={`card shadow-sm`}>
                {/* begin::Header */}
                <div className="card-header border-0 py-5">
                    <div className="card-title align-items-start flex-column mt-5">
                        {/* <span className="card-label fw-bolder fs-3 mb-1">
                          Leave Category List
                          </span> */}
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
                                placeholder="Search Package"
                                value={searchTitle}
                                onChange={onChangeSearchTitle}
                            />
                        </div>
                        <span className="text-muted mt-2  fw-bold fs-7">
                        Total  { (searchData.length !== 0 || searchTitle.length !== 0) ? searchData.length : packageData?.length} Packages
                        </span>
                    </div>
                    <div className="card-toolbar mt-0">
                        {/* begin::Menu */}

                        <Link to="create" className="btn btn-md btn-primary Add_new_button">
                            <span className="indicator-label">
                                <KTSVG
                                    path="/media/icons/duotune/arrows/arr087.svg"
                                    className="svg-icon-3 ms-2 me-3"
                                />
                            </span>
                            Add Package
                        </Link>

                    </div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                {/* {loading ? <Loading /> : (
                    <PackageTable
                        packageData={packageData}
                        changeStatus={changeStatus}
                        deletePackage ={deletePackage }
                        
                    />
                )

                } */}

           { loading ? <Loading/> : (
                 (searchData.length !== 0 || searchTitle.length !== 0) ? <PackageTable
                                                                                    packageData={searchData}
                                                                                    changeStatus={changeStatus}
                                                                                    deletePackage ={deletePackage }

                                                                                  /> :
                                                                            <PackageTable
                                                                                    packageData={packageData}
                                                                                    changeStatus={changeStatus}
                                                                                    deletePackage ={deletePackage }
                                                                                  />  
                                  )
                }
            </div>
        </>
    );
}


