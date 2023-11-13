import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// import orderingAPI from '../../../../api/brand/orderingAPI';
import courseAttachmentAPI from '../../../../../api/course/courseAttachmentAPI';
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';

import { PageTitle } from '../../../../../_jutemplate/layout/core';
import Loading from '../../../../components/Loading';

export const RearrangeAttachment:React.FC = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [courseAttachment, setCourseAttachment ] = useState<any>([]);
  const [courseAttachmentId,setCourseAttachmentId] = useState<number>(0)
  const [ buttonLoading, setbuttonLoading ] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const getAttachment = (id:number) => {
    
    courseAttachmentAPI.getCourseAttachment(id).then(
      
      (res: any) => {
        setLoading(false)
        if (res.data.data) {
          console.log(res.data.data)
          setCourseAttachment(res.data.data)
        } else{
          toast.error(res.data.message, {
            theme: 'dark',
          })
        }
      },
      (err: any) => {
        setLoading(false)
        if (err?.response?.data?.success === false) {
          toast.error(err.response.data.message, {
            theme: 'dark',
          })
        }
      },
    )
  }

  useEffect(()=>{
    
     if(courseAttachmentId){
        console.log(courseAttachmentId)
        getAttachment(courseAttachmentId);
     }
  },[courseAttachmentId])

  useEffect(() => {
    let url = window.location.href;
    var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
    setCourseAttachmentId(id)
    
  },[])
 

  const onRearrangeSave = () => {

    let data = {
      course_read_id : courseAttachmentId,
      attachment_serial : courseAttachment.map((item: any) => item.id),
    };
    // console.log(data);
    setbuttonLoading(true)
    courseAttachmentAPI.RearrangeAttachment(data).then(
      (res: any) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message, { theme: 'dark' });
          // setCourseContents(rearrangeList);
          // setRearrangeStatus(false);
          setbuttonLoading(false)
          getAttachment(courseAttachmentId);
          navigate(`../${courseAttachmentId}`);
        } else {
          toast.error(res?.data?.message, { theme: 'dark' });
        }
      },
      (err: any) => {
        setbuttonLoading(false)
        toast?.error(err?.response?.data?.message, { theme: 'dark' });
      },
    );
  };

  const onDragEnd = (result: any) => {
    console.log(result);
    if (result.destination !== null) {
      const [data] = courseAttachment.splice(result.source.index,1)
      console.log(data)
      courseAttachment.splice(result.destination.index,0,data)
      // setCarBrand(finalData)
     
    }
  };

  

  return (
    <>
      <PageTitle>Course Attachment Ordering</PageTitle>
      <div className="row justify-content-end">
        <div className="col-md-2">
         
           <button
                
                id="kt_sign_in_submit"
                className="btn btn-md btn-primary "
                onClick={onRearrangeSave}
                disabled={buttonLoading ? true : false}
                
              >
                {buttonLoading ? (
                  <span
                    className="indicator-progress"
                    style={{ display: 'block' }}>
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                ) : (
                  <span className="indicator-label">save</span>
                )}
              </button>
        </div>
      </div>
     
      { loading ? <Loading/> : (
      <div className="row justify-content-center">
        <div className=" col-md-6 text-center">
          {courseAttachment.length !== 0 && (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {provided => (
                  <ul
                    className="list-group"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {courseAttachment.map((item: any, index: any) => {
                      return (
                        <Draggable
                          key={item?.id}
                          draggableId={item?.id.toString()}
                          index={index}>
                          {provided => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="list-group-item justify-content-between align-items-center my-1 py-2 rounded-2">
                           
                              <span className="badge badge-primary badge-pill text">
                                { item?.file_name  ? (item?.file_name.split("-").slice(1).join(' ').split(".").slice(0,1).join(' ')) : (item?.url) }
                              </span>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
      )
     }
    </>
  );
};


