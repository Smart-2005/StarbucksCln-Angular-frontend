import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private authService:AuthService,private router:Router,private toastr:ToastrService){}

  signupForm = new FormGroup({
    name: new FormControl('',Validators.required),
    username:new FormControl('',Validators.email),
    password:new FormControl('',Validators.required)
  })

  createUser(){
      this.authService.register(this.signupForm.value).subscribe((response)=>{
        console.log(response);
          this.toastr.success("User Created Successfully!","User Registration",{timeOut:2000})
      });
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 2000);



  }

}


