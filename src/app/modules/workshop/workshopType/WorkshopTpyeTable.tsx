import React from 'react';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../../_jutemplate/helpers';
import DataTable from '../../../../_jutemplate/dataTable/DataTable';


interface TableProps {
  workshopTypeData: any[]
  statusChange : (id: number,status:number) => void
  workshopTypeDelete: (id: number) => void
}
export const WorkshopTypeTable: React.FC<TableProps> = ({
  workshopTypeData,
  statusChange,
  workshopTypeDelete
}) => {
  

  const columns = React.useMemo(
    () => [
     
      {
        Header: 'Title',
        accessor: 'title',
        disableSortBy: false,
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
                        workshopTypeDelete(values.row.original.id)
                      }}
                      className="btn btn-icon btn-bg-light btn-active-color-primary  btn-sm"
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
    [statusChange, workshopTypeDelete , workshopTypeData]
  )

  return <DataTable columns={columns} data={workshopTypeData} />
}