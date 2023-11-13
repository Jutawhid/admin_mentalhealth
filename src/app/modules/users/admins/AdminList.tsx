import { Link } from 'react-router-dom'
import { KTSVG } from '../../../../_jutemplate/helpers'
import '../../../../_jutemplate/assets/css/custom.css'
import AdminAPI from '../../../../api/users/allAdminAPI'
import { useEffect, useState } from 'react'
import { $CombinedState } from 'redux'
import defaultImg from '../blank.svg'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { PageTitle } from '../../../../_jutemplate/layout/core';
import Loading from '../../../components/Loading'
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../../../setup/redux/RootReducer'

export const AdminList: React.FC = () => {
  const [adminList, setAdminList] = useState<any[]>([])
  const [imgPath, setImgPath] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [role, setRole] = useState<number>(0)


  const changeStatusAction = ( userId: number,status:number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to ${ status==1 ? " disable" : "enable"} this Admin !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then((result) => {
      //console.log("result");
      if (result.isConfirmed) {
        AdminAPI.changeStatus(userId).then(
          (res: any) => {
            console.log(res)
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: 'dark',
              })
              getAllAdmin()
            } else {
              toast.error(res.data.message, {
                theme: 'dark',
              })
            }
          },
          (err: any) => {
            console.log('err')
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

  const getAllAdmin = () => {

    AdminAPI.getAllList().then(
      (res: any) => {
        if (res.data.success) {
          setLoading(false)
          setAdminList(res.data.data.reverse())
          setImgPath(res.data.imageFolderPath)
          //console.log(res.data.data);
        } else {
          toast.error(res.data.message, {
            theme: 'dark',
          })
          //console.log(res?.data?.message);
        }
      },
      (err: any) => {
        if (err.response.data.success === false) {
          // error alart
          setLoading(false)
          toast.error(err.response.data.message, {
            theme: 'dark',
          })
        }
      },
    )
  }

  const userData: any = useSelector<RootState>(
    ({ auth }) => auth?.user,
    shallowEqual,

  )
  

  useEffect(() => {
    if (userData) {
      
      setRole(userData?.data?.role?.role_id)
    }
  }, [userData])

  const reserPasswordHandler = (userId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to change Password !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it !',
    }).then((result) => {
      
      if (result.isConfirmed) {
        AdminAPI.changePassword(userId).then(
          (res: any) => {
            console.log(res)
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: 'dark',
              })
              getAllAdmin()
            } else {
              toast.error(res.data.message, {
                theme: 'dark',
              })
            }
          },
          (err: any) => {
            console.log('err')
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
    getAllAdmin()
  }, [])



  return (
    <>

      <PageTitle>All Admin</PageTitle>

      <div className="container-fluid">
        { role === 1 && (
          <div className="row mb-4 justify-content-end">
            <div className="w-auto">
              <Link to="create" className="btn btn-primary btn-md">
                <span className="indicator-label">
                  <KTSVG
                    path="/media/icons/duotune/arrows/arr087.svg"
                    className="svg-icon-3 ms-2 me-3 fw-bold"
                  />
                </span>
                Add Admin
              </Link>
            </div>
          </div>
        )}
        {loading ? (
          <Loading />
        ) : (
          <div className="row g-4 justify-content-center">
            { adminList?.map((val: any, index: number) => (

              <div className="col-11 col-sm-3" key={index}>

                <div className=" card shadow-sm">
                  <div className="custom-card-image-box d-flex justify-content-center align-items-center">
                    <img
                      src={`${imgPath}/${val.image}`}
                      onError={(e) => {
                        ; (e.target as HTMLImageElement).onerror = null
                          ; (e.target as HTMLImageElement).src = defaultImg as string
                      }}
                      className="admin-card-img"
                      alt="..."
                    />
                  </div>
                  <div className="card-body text-center custom-card-content-box pt-0">
                    <h5 className="pb-3">{val.name}</h5>
                    <p>{val.email}</p>
                    {/* <p>Phone : {val.phone ? val.phone : 'N/A'}</p> */}
                  </div>
                  <div className=" card-footer d-flex justify-content-center border-top-0 ">


                    <button
                      type="button"
                      onClick={() => changeStatusAction(val.user_id,val.status)}
                      className="btn btn-icon btn-bg-light btn-sm me-1 svg-icon-2x"
                    >
                      {val.status === 1 ? (
                        <i className="fa fa-toggle-on btn-active text-primary">
                          {' '}
                        </i>
                      ) : (
                        <i className="fa fa-toggle-off"> </i>
                      )}
                    </button>

                    {(val.status !== 2 && role === 1) && (
                      <button
                        onClick={() => reserPasswordHandler(val.user_id)}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <i className="fa fa-key btn-active"> </i>
                      </button>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
