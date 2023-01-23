import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorComponent } from './creator.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChooseAmountModule } from '../../dialogs/creator/choose-amount/choose-amount.module';
import { ChooseLengthModule } from '../../dialogs/creator/choose-length/choose-length.module';
import { ChooseMessageModule } from '../../dialogs/creator/choose-message/choose-message.module';

@NgModule({
  declarations: [CreatorComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatBadgeModule,
    MatDialogModule,
    MatButtonModule,
    ChooseAmountModule,
    ChooseLengthModule,
    ChooseMessageModule
  ]
})
export class CreatorModule { }
