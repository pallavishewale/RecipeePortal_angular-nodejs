import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddRecipeeComponent } from './add-recipee/add-recipee.component';
import { ShowRecipeeComponent } from './show-recipee/show-recipee.component';
import { MyRecipeesComponent } from './my-recipees/my-recipees.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeeDetailsComponent } from './recipee-details/recipee-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    WelcomeComponent,
    AddRecipeeComponent,
    ShowRecipeeComponent,
    MyRecipeesComponent,
    EditRecipeComponent,
    RecipeeDetailsComponent
  ],
  imports: [
    CommonModule,MaterialModule,RouterModule,MatIconModule,
    MatMenuModule,MatSelectModule, MatCardModule,FormsModule,ReactiveFormsModule,
    MatTableModule
  ],
  exports:[
     DashboardComponent,AddRecipeeComponent,
     ShowRecipeeComponent, MyRecipeesComponent,WelcomeComponent
  ]
})
export class RecipeePortalModule { }
