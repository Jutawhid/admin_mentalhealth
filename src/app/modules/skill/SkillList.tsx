import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { PageTitle } from '../../../_jutemplate/layout/core';
import { SkillTable } from './SkillTable';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../_jutemplate/helpers';
import skillAPI from '../../../api/skill/skillAPI';
import Loading from "../../components/Loading";


const SkillList: React.FC = () => {

    const [skillData, setSkillData] = useState<any>([])
    const [imgPath, setImgPath] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTitle, setSearchTitle] = useState<string>('')
    const [searchData, setSearchData] = useState<any>([])

    //get all skill
    const getSkillList = async () => {
        skillAPI.getAllSkill().then(
            (res: any) => {
                setLoading(false)
                setImgPath(res.data.imageFolderPath)
                if (res.data.data) {
                    setSkillData(res.data.data.reverse())
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
    const changeStatus = async (id: number,status:number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to ${ status==1 ? " disable" : "enable"} this skill !`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
        }).then((result) => {
            if (result.isConfirmed) {
                skillAPI.changeStatus(id).then(
                    (res: any) => {
                        if (res.data.success) {
                            toast.success(res.data.message, {
                                theme: 'dark',
                            })
                            getSkillList();
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
    const deleteSkill = async (id: number) => {
        console.log("hello");
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this skill !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                skillAPI.deleteSkill(id).then(
                    (res: any) => {
                        if (res.data.success) {
                            toast.success(res.data.message, {
                                theme: 'dark',
                            })
                            getSkillList();
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
                skillData.filter((value: any) =>
                    value.title.toLowerCase().includes(searchTitle.toLowerCase()),
                ),
            )
        } else {
            setSearchData([])
        }
    }

    useEffect(() => {
        // search Module
        searchModuleData()
    }, [searchTitle,skillData])

    useEffect(() => {
        getSkillList();
    }, [])



    return (
        <>

            <PageTitle>All Skill Sets</PageTitle>

            <div className={`card shadow-sm`}>
                {/* begin::Header */}
                <div className="card-header border-0 py-5">
                    <div className="card-title align-items-start flex-column mt-5">
                        { /* <span className="card-label fw-bolder fs-3 mb-1">
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
                                placeholder="Search Skill"
                                value={searchTitle}
                                onChange={onChangeSearchTitle}
                            />
                        </div>
                        <span className="text-muted mt-2  fw-bold fs-7">
                        Total  { (searchData.length !== 0 || searchTitle.length !== 0) ? searchData.length : skillData?.length} Skills
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
                            Add Skill
                        </Link>

                    </div>
                </div>

                {/* end::Header */}
                {/* begin::Body */}
               

                { loading ? <Loading/> : (
                 (searchData.length !== 0 || searchTitle.length !== 0) ?  <SkillTable
                                                changeStatus={changeStatus}
                                                skillDelete ={deleteSkill}
                                                skillData={ searchData }
                                                imgPath={imgPath}

                                           /> :
                                            <SkillTable
                                                changeStatus={changeStatus}
                                                skillDelete ={deleteSkill}
                                                skillData={ skillData }
                                                imgPath={imgPath}

                                             />  
                                  )
                } 
            </div>
        </>
    );
}

export default SkillList;
