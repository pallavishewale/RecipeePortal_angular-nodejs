import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: SocialAuthService,
    private router: Router, private rout: ActivatedRoute,
     private user: UsersService) { }


  socialuser: any;
  loggedIn: any;

  //rout authentication
  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.router.navigate(['/home']);
    }


    this.authService.authState.subscribe((user) => {
      this.socialuser = user;
      console.log("social userr data :", this.socialuser);
      this.loggedIn = (user != null);

      let socialUsername = this.socialuser.name.replace(/\s/g, '');

      const socialUserDetails = {
        "name": this.socialuser.name,
        "email": this.socialuser.email,
        "username": socialUsername,
        "password": socialUsername + 123
      }

      // add new user if not exist
      //crete new userif not exist.
      this.user.getUsers("email", this.socialuser.email).subscribe({
        next: (result: any) => {
          console.log("length and data :",result);  
          if (result.length > 0) {
            //set userId to service 
            this.user_id = result[0].user_id;
            this.user.setUserId(this.user_id);
            //set authentication
            this.user.login();
            localStorage.setItem('user', JSON.stringify(result));//set in localstroge
            localStorage.setItem('userId', JSON.stringify(this.user_id));
            //nevigate to user profile   
            this.router.navigate(['/home']);
          }
          else {
            this.user.addUser(socialUserDetails).subscribe({

              next: (result: any) => {
                console.log("Result : adding new user of login with google Post  :", result);
                alert("********  REMEMBER: ****** \n username =" + socialUsername +
                  " password = " + socialUsername + 123);
                //set userId to service 
                this.user_id = result[0].user_id;
                this.user.setUserId(this.user_id);
                //set authentication
                this.user.login();
                localStorage.setItem('user', JSON.stringify(result));//set in localstroge
                localStorage.setItem('userId', JSON.stringify(this.user_id));
                //nevigate to user profile   
                this.router.navigate(['/home']);

              },
              error: (error: any) => {
                console.log("Error: adding nnnnnn new user Post :", error.error);
                alert(error.error.Error);
              }
            })
          }

        }
      })




    }

    );
  }
  username: string = "";
  password: string = "";
  show: boolean = false;
  userExist: any = [];
  user_id: number | undefined;
  usernameError: any;
  passwordError: any;
  error: any;

  login() {
    this.usernameError = "";
    this.passwordError = "";
    this.error = "";


    console.log("user name is " + this.username)
    //subscribe observable to check  data of loged in user
    this.user.getUsers("username", this.username).subscribe({
      next: (result: any) => {
        console.log("Result GET: user Data", result);
        this.userExist.push(result);
        console.log("UserExist array :::", this.userExist);
        if (result.length > 0) {

          if (this.password == result[0].password) {
            //set userId to service 
            this.user_id = result[0].user_id;
            this.user.setUserId(this.user_id);
            //set authentication
            this.user.login();
            localStorage.setItem('user', JSON.stringify(result));//set in localstroge
            localStorage.setItem('userId', JSON.stringify(this.user_id));
            //nevigate to user profile   
            this.router.navigate(['/home']);
          } else {
            this.passwordError = "Wrong Password"

          }
        } else {

          this.usernameError = "Invalid username"
        }
        this.userExist.pop();
      },
      error: (error) => {
        console.log("Error GEt : user ", error)

      }
    })



  }

}
