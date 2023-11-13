import React from "react";
import {Link} from "react-router-dom";
import { PageTitle } from '../../../_jutemplate/layout/core';
import { KTSVG } from '../../../_jutemplate/helpers'
import '../../../_jutemplate/assets/css/custom.css'

export const AccountSetting:React.FC = ()=>{
   return (
      <> 
          <PageTitle>Account Setting</PageTitle>
          <div className="card shadow-sm">
                <div className="card-header">
                      <h3 className=" card-title">Personal Information</h3>
                </div>
                <div className="card-body">
                    
                    <div className="d-flex account-setting-card-height justify-content-between align-items-center flex-wrap">
                            
                            <div>
                                <h5>Password</h5>
                                <p>**************</p>
                            </div>

                            <div className="">
                                
                                    <Link to="update-profile" className="btn btn-md btn-secondary btn-active-color-info">
                                        <span className="indicator-label">
                                            <KTSVG
                                                path="/media/icons/duotune/arrows/editPassword.svg"
                                                className="svg-icon-3 ms-2 me-3"
                                            />
                                        </span>
                                        Change
                                    </Link>
                                
                            </div>
                    </div>
                    
                </div>
          </div>
      </>
   )
}