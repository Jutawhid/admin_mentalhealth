import React from 'react';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../_jutemplate/helpers';
import DataTable from '../../../_jutemplate/dataTable/DataTable';


interface TableProps {

    packageData: any[]
    changeStatus: (id: number,status:number) => void
    deletePackage : (id: number) => void

}

export const PackageTable: React.FC<TableProps> = ({
    packageData,
    changeStatus,
    deletePackage
 }) => {


    const columns = React.useMemo(
        () => [


            {
                Header: 'Title',
                disableSortBy: false,
                Cell: (values: any) => values.row.original.title ? values.row.original.title : " "
            },
            {
                Header: 'Duration ( Day )',
                disableSortBy: false,
                Cell: (values: any) => values.row.original.duration ? values.row.original.duration : " "
            },

            {
                Header: 'Price_$',
                disableSortBy: false,
                Cell: (values:any) => values.row.original.price
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
                                                changeStatus(values.row.original.id,values.row.original.status)
                                            }
                                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 svg-icon-2x"
                                        >
                                            {values.row.original.status === 1 ? (
                                                <i className="fa fa-toggle-on btn-active text-primary"> </i>
                                            ) : (
                                                values.row.original.status === 2 && (
                                                    <i className="fa fa-toggle-off"></i>
                                                )
                                            )}
                                        </button>
                                        {/* edit button */}
                                        {values.row.original.status !== 2 &&
                                            <Link
                                                to={`edit/${values.row.original.id}`}
                                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                            >
                                                <KTSVG
                                                    path="/media/icons/duotune/art/art005.svg"
                                                    className="svg-icon-3"
                                                />
                                            </Link>
                                        }

                                        <button
                                            onClick={() => {
                                                deletePackage(values.row.original.id)
                                            }}
                                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
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
        [changeStatus, packageData, deletePackage],
    )

    return (
        <>

            <DataTable columns={columns} data={packageData} />

        </>
    );

}