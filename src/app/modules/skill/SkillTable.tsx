import React from "react";
import { Link } from "react-router-dom";
import { KTSVG } from "../../../_jutemplate/helpers";
import DataTable from "../../../_jutemplate/dataTable/DataTable";
import defaultImg from "../blank.png";

interface TableProps {
  skillData: any[];
  changeStatus: (id: number, status: number) => void;
  skillDelete: (id: number) => void;
  imgPath: string;
}
export const SkillTable: React.FC<TableProps> = ({
  skillData,
  changeStatus,
  skillDelete,
  imgPath,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        disableSortBy: false,
        Cell: (values: any) => {
          return (
            <div className="symbol symbol-50px">
              <img
                src={`${imgPath}/${values.row.original.image}`}
                alt=""
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = defaultImg as string;
                }}
              />
            </div>
          );
        },
      },

      {
        Header: "Title",
        disableSortBy: false,
        Cell: (values: any) =>
          values.row.original.title ? values.row.original.title : "--",
      },
      {
        Header: "Roles",
        disableSortBy: false,
        Cell: (values: any) =>
          values.row.original.roleDetails
            ? values.row.original.roleDetails.map((val: any, index: number) => {
                return (
                  <span
                    key={index}
                    className="badge badge-light-primary fs-7 me-1 mt-1"
                  >
                    {val.title}
                  </span>
                );
              })
            : "--",
      },

      {
        Header: "Status",
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
          );
        },
      },
      {
        Header: "Action",
        accessor: "actions",
        Cell: (values: any) => {
          return (
            <div>
              <>
                {values.row.original.status !== 0 && (
                  <>
                    <button
                      onClick={() =>
                        changeStatus(
                          values.row.original.id,
                          values.row.original.status
                        )
                      }
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 svg-icon-2x"
                    >
                      {values.row.original.status === 1 ? (
                        <i className="fa fa-toggle-on btn-active text-primary">
                          {" "}
                        </i>
                      ) : (
                        values.row.original.status === 2 && (
                          <i className="fa fa-toggle-off"> </i>
                        )
                      )}
                    </button>
                    {/* edit button */}
                    {values.row.original.status !== 2 && (
                      <Link
                        to={`edit/${values.row.original.id}`}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTSVG
                          path="/media/icons/duotune/art/art005.svg"
                          className="svg-icon-3"
                        />
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        skillDelete(values.row.original.id);
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
          );
        },
      },
    ],
    [changeStatus, skillData, skillDelete]
  );

  return (
    <>
      <DataTable columns={columns} data={skillData} />
    </>
  );
};
