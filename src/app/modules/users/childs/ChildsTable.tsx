import React from 'react';

import { KTSVG } from '../../../../_jutemplate/helpers';
import DataTable from '../../../../_jutemplate/dataTable/DataTable';
import { useSelector } from 'react-redux';
import defaultImg from '../blank.png';


interface TableProps {
  childsData: any[]
  changeStatus: (id: number,status:number) => void
  childDelete: (id: number) => void
}
export const ChildsTable: React.FC<TableProps> = ({
  childsData,
  changeStatus,
  childDelete
}) => {
  //const store = useSelector((state: any) => state)
  //const { user } = store.auth as any

  // React.useEffect(() => {
  //   // set data
  // }, [user])

  const columns = React.useMemo(
    () => [
      // {
      //   Header: 'Photo',
      //   disableSortBy: false,
      //   Cell: () => {
      //     // console.log(user.data.imageFolderPath);
      //     return (
      //       <div className="symbol symbol-50px">
      //         <img
      //           src={defaultImg}
      //           alt=""
      //           onError={() => 'https://picsum.photos/200'}
      //         />
      //       </div>
      //     )
      //   },
      // },
      {
        Header: 'Name',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.name ? values.row.original.name : ''
      
      },
      {
        Header: 'Email',
        disableSortBy: false,
        Cell: (values: any) => values.row.original.email ? values.row.original.email : ''
      },
     
      {
        Header: 'Status',
        disableSortBy: false,
        Cell: (values: any) => {
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
          )
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
                    <button
                      onClick={() =>
                        changeStatus(values.row.original.user_id,values.row.original.status)
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
                    <button
                      onClick={() => {
                        childDelete(values.row.original.user_id)
                      }}
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTSVG
                        path="/media/icons/duotune/general/gen027.svg"
                        className="svg-icon-3"
                      />
                    </button>
                  </>
                )}
              </>
            </div>
          )
        },
      },
    ],
    [changeStatus, childDelete, childsData],
  )

  return (
     <>
     
        <DataTable columns={columns} data={childsData}/>
        
     </>
  );

}
