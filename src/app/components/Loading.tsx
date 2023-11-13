import React from "react";

 const Loading:React.FC = ()=>{
    return(
        <>
           <div className="d-flex justify-content-center align-items-center mb-4">
                <div className="spinner-border text-primary" role="status">
                    
                </div>
                <p className=" my-auto ms-2">Loading...</p>
            </div>
        </>
    )
}

export default Loading;