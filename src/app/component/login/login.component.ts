import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastComponent, NgToastModule, NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  loginForm!:FormGroup;


  // loginObj: any={
  //   email: '',
  //   password: '',
  // }

  constructor(private fb:FormBuilder,private auth:AuthService,private router: Router,private toast:NgToastService){

  }


  ngOnInit():void {
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  hideshowpass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText?this.type = "text" : this.type = "password";
  }


//   onLog(){
//     if(this.loginForm.valid){
//     this.auth.onLogin(this.loginForm.value).subscribe((res: any) => {
//       console.log(res.message);
//       this.loginForm.reset();
//       // console.log('res',res)
//       localStorage.setItem('token',res.token);
//       this.auth.storeToken(res);
//       this.toast.success({detail:"SUCCESS",summary:"Login Success",duration:5000});
//       this.router.navigateByUrl('/dashboard');    
//     })
//   }
// }

OnLogin(){
  if(this.loginForm.valid){
    this.auth.onLogin(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        this.loginForm.reset();  
        localStorage.setItem('token',res);
        this.auth.storeToken(res);
        this.toast.success({detail:"SUCCESS",summary:"Login Success",duration:3000});
      this.router.navigateByUrl('/dashboard');    
      },
      error:(err)=>{
        this.toast.error({detail:"ERROR",summary:"Something went wrong!",duration:3000})
        console.log(err);
      },
    })
  }else{
    this.validateAllFormFields(this.loginForm);
    this.toast.error({detail:"ERROR",summary:"Your Form is Invalid!!",duration:2000})
  }
}








  
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }

}
