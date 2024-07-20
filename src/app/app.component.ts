import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icountry } from './shared/model/country';
import { countries } from './shared/const/countrydata';
import { CustomRegex } from './shared/const/validatorPatter';
import { PrnValidation } from './shared/const/prnValidator';
import { NospaceValidators } from './shared/const/noSpaceValidators';
import { AsynchronusEmailValidators } from './shared/const/AsyncronusValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'reactiveForm';
  signUpForm !:FormGroup
  countryInfo :Array<Icountry>=[]
  constructor(){}
  ngOnInit(): void {
  this.countryInfo=countries
 this.createSignUpForm();
 this.enableConfirmPass()
this.validateCurrrentAdd();
this.patchPerAdd();
this.passAndConPassSame()
  }
  createSignUpForm(){
    this.signUpForm=new FormGroup({
      fname:new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.fname)]),
      lname:new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.lname)]),
      email:new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.email)],[AsynchronusEmailValidators.isEmailAvailable]),
      username:new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.username),Validators.minLength(5),Validators.maxLength(8),NospaceValidators.noSpace]),
      prnNo:new FormControl(null,[Validators.required,Validators.maxLength(8),PrnValidation.isPrnvalid]),
      gender:new FormControl(null,[Validators.required]),
      currentAddress: new FormGroup({
        country: new FormControl('India',[Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        pinCode: new FormControl(null, [Validators.required]),
        contact: new FormControl(null, [Validators.required])
      }),
      permenentAddress: new FormGroup({
        country: new FormControl('India',[Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        pinCode: new FormControl(null, [Validators.required]),
        contact: new FormControl(null,[Validators.required])
      }),
      isAddSame:new FormControl({value:null,disabled:true}),
      password:new FormControl(null,[Validators.required]),
      Confirmpassword: new FormControl({ value: null, disabled: true }, [Validators.required]),
      skills:new FormArray([new FormControl(null,[Validators.required])])
    })
  }
  onSignUp(){
    console.log(this.signUpForm.value);
    this.signUpForm.reset()
    
  }

  
  get skillsFormArry(){
    return this.signUpForm.get('skills') as FormArray
  }
  get username(){
    return this.signUpForm.get('username') as FormControl
  }
  get fname(){
    return this.signUpForm.get('fname') as FormControl
  }
  get lname(){
    return this.signUpForm.get('lname') as FormControl
  }
  get f(){
  return this.signUpForm.controls
} 
  onRemoveSkill(i:number){
    const userConfirmed = confirm('Are you sure you want to remove this skill?');
    if (userConfirmed) {
    this.skillsFormArry.removeAt(i)
  }
} 

onSkillAdd() {
    if (this.skillsFormArry.controls[this.skillsFormArry.length - 1].valid && this.skillsFormArry.length < 5) {
      let skillControl = new FormControl(null, [Validators.required]);
      this.skillsFormArry.push(skillControl);
    }
  }
  enableConfirmPass() {
    this.f['password'].valueChanges.subscribe(() => {
      if (this.f['password'].valid) {
        this.f['Confirmpassword'].enable();
      } else {
        this.f['Confirmpassword'].disable();
      }
    });
  }
  passAndConPassSame() {
    this.f['Confirmpassword'].valueChanges.subscribe(res => {
      if (res !== this.f['password'].value) {
        this.f['Confirmpassword'].setErrors({ 'passAndConf': 'Password and Confirm Password must be same' });
      } 
      else 
      {
        this.f['Confirmpassword'].setErrors(null);
      }
    });
  }
validateCurrrentAdd(){
  this.f['currentAddress'].valueChanges.subscribe(res=>{
    if(this.f['currentAddress'].valid){
      this.f['isAddSame'].enable();
    }else{
      this.f['isAddSame'].disable();
    }
  })
}
patchPerAdd(){
  this.f['isAddSame'].valueChanges.subscribe(res=>{
    if(res){
      this.f['permenentAddress'].patchValue(
        this.f['currentAddress'].value
      )
      this.f['permenentAddress'].disable();
    }else{
      this.f['permenentAddress'].reset();
      this.f['permenentAddress'].enable();
    }
  })
}
}
