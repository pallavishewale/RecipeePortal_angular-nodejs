import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Recipe } from 'src/app/recipee';
import { RecipeeServiceService } from 'src/app/recipee-service.service';
@Component({
  selector: 'app-recipee-details',
  templateUrl: './recipee-details.component.html',
  styleUrls: ['./recipee-details.component.css']
})

export class RecipeeDetailsComponent implements OnInit{
   recipeeId :string|null;
   recipe :any=[];

constructor( private route: ActivatedRoute,private recep:RecipeeServiceService,
  private router:Router){
  this.recipeeId = this.route.snapshot.paramMap.get('id');
}


  ngOnInit(): void {
    this.recep.getAllRecords(this. recipeeId).subscribe({
      next:(data)=>{
       this.recipe=data;
       this.recipe= this.recipe[0];
       console.log("result : all records ,",this.recipe)
      },
      error:(error)=>{
         console.log("error: all records :", error);
      }
    })
  }
  

  closeCard(){
    this.router.navigate(['/home/show-recipes']); 
  }

}
