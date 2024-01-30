import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeeServiceService } from 'src/app/recipee-service.service';
import { UsersService } from 'src/app/users.service';
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit{
  
  recipeeDetails :any=[];
  recepiId:any;
  Ruserid:any;
  RecipeeName:any;
  Ingrediance:any;
  serve:any;
  description:any;
  type:any;
  ingredientOptions: string[] = [ 'Salt',
  'Pepper',
  'Olive Oil',
  'Onion',
  'Garlic',
  'Butter',
  'Flour',
  'Sugar',
  'Eggs',
  'Milk',
  'Water']; 
constructor(private router: Router, 
  private formBuilder: FormBuilder,private recep : RecipeeServiceService,
  private route: ActivatedRoute,private user:UsersService){}
 
recipeForm!: FormGroup;

ngOnInit(): void {
    const permid = this.route.snapshot.paramMap.get('id');

   // this.userid = this.user.getUserId();
  //  console.log("currently loged in user : ",this.userid);
    //subscribe api for get details by ID
  this.recep.getRecipesById(permid).subscribe(
    {
      next:(data)=>{
        console.log("GET for Id result :", data)
        this.recipeeDetails = data;
        console.log("data of employeeDetails array :",this.recipeeDetails);
        if (this.recipeeDetails && this.recipeeDetails.length > 0) {
          // Use the first element assuming the API returns an array with one employee
          const element = this.recipeeDetails[0];
          this.recepiId=element.id;
          this.Ruserid = element.user_id;
          this.RecipeeName = element.name;
          this.Ingrediance = element.ingredients;
          this.serve = element.serve;
          this.description = element.description;
          this.type = element.type;
          
        }
      },
      error: (error)=>{
        console.log("GET for id error : ",error);
      }
    }
  )

  this.serValursOnForm();
}
    


serValursOnForm(){
  this.recipeForm = this.formBuilder.group({
    name: [this.RecipeeName, Validators.required],
    ingredients: [],
    description: [this.description],
    serve: [this.serve],
    type: [this.type]
  });
}



update(recipeeData:any) {

  if (this.recipeForm.valid) {
    const ApiBody ={"user_id": this.Ruserid, ...recipeeData};
    console.log("data for Post recipee :::",ApiBody);

    //call service api to add new recipee in database
    this.recep.updateRecipees(this.recepiId,ApiBody).subscribe({
      next:(data)=>{
         console.log("result: GET addRecipee :",data);
        //  this.router.navigate(['/home/my-recipees']);
         //nevigate to my recipees 
         this.router.navigate(['/home/my-recipes']);
         alert("recipee updated succesfully....");

      },
      error:(error)=>{
        console.log("Error: GET addRecipee :",error);
      }
    })
  }
}
  
  
  }





