import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService:AuthService,private router:Router,private toastr:ToastrService){}

  logInForm = new FormGroup({
    username:new FormControl('',Validators.email),
    password:new FormControl('',Validators.required)
  })
  login(){

    this.authService.login(this.logInForm.value).subscribe( (response:any)=>{
       // Assuming the response contains a token
       const token = response.token;

       // Handle login success
       this.authService.handleLoginSuccess(token);

        console.log(response);
        this.toastr.success("Your Login Successfully!","User Login",{timeOut:2000})
        setTimeout(() => {
          this.router.navigate(['/home'])
        }, 2000);


    },(error)=>{
      this.toastr.error("Chech your credintial!","User Login",{timeOut:2000})
      this.logInForm.reset()

    })
  }
}
