import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGiftcardDialogComponent } from './add-giftcard-dialog.component';

import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule }   from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [AddGiftcardDialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  entryComponents: [
    AddGiftcardDialogComponent
  ]
})
export class AddGiftcardDialogModule { }
