import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule }   from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class LoginModule { }
