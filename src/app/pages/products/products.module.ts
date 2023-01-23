import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule
  ]
})
export class ProductsModule { }
