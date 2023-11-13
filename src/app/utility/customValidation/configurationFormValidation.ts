
export const formValidation = (input:any)=>{

    const err:any={}

    for(let key in input){
        if(input[key] === "" || input[key].length === 0 ){
          err[key]= `${key} field is required`;
        }
        else{
            if( !( (input[key].length >= 2) && (input[key].length <= 300) ) ){
                err[key]= `${key} Should be between 2 to 300 character`;
            }
        }
     }
  
  return err;
 
 }