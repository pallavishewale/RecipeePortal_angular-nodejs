import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeeServiceService } from 'src/app/recipee-service.service';
import { UsersService } from 'src/app/users.service';


@Component({
  selector: 'app-my-recipees',
  templateUrl: './my-recipees.component.html',
  styleUrls: ['./my-recipees.component.css']

})


export class MyRecipeesComponent {
  userid:any;
  recipeeDetails: any = [];
  displayedColumns: string[] = ['id', 'name', 'ingredients', 'serve', 'description', 'type', 'actions'];
  totalPages: any;
  constructor(private rcep: RecipeeServiceService, private user:UsersService,private router: Router, private route: ActivatedRoute) {
    }
  
  ngOnInit(): void {
    
   // this.userid = this.user.getUserId();
   this.userid =localStorage.getItem('userId');
    console.log("currently loged in user : ",this.userid);
    this.ShowAll();
  }



  ShowAll() {
    //subscribing for get all employee records
    console.log("data of user id:",this.userid);
    this.rcep.getMyRecipees(this.userid).subscribe(
      {
        next: (data) => {
          this.recipeeDetails = data;
          console.log("data of my recipees:", data);
          this.totalPages = Math.ceil(this.recipeeDetails.length / this.pageSize);
        },
        error: (error) => {
          console.error("Error: of my recipees", error);
        }
      }
    );
  }

  pageIndex = 1;
  pageSize = 5; 
  //totalPages = Math.ceil(this.dataSource.length / this.pageSize);


  previousPage() {
    this.pageIndex--;
  }

  nextPage() {
    this.pageIndex++;
  }

  edit(id: number) {
    console.log("edit calld ...id for updation :", id);
   this.router.navigate(['/home/edit', id], { relativeTo: this.route });
  }



  //subscribing for delete recipee
   deleted(id: number) {
    console.log("id for deletion = ", id);
    let confirmation = confirm("do you want to Delete ..??");
    if (confirmation) {
      this.rcep.deleteRecipee(id).subscribe(
        (data) => {
          console.log("deleted result :", data);
          alert("deleted succesfully ....");
          this.ShowAll();
        },
        (error) => {
          console.log("deleted error :", error);
        }
      )
    }
  }


  
}
