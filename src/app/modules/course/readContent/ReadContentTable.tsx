import React from 'react';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../../_jutemplate/helpers';
import DataTable from '../../../../_jutemplate/dataTable/DataTable';
import defaultImg from "../blank.png";



interface TableProps {
  courseContentData: any[]
  statusChange : (id: number,status:number) => void
  readContentDelete: (id: number) => void
 
}
export const ReadContentTable: React.FC<TableProps> = ({
  courseContentData,
  statusChange,
  readContentDelete,
 
}) => {
  //const store = useSelector((state: any) => state)
  //const { user } = store.auth as any

  // React.useEffect(() => {
  //     // set data
  //   }, [user])

  const columns = React.useMemo(
    () => [
      

      {
        Header: 'Title',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.title ? values.row.original.title : "--"
      },
      {
        Header: 'Reading_Time ( Minute )',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.reading_time ? values.row.original.reading_time : "--"
      },
      {
        Header: 'Status',
        disableSortBy: false,
        Cell: (values: any) => {
          //console.log(values);
          return (
            <>
                {values.row.original.status === 1 ? (
                  <span className="badge badge-light-success">Active</span>
                ) : values.row.original.status === 2 ? (
                  <span className="badge badge-light-danger">Disabled</span>
                ) : (
                  <span className="badge badge-light-info">Deleted</span>
                )}
            </>
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
                        readContentDelete(values.row.original.id)
                      }}
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
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
                        className="btn  btn-bg-light btn-active-color-primary btn-sm ms-1"
                      >
                         Details
                      </Link>
                    }
                    {/* module Attachment end  */}
                    {values.row.original.status !== 2 &&    
                      <Link
                        to={`course-attachment/${values.row.original.id}`}
                        //state={{ rowIdx }}
                        className="btn  btn-bg-light btn-active-color-primary btn-sm ms-1"
                      >
                        Attachment
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
    [statusChange, readContentDelete ,courseContentData]
  )

  return <DataTable columns={columns} data={courseContentData} />
}