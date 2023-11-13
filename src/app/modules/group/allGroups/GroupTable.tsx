import React from 'react';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../../_jutemplate/helpers';
import DataTable from '../../../../_jutemplate/dataTable/DataTable';


interface TableProps {
  groupData: any[]
  statusChange : (id: number,status:number) => void
  groupDelete: (id: number) => void
}

export const GroupsTable: React.FC<TableProps> = ({
  groupData,
  statusChange,
  groupDelete
}) => {

  

  const columns = React.useMemo(
    () => [
     
      {
        Header: 'Title',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.title ? values.row.original.title : "--"
      },
      
      {
        Header: 'Total Member',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.total_member ? values.row.original.total_member : "--"
      },
      {
        Header: 'Group Topic',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.groupTopicTitle ? values.row.original.groupTopicTitle : "--"
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
                        groupDelete(values.row.original.id)
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
                        className="btn  btn-bg-light btn-active-color-primary btn-sm"
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
    [statusChange, groupDelete , groupData]
  )

  return <DataTable columns={columns} data={groupData} />
}