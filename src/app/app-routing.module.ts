import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './recipee-portal/dashboard/dashboard.component';
import { WelcomeComponent } from './recipee-portal/welcome/welcome.component';
import { AddRecipeeComponent } from './recipee-portal/add-recipee/add-recipee.component';
import { ShowRecipeeComponent } from './recipee-portal/show-recipee/show-recipee.component';
import { MyRecipeesComponent } from './recipee-portal/my-recipees/my-recipees.component';
import { EditRecipeComponent } from './recipee-portal/edit-recipe/edit-recipe.component';
import { AuthGuard } from './auth.guard';
import { RecipeeDetailsComponent } from './recipee-portal/recipee-details/recipee-details.component';


const routes: Routes = [
  {path :'login', component: LoginComponent},
  {path:'', component:  LoginComponent, pathMatch:'full'},
  {path:'register', component:RegisterComponent},
  
  {path:'home', component:DashboardComponent,
   children:[{path:'' ,pathMatch:'full', component:WelcomeComponent},
              {path:'add-recipe' , component:AddRecipeeComponent, canActivate: [AuthGuard]},
              {path:'show-recipes', component:ShowRecipeeComponent},
              {path:'my-recipes', component: MyRecipeesComponent,canActivate: [AuthGuard]},
            {path:'edit/:id', component:EditRecipeComponent, canActivate: [AuthGuard]},
            {path:'allRecords/:id', component:RecipeeDetailsComponent,canActivate: [AuthGuard]}]},
              
  {path: '**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
