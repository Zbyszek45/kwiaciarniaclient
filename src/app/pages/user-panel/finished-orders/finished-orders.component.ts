import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/model/order';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-finished-orders',
  templateUrl: './finished-orders.component.html',
  styleUrls: ['./finished-orders.component.css']
})
export class FinishedOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.findFinishedUserOrders().subscribe(data => {
      this.orders = data;
    })
  }

}
