import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeeServiceService } from 'src/app/recipee-service.service';
import { UsersService } from 'src/app/users.service';



@Component({
  selector: 'app-add-recipee',
  templateUrl: './add-recipee.component.html',
  styleUrls: ['./add-recipee.component.css']
})
export class AddRecipeeComponent {
  userid:any;
  recipeForm!: FormGroup;
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

  constructor(private fb: FormBuilder,private router: Router,
     private recp: RecipeeServiceService, private user: UsersService) {}

  ngOnInit() {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      ingredients: [[], Validators.required],
      description: [''],
      serve: ['', Validators.required],
      type: ['', Validators.required]
    });
 
    //get current user id
   // this.userid =this.user.getUserId();
   this.userid = localStorage.getItem('userId');
    console.log("currently loged in user id : ",this.userid);
  }
  

  Submit(recipeeData:any) {

    if (this.recipeForm.valid) {
      const ApiBody ={"user_id": this.userid, ...recipeeData};
      console.log("data for Post recipee :::",ApiBody);

      //call service api to add new recipee in database
      this.recp.addRecipe(ApiBody).subscribe({
        next:(data)=>{
           console.log("result: GET addRecipee :",data);
             // Navigate back to the current component
            
           alert("recipee Add succesfully....");
        },
        error:(error)=>{
          console.log("Error: GET addRecipee :",error);
        }
      })
    }
  }
}
