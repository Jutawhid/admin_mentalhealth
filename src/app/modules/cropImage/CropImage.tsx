import React,{useState,useEffect} from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const CropImage:React.FC = ()=>{

    const [src, setSrc] = useState<any>(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null);

    const fileChangeHandler = (e:any)=>{
        if(e.target.files.length >= 0){
            setSrc(URL.createObjectURL(e.target.files[0]));
        }
    }

    useEffect(()=>{
      
    },[src])
    
//     const selectImage = (file:any) => {
//       setSrc(URL.createObjectURL(file));
//     };

//     const cropImageNow = () => {
//         const canvas = document.createElement('canvas');
//         const scaleX = image.naturalWidth / image.width;
//         const scaleY = image.naturalHeight / image.height;
//         canvas.width = crop.width;
//         canvas.height = crop.height;
//         const ctx = canvas.getContext('2d');
      
//         const pixelRatio = window.devicePixelRatio;
//         canvas.width = crop.width * pixelRatio;
//         canvas.height = crop.height * pixelRatio;
//         ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//         ctx.imageSmoothingQuality = 'high';
      
//         ctx.drawImage(
//           image,
//           crop.x * scaleX,
//           crop.y * scaleY,
//           crop.width * scaleX,
//           crop.height * scaleY,
//           0,
//           0,
//           crop.width,
//           crop.height,
//         );
          
//         // Converting to base64
//         const base64Image = canvas.toDataURL('image/jpeg');
//         setOutput(base64Image);
//       };

    return(

          <>   
            <div className=" container">
                  <div className="row justify-content-center">
                      
                              <div className="form-group col-md-6">
                                    
                                    <input type="file" 
                                        accept="image/*"  
                                        className="form-control form-control-lg form-control-solid"
                                        onChange={fileChangeHandler}
                                         />
                              </div>

                        
                  </div>
                  <div className="row justify-content-center">

                        <div className="col-md-5">
                           
                        </div>

                  </div>
                
                    
                 




</div>
         
          </>
    )
}

export default CropImage;