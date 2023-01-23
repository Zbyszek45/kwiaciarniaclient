import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelComponent } from './user-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FinishedOrdersComponent } from './finished-orders/finished-orders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PayDialogModule } from 'src/app/dialogs/user-panel/pendind-orders/pay-dialog/pay-dialog.module';



@NgModule({
  declarations: [UserPanelComponent, FinishedOrdersComponent, PendingOrdersComponent, UserInfoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    PayDialogModule
  ]
})
export class UserPanelModule { }
