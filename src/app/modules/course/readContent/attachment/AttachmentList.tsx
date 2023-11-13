import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { PageTitle } from '../../../../../_jutemplate/layout/core'

import { Link } from 'react-router-dom'
import { KTSVG } from '../../../../../_jutemplate/helpers'
import { AttachmentTable } from './AttachmentTable'
import Loading  from "../../../../components/Loading";
// api
import courseAttachmentAPI from '../../../../../api/course/courseAttachmentAPI'

export const AttachmentList:React.FC = () => {

  const [courseReadAttachmentData,setCourseReadAttachmentData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [searchData, setSearchData] = useState<any>([])
  // const [readContentId,setReadContentId] = useState<number>(0)
  const [courseAttachmentId,setCourseAttachmentId] = useState<number>(0)

  // get module list
  const getAttachment = (id:number) => {
    
    courseAttachmentAPI.getCourseAttachment(id).then(
      
      (res: any) => {
        setLoading(false)
        if (res.data.data) {
          console.log(res.data.data)
          setCourseReadAttachmentData(res.data.data)
        } else{
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
      text: `You want to ${ status==1 ? " disable" : "enable"} this Attachment !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it !',
    }).then((result) => {
      if (result.isConfirmed) {
        courseAttachmentAPI.changeStatus(id).then(
          (res: any) => {
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: 'dark',
              })
              getAttachment(courseAttachmentId);
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
  const courseReadAttachmentDelete =  (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this Attachmentt !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        courseAttachmentAPI.deleteCourseReadAttachment(id).then(
          (res: any) => {
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: 'dark',
              })
              getAttachment(courseAttachmentId);
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
    let url = window.location.href;
    var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
    setCourseAttachmentId(id)
    // console.log("id"+" "+id)
    //getReadContent(id);
  },[])
  
  useEffect(()=>{
    //console.log(readContentId)
     if(courseAttachmentId){
        console.log(courseAttachmentId)
        getAttachment(courseAttachmentId);
     }
  },[courseAttachmentId])

  const onChangeSearchTitle = (e: any) => {
      setSearchTitle(e.target.value)
  }

  const searchModuleData = () => {  // search Module function
        if (searchTitle.length > 0) {
          setSearchData(
            courseReadAttachmentData.filter((value: any) => {
             return  ( value.file_name.toLowerCase().includes(searchTitle.toLowerCase()) || value.url.toString().includes(searchTitle) );
            }
            ),
          )
        } else{
           setSearchData([])
        }
    }

  useEffect(() => {
    // search Module
    searchModuleData()
  }, [searchTitle,courseReadAttachmentData])
  
  return (
    <>
      <PageTitle>Attachment List</PageTitle>
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
                placeholder="Search Course Attachment"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </div>
            <span className="text-muted mt-1 fw-bold fs-7">
              Total  { (searchData.length !== 0 || searchTitle.length !== 0) ? searchData.length : courseReadAttachmentData?.length} Course Attachment
            </span>
          </div>
          <div className="card-toolbar mt-0">
            {/* begin::Menu */}
            <>
            <Link to={`rearrange/${courseAttachmentId}`} className="btn btn-md btn-primary Add_new_button me-2">
              
                <span className="indicator-label">
                  <KTSVG
                    path="/media/icons/duotune/arrows/rearrange.svg"
                    className="svg-icon-3 ms-2 me-3"
                  />
                </span>
                Rearrange
              </Link>
              <Link to={`create/${courseAttachmentId}`} className="btn btn-md btn-primary Add_new_button">
              
              <span className="indicator-label">
                <KTSVG
                  path="/media/icons/duotune/arrows/arr087.svg"
                  className="svg-icon-3 ms-2 me-3"
                />
              </span>
              Add Attachment
            </Link>
            </>
          </div>
        </div> 
        

        {/* end::Header */}
        {/* begin::Body */}
        { loading ? <Loading/> : (
                 (searchData.length !== 0 || searchTitle.length !== 0) ? <AttachmentTable
                                                statusChange={statusChange}
                                                courseReadAttachmentDelete = { courseReadAttachmentDelete}
                                                courseReadAttachmentData={ searchData }
                                                courseAttachmentId = {courseAttachmentId}
                                             /> :

                                            <AttachmentTable
                                              statusChange={statusChange}
                                              courseReadAttachmentDelete = { courseReadAttachmentDelete }
                                              courseReadAttachmentData={ courseReadAttachmentData }
                                              courseAttachmentId = {courseAttachmentId}
                                             />  
                                  )
        }    
      </div>
    </>
  )
}