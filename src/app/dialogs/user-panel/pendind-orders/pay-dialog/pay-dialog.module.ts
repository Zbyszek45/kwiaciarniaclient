import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayDialogComponent } from './pay-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [PayDialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  entryComponents: [
    PayDialogComponent
  ]
})
export class PayDialogModule { }
