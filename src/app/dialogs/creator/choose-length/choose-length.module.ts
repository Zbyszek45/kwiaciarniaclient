import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseLengthComponent } from './choose-length.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule }   from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ChooseLengthComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  entryComponents: [
    ChooseLengthComponent
  ]
})
export class ChooseLengthModule { }
