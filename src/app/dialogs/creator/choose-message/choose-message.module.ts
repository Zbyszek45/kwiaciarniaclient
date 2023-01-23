import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseMessageComponent } from './choose-message.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule }   from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ChooseMessageComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  entryComponents: [
    ChooseMessageComponent
  ]
})
export class ChooseMessageModule { }
