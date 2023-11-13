import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { KTSVG } from '../../../../../_jutemplate/helpers';
import DataTable from '../../../../../_jutemplate/dataTable/DataTable';
import defaultImg from "../blank.png";



interface TableProps {
  courseReadAttachmentData: any[]
  statusChange : (id: number,status:number) => void
  courseReadAttachmentDelete: (id: number) => void,
  courseAttachmentId:number
 
}
export const AttachmentTable: React.FC<TableProps> = ({
  courseReadAttachmentData,
  statusChange,
  courseReadAttachmentDelete,
  courseAttachmentId,
 
}) => {
  //const store = useSelector((state: any) => state)
  //const { user } = store.auth as any

  // React.useEffect(() => {
  //     // set data
  //   }, [user])
  //<a href={`${values.row.original.url}`} target="_blank">{values.row.original.url}</a>

  const navigate = useNavigate()
  const columns = React.useMemo(
    () => [
      

      {
        Header: 'File Name',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.file_name  ? values.row.original.file_name.split("-").slice(1).join(' ').split(".").slice(0,1).join(' ') : "--"
      },
      {
        Header: 'URL',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.url ?   <a href={`${values.row.original.url}`} target="_blank" rel="noreferrer">{values.row.original.url}</a> : "--"
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
                        state={{ attachmentId: courseAttachmentId }}
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
                        courseReadAttachmentDelete(values.row.original.id)
                      }}
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTSVG
                        path="/media/icons/duotune/general/gen027.svg"
                        className="svg-icon-3"
                      />
                    </button>
                    {/* module delete Button end  */}
                    
                   


                    
                  </>
                )}
              </>
            </div>
          )
        },
      },
    ],
    [statusChange, courseReadAttachmentDelete,courseReadAttachmentData]
  )

  return <DataTable columns={columns} data={courseReadAttachmentData} />
}