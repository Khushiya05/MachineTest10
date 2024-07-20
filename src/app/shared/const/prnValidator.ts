import { AbstractControl } from "@angular/forms";


export class PrnValidation{
    static isPrnvalid(control:AbstractControl){
        let val=control.value as string;
        if(!val){
            return null
        }
        let regex=/^[A-Z]\d{7}$/;
        let isValid=regex.test(val)
        if(isValid){
            return null
        }else{
            return { invalidStd:'PRN Number must be start with one Alphabet and end with 7 number'}
        }
    }
}