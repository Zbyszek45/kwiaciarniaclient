import { Component, OnInit, ViewChild } from '@angular/core';
import { Flower } from 'src/app/core/model/flower';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FlowerService } from 'src/app/core/service/flower.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFlowerDialogComponent } from 'src/app/dialogs/admin-panel/flower/delete-flower-dialog/delete-flower-dialog.component';
import { UpdateFlowerDialogComponent } from 'src/app/dialogs/admin-panel/flower/update-flower-dialog/update-flower-dialog.component';
import { AddFlowerDialogComponent } from 'src/app/dialogs/admin-panel/flower/add-flower-dialog/add-flower-dialog.component';

@Component({
  selector: 'app-flower-table',
  templateUrl: './flower-table.component.html',
  styleUrls: ['./flower-table.component.css']
})
export class FlowerTableComponent implements OnInit {

  flowers: Flower[]
  dataSource = new MatTableDataSource<Flower>()
  displayedColumns: string[] = ['id', 'name', 'imageUrl', 'price', 'amount', 'actions']

  constructor(private flowerService: FlowerService,
    public dialog: MatDialog ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;


  ngOnInit(): void {
    this.flowerService.findAllFlowers().subscribe(data => {
      this.flowers = data;
      this.dataSource.data = this.flowers;
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

  addFlower(): void {
    const dialogRef = this.dialog.open(AddFlowerDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  updateFlower(id: number, 
    name: string, 
    imageUrl: string, 
    price: number, 
    amount: number): void {
      const dialogRef = this.dialog.open(UpdateFlowerDialogComponent, {
        width: '500px',
        data: {id: id, name: name, imageUrl: imageUrl, price: price, amount: amount}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.refresh();
      });
  }

  deleteFlower(id: Number): void {
    const dialogRef = this.dialog.open(DeleteFlowerDialogComponent, {
      width: '500px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  refresh() {
    this.flowerService.findAllFlowers().subscribe(data => {
      this.flowers = data;
      this.dataSource.data = this.flowers;
    });
    this.table.renderRows();
  }

}
