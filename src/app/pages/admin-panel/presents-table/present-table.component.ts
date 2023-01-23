import { Component, OnInit, ViewChild } from '@angular/core';
import { Present } from 'src/app/core/model/present';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PresentService } from 'src/app/core/service/present.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePresentDialogComponent } from 'src/app/dialogs/admin-panel/present/delete-present-dialog/delete-present-dialog.component';
import { UpdatePresentDialogComponent } from 'src/app/dialogs/admin-panel/present/update-present-dialog/update-present-dialog.component';
import { AddPresentDialogComponent } from 'src/app/dialogs/admin-panel/present/add-present-dialog/add-present-dialog.component';

@Component({
  selector: 'app-present-table',
  templateUrl: './present-table.component.html',
  styleUrls: ['./present-table.component.css']
})
export class PresentTableComponent implements OnInit {

  presents: Present[]
  dataSource = new MatTableDataSource<Present>()
  displayedColumns: string[] = ['id', 'name', 'imageUrl', 'price', 'amount', 'actions']

  constructor(private presentService: PresentService,
    public dialog: MatDialog ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;


  ngOnInit(): void {
    this.presentService.findAllPresents().subscribe(data => {
      this.presents = data;
      this.dataSource.data = this.presents;
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

  addPresent(): void {
    const dialogRef = this.dialog.open(AddPresentDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  updatePresent(id: number, 
    name: string, 
    imageUrl: string, 
    price: number, 
    amount: number): void {
      const dialogRef = this.dialog.open(UpdatePresentDialogComponent, {
        width: '500px',
        data: {id: id, name: name, imageUrl: imageUrl, price: price, amount: amount}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.refresh();
      });
  }

  deletePresent(id: Number): void {
    const dialogRef = this.dialog.open(DeletePresentDialogComponent, {
      width: '500px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  refresh() {
    this.presentService.findAllPresents().subscribe(data => {
      this.presents = data;
      this.dataSource.data = this.presents;
    });
    this.table.renderRows();
  }

}
