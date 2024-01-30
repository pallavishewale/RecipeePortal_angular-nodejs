import { Component ,OnInit} from '@angular/core';
import { RecipeeServiceService } from 'src/app/recipee-service.service';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-show-recipee',
  templateUrl: './show-recipee.component.html',
  styleUrls: ['./show-recipee.component.css']
})


export class ShowRecipeeComponent implements OnInit{
  dataSource :any= [];
  totalPages: any;
  types: string[] = ['All','italian', 'chinese', 'indian', 'japanese'];

  constructor(private recp: RecipeeServiceService, private user:UsersService){}
  ngOnInit(): void {
   this.ShowAll();
  }

  ShowAll() {
    this.recp.getAllRecipees().subscribe({
      next: (data: any) => {
        this.dataSource = data;
        console.log("result: data of getAllRecipees:", this.dataSource);
        this.totalPages = Math.ceil(this.dataSource.length / this.pageSize); // Recalculate totalPages
      },
      error: (error) => {
     }
    });
  }

//show by type
  ShowByType(typeValue:any) {
    this.recp.getRecipessByType(typeValue).subscribe({
      next: (data: any) => {
        this.dataSource = data;
        console.log("result: data of getAllRecipees:", this.dataSource);
        this.totalPages = Math.ceil(this.dataSource.length / this.pageSize); // Recalculate totalPages
      },
      error: (error) => {
      }
    });
  }


  displayedColumns: string[] = ['id', 'name', 'type'];
  
  pageIndex = 1;
  pageSize = 5; 
  //totalPages = Math.ceil(this.dataSource.length / this.pageSize);


  previousPage() {
    this.pageIndex--;
  }

  nextPage() {
    this.pageIndex++;
  }

  onTypeSelection(event: any) {
    const selectedType = event.value;
    console.log('Selected Cuisine:', selectedType);

    if(selectedType == 'All'){
      this.ShowAll();
    }
    else{
      this.ShowByType(selectedType);
    }
  }
}
