import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs';

const materialimports = [MatButtonModule,MatSlideToggleModule,MatInputModule,
  MatFormFieldModule, MatToolbarModule,MatTabsModule];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    materialimports
    ],
    exports: [
      CommonModule,
      materialimports
     ],
})
export class MaterialModule { }
