import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeeServiceService {

  constructor(private http:HttpClient) { }

  addRecipe(body:any){
    return this.http.post("http://localhost:3000/recipees", body);
  }

  getAllRecipees(){
    return this.http.get("http://localhost:3000/recipees");
  }
  getMyRecipees(userid:any){
    let uer =`http://localhost:3000/recipees?user_id=${userid}`;
    return this.http.get(uer);
  }

  updateRecipees(id:number,body:any){
    let url = `http://localhost:3000/recipees?id=${id}`
   return this.http.put(url,body);
  }

  deleteRecipee(id:number){
      let url = `http://localhost:3000/recipees?id=${id}`
      return this.http.delete(url)
  }

  getRecipesById(value:any){
    let url =`http://localhost:3000/recipees?id=${value}`
    return this.http.get(url);
  }

  getRecipessByType(value:any){
    let url =`http://localhost:3000/recipees?type=${value}`
    return this.http.get(url);
  }


  getAllRecords(recipee_id:any){
    let url =`http://localhost:3000/recipees/allrecord?id=${recipee_id}`
    return this.http.get(url);
  }
}
