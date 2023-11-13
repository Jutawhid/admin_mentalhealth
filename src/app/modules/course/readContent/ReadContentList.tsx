import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { PageTitle } from '../../../../_jutemplate/layout/core'
import readContentAPI from '../../../../api/course/readContentAPI'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../../_jutemplate/helpers'
import { ReadContentTable } from './ReadContentTable'
import Loading  from "../../../components/Loading";


export const ReadContentList:React.FC = () => {

  const [courseContentData,setCourseContentData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [searchData, setSearchData] = useState<any>([])
  const [readContentId,setReadContentId] = useState<number>(0)

  // get module list
  const getReadContent = (id:number) => {
    
    readContentAPI.getReadContent(id).then(
      
      (res: any) => {
        setLoading(false)
        if (res.data.data) {
          console.log(res)
          setCourseContentData(res.data.data)
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
      text: `You want to ${ status==1 ? " disable" : "enable"} this read content !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it !',
    }).then((result) => {
      if (result.isConfirmed) {
        readContentAPI.changeStatus(id).then(
          (res: any) => {
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: 'dark',
              })
              getReadContent(readContentId);
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
  const readContentDelete =  (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this read content !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        readContentAPI.deleteReadContent(id).then(
          (res: any) => {
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: 'dark',
              })
              getReadContent(readContentId);
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
    setReadContentId(id)
    console.log("id"+" "+id)
    //getReadContent(id);
  },[])
  
  useEffect(()=>{
    console.log(readContentId)
     if(readContentId){
        console.log(readContentId)
        getReadContent(readContentId);
     }
  },[readContentId])

  const onChangeSearchTitle = (e: any) => {
      setSearchTitle(e.target.value)
  }

  const searchModuleData = () => {  // search Module function
        if (searchTitle.length > 0) {
          setSearchData(
            courseContentData.filter((value: any) => {
             return  ( value.title.toLowerCase().includes(searchTitle.toLowerCase()) || value.reading_time.toString().includes(searchTitle) );
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
  }, [searchTitle,courseContentData])
  
  return (
    <>
      <PageTitle>Read Course Content</PageTitle>
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
                placeholder="Search Read Content"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </div>
            <span className="text-muted mt-1 fw-bold fs-7">
              Total  { (searchData.length !== 0 || searchTitle.length !== 0) ? searchData.length : courseContentData?.length} Read Content
            </span>
          </div>
          <div className="card-toolbar mt-0">
            {/* begin::Menu */}
            <>
            <Link to={`create/${readContentId}`} className="btn btn-md btn-primary Add_new_button">
              
                <span className="indicator-label">
                  <KTSVG
                    path="/media/icons/duotune/arrows/arr087.svg"
                    className="svg-icon-3 ms-2 me-3"
                  />
                </span>
                Add Read Content
              </Link>
            </>
          </div>
        </div> 
        

        {/* end::Header */}
        {/* begin::Body */}
        { loading ? <Loading/> : (
                 (searchData.length !== 0 || searchTitle.length !== 0) ? <ReadContentTable
                                                statusChange={statusChange}
                                                readContentDelete ={ readContentDelete}
                                                courseContentData={ searchData }
                                             /> :

                                            <ReadContentTable
                                              statusChange={statusChange}
                                              readContentDelete ={ readContentDelete }
                                              courseContentData={ courseContentData }
                                             />  
                                  )
        }    
      </div>
    </>
  )
}

