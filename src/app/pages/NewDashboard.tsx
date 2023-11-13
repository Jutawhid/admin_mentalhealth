import Recat, { useState, useEffect } from "react";
import skillAPI from "../../api/skill/skillAPI";
import workshopAPI from "../../api/workshop/workshopAPI";
import childsAPI from "../../api/users/childsAPI";
import parentsAPI from "../../api/users/parents.API";
import { toast } from "react-toastify";
import { KTSVG } from '../../_jutemplate/helpers';
import '../../_jutemplate/assets/css/custom.css'
import {PageTitle} from '../../_jutemplate/layout/core'


const deshBoardDetails = [

  { path: "/media/icons/duotune/general/gen032.svg", svgColor:'svg-icon-success', text: 'Teens', bgColor: 'bg-light-success', textColor:'text-success' },
  { path: "/media/icons/duotune/general/gen032.svg", svgColor:'svg-icon-danger',  text: 'Parents', bgColor: 'bg-light-danger', textColor:'text-danger' },
  { path: "/media/icons/duotune/general/gen032.svg", svgColor:'svg-icon-primary',  text: 'Skill', bgColor: 'bg-light-primary', textColor:'text-primary' },
  { path: "/media/icons/duotune/general/gen032.svg", svgColor:'svg-icon-warning',  text: 'Workshop', bgColor: 'bg-light-warning ', textColor:'text-warning' }

]




export const DashBoard: Recat.FC = () => {

  const [childData, setChildData] = useState<number>(0)
  const [parentsData, setParentsData] = useState<number>(0)
  const [skillData, setSkillData] = useState<number>(0)
  const [workshopData, setWorkshopData] = useState<number>(0)

  const [combineData, setCombineData] = useState<any>([])



  const getChildList = () => {

    childsAPI.getAllList().then(

      (res: any) => {

        if (res.data.data) {
          //console.log(res)
          const filterDeletedData = res.data.data.filter((val: any) => {
            return val.status !== 0;
          })
          //console.log(filterDeletedData)
          setChildData(filterDeletedData.length)
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



  const getParentsList = () => {

    parentsAPI.getAllList().then(
      (res: any) => {
        if (res.data.data) {
          //console.log(res)
          const filterDeletedData = res.data.data.filter((val: any) => {
            return val.status !== 0;
          })
          //console.log(filterDeletedData)
          setParentsData(filterDeletedData.length)

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


  const getWorkshopList = () => {

      workshopAPI.getAllList().then(
      (res: any) => {
        if (res.data.data) {
         
          const filterDeletedData = res.data.data.filter((val: any) => {
            return val.status !== 0;
          })
          //console.log(filterDeletedData)
          setWorkshopData(filterDeletedData.length)

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


  const getSkillList = () => {

    skillAPI.getAllSkill().then(
      (res: any) => {
        if (res.data.data) {
          

          const filterDeletedData = res.data.data.filter((val: any) => {
            return val.status !== 0;
          })
          //console.log(filterDeletedData)
         setSkillData(filterDeletedData.length)
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

  useEffect(() => {
      setCombineData([childData, parentsData,skillData, workshopData])
    }, [childData, parentsData,skillData, workshopData])

  
  useEffect(() => {
    getChildList()
    getSkillList()
    getWorkshopList()
    getParentsList()
  }, [])
//svgClassName ='w-50 h-25'
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      { combineData.length !== 0  &&
          <div className="row g-4">
            {
              deshBoardDetails.map((value: any, index: number) => (

                
                <div className="col-md-3 col-6" key={index}>
                    <div className="card shadow-sm">
                      <div className={`card-body deshboard-box-height ${value.bgColor} ps-8 py-8 rounded-2`}>
                        <div className="d-flex deshboard-box-header-height">
                                <KTSVG path={value.path} className={`svg-icon-3x ${value.svgColor} h-50 w-25 d-block my-2`} />
                                <h5 className='text-dark fw-bolder d-block fs-1 m-auto'><span className={`${value.textColor} fw-bolder fs-3 me-2`}>Total</span>{combineData[index]}</h5>
                        </div>
                            <p className={`${value.textColor} fw-bolder fs-1 mt-2`}>{value.text}</p>
                        </div>  
                    </div>
                    
                </div>
            



              ))
            }

          </div>
    }
    </>
  )
}