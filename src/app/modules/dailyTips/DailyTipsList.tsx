import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { PageTitle } from '../../../_jutemplate/layout/core'
import dailyTipsAPI from '../../../api/dailyTips/dailyTipsAPI'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../_jutemplate/helpers'
import { DailyTipsTable } from './DailyTipsTable'
import Loading  from "../../components/Loading";


export const DailyTipsList:React.FC = () => {

  const [dailyTipsData,setDailyTipsData] = useState<any>([]);
  const [imgPath, setImgPath] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [searchData, setSearchData] = useState<any>([])

  // get module list
  const getAllList = () => {
    
    dailyTipsAPI.getDailyTipsAllData().then(
      
      (res: any) => {
        setLoading(false)
        setImgPath(res.data.imageFolderPath)
        if (res.data.data) {
          console.log(res.data.data)
          const filterDeletedData = res.data.data.filter((val:any)=>{
            return val.status !== 0;
          })
          setDailyTipsData(filterDeletedData.reverse())
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
      text: `You want to ${ status==1 ? " disable" : "enable"} this daily tips !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it !',
    }).then((result) => {
      if (result.isConfirmed) {
        dailyTipsAPI.changeStatus(id).then(
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
  const dailyTipsDelete =  (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this daily tips!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dailyTipsAPI.deleteDailyTips(id).then(
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
            dailyTipsData.filter((value: any) => {
              console.log(value.published_date.split("T")[0]);
             return (  value.title.toLowerCase().includes(searchTitle.toLowerCase()) || value.published_date.includes(searchTitle) );
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
  }, [searchTitle,dailyTipsData])

  return (
    <>
      <PageTitle>All Daily Tips</PageTitle>
      <div className={`card shadow-sm`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <div className="card-title align-items-start flex-column mt-1">
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
                placeholder="Search Daily Tips"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </div>
            <span className="text-muted mt-1 fw-bold fs-7">
              Total  { (searchData.length !== 0 || searchTitle.length !== 0) ? searchData.length : dailyTipsData?.length} Daily Tips
            </span>
          </div>
          <div className="card-toolbar">
            {/* begin::Menu */}
            <>
              <Link to="create" className="btn btn-md btn-primary Add_new_button ">
                <span className="indicator-label">
                  <KTSVG
                    path="/media/icons/duotune/arrows/arr087.svg"
                    className="svg-icon-3 ms-2 me-3"
                  />
                </span>
                Add Daily Tips
              </Link>
            </>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        { loading ? <Loading/> : (
                 (searchData.length !== 0 || searchTitle.length !== 0) ?  <DailyTipsTable
                                                statusChange={statusChange}
                                                dailyTipsDelete ={dailyTipsDelete}
                                                dailyTipsData={ searchData }
                                                imgPath={imgPath}

                                           /> :
                                            <DailyTipsTable
                                              statusChange={statusChange}
                                              dailyTipsDelete ={dailyTipsDelete}
                                              dailyTipsData={ dailyTipsData }
                                              imgPath={imgPath}

                                             />  
                                  )
        }    
      </div>
    </>
  )
}

