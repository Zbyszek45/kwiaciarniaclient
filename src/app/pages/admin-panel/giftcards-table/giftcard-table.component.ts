import { Component, OnInit, ViewChild } from '@angular/core';
import { Giftcard } from 'src/app/core/model/giftcard';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GiftcardService } from 'src/app/core/service/giftcard.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteGiftcardDialogComponent } from 'src/app/dialogs/admin-panel/giftcard/delete-giftcard-dialog/delete-giftcard-dialog.component';
import { UpdateGiftcardDialogComponent } from 'src/app/dialogs/admin-panel/giftcard/update-giftcard-dialog/update-giftcard-dialog.component';
import { AddGiftcardDialogComponent } from 'src/app/dialogs/admin-panel/giftcard/add-giftcard-dialog/add-giftcard-dialog.component';

@Component({
  selector: 'app-giftcard-table',
  templateUrl: './giftcard-table.component.html',
  styleUrls: ['./giftcard-table.component.css']
})
export class GiftcardTableComponent implements OnInit {

  giftcards: Giftcard[]
  dataSource = new MatTableDataSource<Giftcard>()
  displayedColumns: string[] = ['id', 'name', 'imageUrl', 'message', 'price', 'amount', 'actions']

  constructor(private giftcardService: GiftcardService,
    public dialog: MatDialog ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;


  ngOnInit(): void {
    this.giftcardService.findAllGiftcards().subscribe(data => {
      this.giftcards = data;
      this.dataSource.data = this.giftcards;
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

  addGiftcard(): void {
    const dialogRef = this.dialog.open(AddGiftcardDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  updateGiftcard(id: number, 
    name: string, 
    imageUrl: string, 
    price: number, 
    amount: number): void {
      const dialogRef = this.dialog.open(UpdateGiftcardDialogComponent, {
        width: '500px',
        data: {id: id, name: name, imageUrl: imageUrl, price: price, amount: amount}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.refresh();
      });
  }

  deleteGiftcard(id: Number): void {
    const dialogRef = this.dialog.open(DeleteGiftcardDialogComponent, {
      width: '500px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  refresh() {
    this.giftcardService.findAllGiftcards().subscribe(data => {
      this.giftcards = data;
      this.dataSource.data = this.giftcards;
    });
    this.table.renderRows();
  }

}
