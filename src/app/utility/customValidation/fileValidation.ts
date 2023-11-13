

export const imageValidation = (fileType:string,fileSize:number,acceptImageType:string[],acceptImageSize:number)=>{

    if( acceptImageType.includes(fileType)){

        if( ! (fileSize <= acceptImageSize)){
            return `Unsupported File Size ! image should not be greater than ${acceptImageSize/1000000} MB`
        } 

    } else {

        const regx = /image\//gi;
        return `Unsupported File Format ! only ${acceptImageType.toString().replace(regx," ")} is required`

    }
}