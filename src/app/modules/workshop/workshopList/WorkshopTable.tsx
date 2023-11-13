import React from 'react';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../../_jutemplate/helpers';
import DataTable from '../../../../_jutemplate/dataTable/DataTable';
import defaultImg from "../../blank.png";

interface TableProps {
  workshopData: any[]
  statusChange : (id: number,status:number) => void
  workshopDelete: (id: number) => void
  imgPath: string
}
export const WorkshopTable: React.FC<TableProps> = ({
  workshopData,
  statusChange,
  workshopDelete,
  imgPath
}) => {


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
        Header:'Host Name',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.host_name ? values.row.original.host_name : "--"
      },
      {
        Header: 'Date',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.program_date ? values.row.original.program_date.split(" ")[0] : "--"
      },
      {
        Header: 'Duration In Minute',
        disableSortBy: false,
        Cell: (values: any) => {
         return ( 
            <div>
                {values.row.original.duration ? values.row.original.duration : "--" }
             
            </div>
          )
        }
      },
      // {
      //   Header: 'Price_$',
      //   disableSortBy: false,
      //   Cell: (values: any) => values.row.original.price ? values.row.original.price : "--"
      // },
     
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
             
                {values.row.original.status !== 0 && (

                  <>
                     {values.row.original.status !== 2 &&
                      
                          <Link
                              to={`participant/${values.row.original.id}`}
                              title="Workshop Participation List"
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                            >
                              <KTSVG
                                path="/media/icons/duotune/general/gen060.svg"
                                className="svg-icon-3"
                              />
                          </Link>
                      
                    }
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
                         workshopDelete(values.row.original.id)
                      }}
                      className="btn btn-icon btn-bg-light btn-active-color-primary me-1  btn-sm"
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
                        className="btn  btn-bg-light btn-active-color-primary btn-sm"
                      >
                         Details
                      </Link>
                    }
                  </>
                )}
              
           </div>
          )
        },
      },
    ],
    [statusChange, workshopDelete , workshopData]
  )

  return <DataTable columns={columns} data={workshopData} />
}