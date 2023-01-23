import { Component, OnInit, ViewChild } from '@angular/core';
import { Ribbon } from 'src/app/core/model/ribbon';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RibbonService } from 'src/app/core/service/ribbon.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRibbonDialogComponent } from 'src/app/dialogs/admin-panel/ribbon/delete-ribbon-dialog/delete-ribbon-dialog.component';
import { UpdateRibbonDialogComponent } from 'src/app/dialogs/admin-panel/ribbon/update-ribbon-dialog/update-ribbon-dialog.component';
import { AddRibbonDialogComponent } from 'src/app/dialogs/admin-panel/ribbon/add-ribbon-dialog/add-ribbon-dialog.component';

@Component({
  selector: 'app-ribbon-table',
  templateUrl: './ribbon-table.component.html',
  styleUrls: ['./ribbon-table.component.css']
})
export class RibbonTableComponent implements OnInit {

  ribbons: Ribbon[]
  dataSource = new MatTableDataSource<Ribbon>()
  displayedColumns: string[] = ['id', 'name', 'imageUrl', 'length', 'price', 'amount', 'actions']

  constructor(private ribbonService: RibbonService,
    public dialog: MatDialog ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;


  ngOnInit(): void {
    this.ribbonService.findAllRibbons().subscribe(data => {
      this.ribbons = data;
      this.dataSource.data = this.ribbons;
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

  addRibbon(): void {
    const dialogRef = this.dialog.open(AddRibbonDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  updateRibbon(id: number, 
    name: string, 
    imageUrl: string, 
    length: number,
    price: number, 
    amount: number): void {
      const dialogRef = this.dialog.open(UpdateRibbonDialogComponent, {
        width: '500px',
        data: {id: id, name: name, imageUrl: imageUrl, length: length, price: price, amount: amount}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.refresh();
      });
  }

  deleteRibbon(id: Number): void {
    const dialogRef = this.dialog.open(DeleteRibbonDialogComponent, {
      width: '500px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  refresh() {
    this.ribbonService.findAllRibbons().subscribe(data => {
      this.ribbons = data;
      this.dataSource.data = this.ribbons;
    });
    this.table.renderRows();
  }

}
