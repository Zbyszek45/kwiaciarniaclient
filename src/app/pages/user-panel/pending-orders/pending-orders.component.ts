import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/model/order';
import { OrderService } from 'src/app/core/service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { PayDialogComponent } from 'src/app/dialogs/user-panel/pendind-orders/pay-dialog/pay-dialog.component';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.orderService.findNewUserOrders().subscribe(data => {
      this.orders = data;
    })
  }

  pay(order: Order) {
    const dialogRef = this.dialog.open(PayDialogComponent, {
      width: '500px',
      data: {order: order}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
    
  }

}
