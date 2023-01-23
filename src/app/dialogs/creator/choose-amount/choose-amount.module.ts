import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseAmountComponent } from './choose-amount.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule }   from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ChooseAmountComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  entryComponents: [
    ChooseAmountComponent
  ]
})
export class ChooseAmountModule { }
