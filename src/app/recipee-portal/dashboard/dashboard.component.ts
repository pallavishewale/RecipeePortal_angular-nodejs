import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private user:UsersService,private router: Router){}
logout(){
  this.user.logout();
   this.router.navigate(['/login']);
   localStorage.removeItem('userId');
   localStorage.removeItem('user');
}
}
