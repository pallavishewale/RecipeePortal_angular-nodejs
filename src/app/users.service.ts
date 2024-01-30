import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userid :any;

 private authenticated = false;

 login() {
  
   this.authenticated = true;
   console.log("user loged in");
 }

 logout() {
 
   this.authenticated = false;
   console.log("user  loged out");
   
 }

 isAuthenticated(): boolean {
   return this.authenticated;
 }






  constructor(private http: HttpClient) { }

  getUsers(key:string, value:string){
   let  url = "http://localhost:3000/users";
    if(key && value ){
      url =`http://localhost:3000/users?${key}=${value}`;
    }
    return this.http.get(url);
  }

  addUser(body:any){
    console.log("enter in add user ")
    
      return this.http.post("http://localhost:3000/users", body);
      
  }

  setUserId(id:any){
    console.log("user Id set on service");
    this.userid =id;
  }
  getUserId() {
    return this.userid
  }
}
