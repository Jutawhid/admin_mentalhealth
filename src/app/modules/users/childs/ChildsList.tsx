import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { PageTitle } from '../../../../_jutemplate/layout/core';
import { ChildsTable } from './ChildsTable';
import { KTSVG } from '../../../../_jutemplate/helpers';
import ChildAPI from '../../../../api/users/childsAPI'
import Loading from "../../../components/Loading";

export default function AllChilds() {
  const [childsData, setChildsData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTitle, setSearchTitle] = useState<string>('')
  const [searchData, setSearchData] = useState<any>([])

  //get all child
  const getChildList = async () => {
    ChildAPI.getAllList().then(
      (res: any) => {
        setLoading(false)
        if (res.data.data) {
            // const filterDeletedData = res.data.data.filter((val:any)=>{
            //    return val.status !== 0;
            // })
            //console.log(filterDeletedData)
            setChildsData(res.data.data)
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
  //child status change
  const changeStatus = async (id: number, status:number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to ${ status==1 ? " disable" : "enable"} this child !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then((result) => {
      if (result.isConfirmed) {
        ChildAPI.changeStatus(id).then(
          (res: any) => {
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: 'dark',
              })
              getChildList();
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
  //delete Child
  const deleteChild = async (id: number) => {
    console.log("hello");
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this child !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        ChildAPI.deleteChild(id).then(
          (res: any) => {
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: 'dark',
              })
              getChildList();
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

  //search child 

  const onChangeSearchTitle = (e: any) => {
    setSearchTitle(e.target.value)
  }

  const searchModuleData = () => {  // search Module function
    if (searchTitle.length > 0) {
      setSearchData(
        childsData.filter((value: any) =>
          value.name.toLowerCase().includes(searchTitle.toLowerCase()) || value.email.toLowerCase().includes(searchTitle.toLowerCase()) ,
        ),
      )
    } else {
      setSearchData([])
    }
  }

  useEffect(() => {
    // search Module
    searchModuleData()
  },[searchTitle,childsData])


  useEffect(() => {
    getChildList();
  },[])



  return (
    <>
      <PageTitle>All Teen</PageTitle>
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
                placeholder="Search Teen"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </div>
            <span className="text-muted mt-2  fw-bold fs-7">
              Total  {(searchData.length !== 0 || searchTitle.length !== 0) ? searchData.length : childsData?.length} Teens
            </span>
          </div>

        </div>
        {/* end::Header */}
        {/* begin::Body */}


        {loading ? <Loading /> : (
          (searchData.length !== 0 || searchTitle.length !== 0) ? <ChildsTable
                                                                      changeStatus={changeStatus}
                                                                      childsData={searchData}
                                                                      childDelete={deleteChild}

                                                                    /> :

                                                                    <ChildsTable
                                                                        changeStatus={changeStatus}
                                                                        childsData={childsData}
                                                                        childDelete={deleteChild}

                                                                      />
                                 )
        }
      </div>
    </>
  );
}
