import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { PageTitle } from '../../../../_jutemplate/layout/core'
import { ParentsTable } from './ParentsTable'
import { KTSVG } from '../../../../_jutemplate/helpers'
import parentsAPI from '../../../../api/users/parents.API'
import Loading from '../../../components/Loading'

function ParentsList() {
  const [parentsData, setparentsData] = useState<any>([])
  const [searchTitle, setSearchTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true);
  const [searchData, setSearchData] = useState<any>([])

  // get parents list
  const getParentsList = async () => {
    parentsAPI.getAllList().then(
      (res: any) => {
        setLoading(false)
        if (res.data.data) {
          // const filterDeletedData = res.data.data.filter((val: any) => {
          //   return val.status !== 0;
          // })
          
          setparentsData(res.data.data)
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
  const changeStatus = async (id: number, status: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to ${status == 1 ? " disable" : "enable"} this parent !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then((result) => {
      if (result.isConfirmed) {
        parentsAPI.changeStatus(id).then(
          (res: any) => {
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: 'dark',
              })
              getParentsList()
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

  // delete parent
  const deleteParent = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this parent !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        parentsAPI.deleteParent(id).then(
          (res: any) => {
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: 'dark',
              })
              getParentsList()
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

  useEffect(() => {
    // get parents list
    getParentsList()
  }, [])

  //search table
  const onChangeSearchTitle = (e: any) => {
    setSearchTitle(e.target.value)
  }

  const searchModuleData = () => {  // search Module function
    if (searchTitle.length > 0) {
      setSearchData(
        parentsData.filter((value: any) =>
          value.name.toLowerCase().includes(searchTitle.toLowerCase()) || value.email.toLowerCase().includes(searchTitle.toLowerCase()),
        ),
      )
    } else {
      setSearchData([])
    }
  }

  useEffect(() => {
    // search Module
    searchModuleData()
  }, [searchTitle,parentsData])

  return (
    <>
      <PageTitle>All Parents</PageTitle>
      <div className={`card shadow-sm`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column mt-5">
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
                placeholder="Search Parents"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </div>
            <span className="text-muted mt-1 fw-bold fs-7">
              Total  {(searchData.length !== 0 || searchTitle.length !== 0) ? searchData.length : parentsData?.length} Parents
            </span>
          </h3>
          <div className="card-toolbar">
            {/* begin::Menu */}
            {/* <>
              <Link to="create" className="btn btn-sm btn-primary">
                <span className="indicator-label">
                  <KTSVG
                    path="/media/icons/duotune/arrows/arr087.svg"
                    className="svg-icon-3 ms-2 me-3"
                  />
                </span>
                Add Parents
              </Link>
            </> */}
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}



        {loading ? <Loading /> : (
          (searchData.length !== 0 || searchTitle.length !== 0) ? <ParentsTable
            parentsData={searchData}
            changeParentStatus={changeStatus}
            parentDelete={deleteParent}

          /> :

            <ParentsTable
              parentsData={parentsData}
              changeParentStatus={changeStatus}
              parentDelete={deleteParent}

            />
        )
        }

      </div>
    </>
  )
}

export default ParentsList
