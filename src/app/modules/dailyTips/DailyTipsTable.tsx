import React from 'react';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../_jutemplate/helpers';
import DataTable from '../../../_jutemplate/dataTable/DataTable';
import defaultImg from "../blank.png";
import moment from 'moment';

interface TableProps {
  dailyTipsData: any[]
  statusChange : (id: number,status:number) => void
  dailyTipsDelete: (id: number) => void
  imgPath: string
}
export const DailyTipsTable: React.FC<TableProps> = ({
  dailyTipsData,
  statusChange,
  dailyTipsDelete,
  imgPath
}) => {
  //const store = useSelector((state: any) => state)
  //const { user } = store.auth as any

  // React.useEffect(() => {
  //     // set data
  //   }, [user])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Image',
        disableSortBy: false,
        Cell: (values: any) => {

            return (
                <div className="symbol symbol-50px">
                    <img
                        src={`${imgPath}/${values.row.original.image}`}
                        alt=""
                        onError={(e) => {
                            ; (e.target as HTMLImageElement).onerror = null
                                ; (e.target as HTMLImageElement).src = defaultImg as string
                        }}
                    />
                </div>
            )
        },
      },
      {
        Header: 'Title',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.title ? values.row.original.title : "--"
      },

      {
        Header: 'Roles',
        disableSortBy: false,
        Cell:  (values: any) => values.row.original.roleDetails ? values.row.original.roleDetails.map((val: any, index: number) => {
          return <span key={index} className='badge badge-light-primary fs-7 me-1 mt-1'>{val.title}</span>
          }) : "--"
      },
      {
        Header: 'Published_Date',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.published_date? moment(values.row.original.published_date).format('yyyy-MM-DD') : "--"
      },
      
      {
        Header: 'Status',
        disableSortBy: false,
        Cell: (values: any) => {
          //console.log(values);
          return (
            <div>
              {values.row.original.status === 1 ? (
                <span className="badge badge-light-success">Active</span>
              ) : values.row.original.status === 2 ? (
                <span className="badge badge-light-danger">Disabled</span>
              ) : (
                <span className="badge badge-light-info">Deleted</span>
              )}
            </div>
          );
        },
      },
      {
        Header: 'Action',
        accessor: 'actions',
        Cell: (values: any) => {

          return (
            <div>
              <>
                {values.row.original.status !== 0 && (

                  <>
                    
                    {/* module Change Button start  */}
                    <button
                      onClick={() =>
                        statusChange(values.row.original.id,values.row.original.status)
                      }
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 svg-icon-2x"
                    >
                      {values.row.original.status === 1 ? (
                        <i className="fa fa-toggle-on btn-active text-primary"> </i>
                      ) : (
                        values.row.original.status === 2 && (
                          <i className="fa fa-toggle-off"> </i>
                        )
                      )}
                    </button>
                    {/* module Change Button end  */}

                    {values.row.original.status !== 2 &&
                      <Link
                        to={`edit/${values.row.original.id}`}
                        //state={{ rowIdx }}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTSVG
                          path="/media/icons/duotune/art/art005.svg"
                          className="svg-icon-3"
                        />
                      </Link>
                    }

                    {/* module delete Button start  */}
                    <button
                         onClick={() => {
                        //console.log(values.row.original.id)
                        dailyTipsDelete(values.row.original.id)
                      }}
                      className="btn btn-icon btn-bg-light btn-active-color-primary me-1 btn-sm"
                    >
                      <KTSVG
                        path="/media/icons/duotune/general/gen027.svg"
                        className="svg-icon-3"
                      />
                    </button>
                    {/* module delete Button end  */}
                    {values.row.original.status !== 2 &&
                      <Link
                        to={`details/${values.row.original.id}`}
                        //state={{ rowIdx }}
                        className="btn btn-bg-light btn-active-color-primary btn-sm"
                      >
                         Details
                      </Link>
                    }
                  </>
                )}
              </>
            </div>
          )
        },
      },
    ],
    [statusChange, dailyTipsDelete , dailyTipsData]
  )

  return <DataTable columns={columns} data={dailyTipsData} />
}