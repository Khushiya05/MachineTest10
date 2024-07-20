import { AbstractControl, ValidationErrors } from "@angular/forms";



export class AsynchronusEmailValidators{
    static isEmailAvailable(control:AbstractControl):Promise<ValidationErrors|null>{
        let val:string=control.value
        const promise=new Promise<ValidationErrors|null>((resolve,reject)=>{
setTimeout(() => {
    if(val==="khushiyapatil360@gmail.com"){
        resolve({
            emailExistError:"This Email Id is Already Exist..."
        })
    }else{
        resolve(null)
    }
}, 2500);
        })
        return promise
    }
   
}