import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/core/model/order';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit {
  orders: Order[];
  dataSource = new MatTableDataSource<Order>();
  displayedColumns: string[] = ['id', 'price', 'date', 'status', 'address', 'user', 'actions'];

  constructor(private orderService: OrderService, 
    public dialog: MatDialog) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.orderService.findAllOrders().subscribe(data => {
      this.orders = data;
      this.dataSource.data = this.orders;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateOrder(id: number) {
    this.orderService.updateOrder(id).subscribe(response => {
      console.log(response);
    });

    this.refresh();
  }

  refresh() {
    this.orderService.findAllOrders().subscribe(data => {
      this.orders = data;
      this.dataSource.data = this.orders;
    });
    this.table.renderRows();
  }

  isPaid(status: string) {
    if ( status === "ZAPŁACONE") {
      return false;
    }
    return true;
  }

}
