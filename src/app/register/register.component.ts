import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registrationForm: FormGroup;
  constructor(private user: UsersService, private router: Router,
     private rout: ActivatedRoute, private fb:FormBuilder) {
      this.registrationForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', Validators.required],
       
      });
      }


  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: any = "";
   errorMsg :any;


  setConfirmPass(pass:any){
    this.confirmPassword= pass;
  }
  register(userData: any): void {
    // Add your registration logic here
   this.errorMsg='';
    if (userData.password === this.confirmPassword) {
    
      console.log("user data for resitration  :", userData);
      this.user.addUser(userData).subscribe({
        next: (result: any) => {
          console.log("Result : adding new user Post :", result);
          alert("user Registered succesfully ...LogIn Now");
          this.router.navigate(['/login']);

        },
        error: (error: any) => {
          console.log("Error: adding new user Post :", error.error);
          alert(error.error.Error);
        }
      })
      console.log('Regidtration user data : ', userData);

    } else {
      this.errorMsg= "Retype: password does not matched";
      userData.password = "";
      this.confirmPassword = "";
    }
  }
}
