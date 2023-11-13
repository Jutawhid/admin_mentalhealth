import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { PageTitle } from '../../../../_jutemplate/layout/core'
import WorkshopAPI from '../../../../api/workshop/workshopAPI'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../../_jutemplate/helpers'
import { WorkshopParticipantTable } from './WorkshopParticipantTable'
import Loading from "../../../components/Loading";

export const WorkshopParticipantList: React.FC = () => {

  const [participantData, setParticipantData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [searchData, setSearchData] = useState<any>([])

  // get module list
  const getAllList = async (id: number) => {

    WorkshopAPI.getAllParticipantList(id).then(

      (res: any) => {
        setLoading(false)
        if (res.data.data) {
          console.log(res)
          setParticipantData(res.data.data.reverse())
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






  useEffect(() => {
    // get Module list
    let url = window.location.href;
    var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
    getAllList(id)

  }, [])


  const onChangeSearchTitle = (e: any) => {
    setSearchTitle(e.target.value)
  }

  const searchModuleData = () => {  // search Module function
    if (searchTitle.length > 0) {
      setSearchData(
        participantData.filter((value: any) =>
          value.name.toLowerCase().includes(searchTitle.toLowerCase()),
        ),
      )
    } else {
      setSearchData([])
    }
  }

  useEffect(() => {
    // search Module
    searchModuleData()
  }, [searchTitle])

  return (
    <>
      <PageTitle> WorkShop Participation List</PageTitle>
      <div className={`card shadow-sm`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <div className="card-title align-items-start flex-column">
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
                placeholder="Search by Name"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </div>
            <span className="text-muted mt-1 fw-bold fs-7">
              Total  {searchData.length !== 0 ? searchData.length : participantData?.length} Participations
            </span>
          </div>

        </div>
        {/* end::Header */}
        {/* begin::Body */}
        {loading ? <Loading /> : (
          (searchData.length !== 0 || searchTitle.length !== 0) ? <WorkshopParticipantTable
            participantData={searchData}

          /> :
            <WorkshopParticipantTable
              participantData={participantData}
            />
        )
        }
      </div>

    </>
  )
}

