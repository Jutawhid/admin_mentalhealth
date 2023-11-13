import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { PageTitle } from "../../../_jutemplate/layout/core";
import ModuleAPI from "../../../api/module/moduleAPI";
import { Link } from "react-router-dom";
import { KTSVG } from "../../../_jutemplate/helpers";
import { ModuleTable } from "./ModuleTable";
import Loading from "../../components/Loading";

export const ModuleList: React.FC = () => {
  const [moduleData, setModuleData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchData, setSearchData] = useState<any>([]);

  // get module list
  const getModuleList = async () => {
    ModuleAPI.getAllModule().then(
      (res: any) => {
        setLoading(false);
        if (res.data.data) {
          console.log(res);
          setModuleData(res.data.data);
        } else {
          toast.error(res.data.message, {
            theme: "dark",
          });
        }
      },
      (err: any) => {
        setLoading(false);
        if (err?.response?.data?.success === false) {
          toast.error(err.response.data.message, {
            theme: "dark",
          });
        }
      }
    );
  };

  // change status
  const moduleStatusChange = (id: number, status: number, title: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${
        status == 1 ? " disable" : "enable"
      } this ${title} module !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it !",
    }).then((result) => {
      if (result.isConfirmed) {
        ModuleAPI.changeStatus(id).then(
          (res: any) => {
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: "dark",
              });
              getModuleList();
            } else {
              toast.error(res.data.message, {
                theme: "dark",
              });
            }
          },
          (err: any) => {
            if (err?.response?.data?.success === false) {
              toast.error(err.response.data.message, {
                theme: "dark",
              });
            }
          }
        );
      }
    });
  };

  // delete module
  const moduleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this module!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ModuleAPI.deleteModule(id).then(
          (res: any) => {
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: "dark",
              });
              getModuleList();
            } else {
              toast.error(res.data.message, {
                theme: "dark",
              });
            }
          },
          (err: any) => {
            if (err?.response?.data?.success === false) {
              toast.error(err.response.data.message, {
                theme: "dark",
              });
            }
          }
        );
      }
    });
  };
  // init
  useEffect(() => {
    // get Module list
    getModuleList();
  }, []);

  const onChangeSearchTitle = (e: any) => {
    setSearchTitle(e.target.value);
  };

  const searchModuleData = () => {
    // search Module function
    if (searchTitle.length > 0) {
      setSearchData(
        moduleData.filter((value: any) =>
          value.title.toLowerCase().includes(searchTitle.toLowerCase())
        )
      );
    } else {
      setSearchData([]);
    }
  };

  useEffect(() => {
    // search Module
    searchModuleData();
  }, [searchTitle, moduleData]);

  return (
    <>
      <PageTitle>All Module</PageTitle>
      <div className={`card shadow-sm`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <div className="card-title align-items-start flex-column">
            <div className="d-flex align-items-center position-relative my-1">
              <span className="svg-icon svg-icon-1 position-absolute ms-6">
                <KTSVG
                  path="/media/icons/duotune/general/gen021.svg"
                  className="svg-icon-1"
                />
              </span>
              <input
                type="text"
                data-kt-user-table-filter="search"
                className="form-control form-control-solid w-250px ps-14"
                placeholder="Search Module"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </div>
            <span className="text-muted mt-1 fw-bold fs-7">
              Total{" "}
              {searchData.length !== 0 || searchTitle.length !== 0
                ? searchData.length
                : moduleData?.length}{" "}
              Modules
            </span>
          </div>
          <div className="card-toolbar">
            {/* begin::Menu */}
            <>
              {/* add new module start */}
              {/* <Link to="create" className="btn btn-sm btn-primary">
                <span className="indicator-label">
                  <KTSVG
                    path="/media/icons/duotune/arrows/arr087.svg"
                    className="svg-icon-3 ms-2 me-3"
                  />
                </span>
                Add Module
              </Link> */}
            </>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        {loading ? (
          <Loading />
        ) : searchData.length !== 0 || searchTitle.length !== 0 ? (
          <ModuleTable
            moduleStatusChange={moduleStatusChange}
            moduleDelete={moduleDelete}
            ModuleData={searchData}
          />
        ) : (
          <ModuleTable
            moduleStatusChange={moduleStatusChange}
            moduleDelete={moduleDelete}
            ModuleData={moduleData}
          />
        )}
      </div>
    </>
  );
};
