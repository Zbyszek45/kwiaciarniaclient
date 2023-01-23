import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/core/model/product';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from 'src/app/dialogs/admin-panel/product/add-product-dialog/add-product-dialog.component';
import { UpdateProductDialogComponent } from 'src/app/dialogs/admin-panel/product/update-product-dialog/update-product-dialog.component';
import { DeleteProductDialogComponent } from 'src/app/dialogs/admin-panel/product/delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  products: Product[];
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['id', 'name', 'category', 'description', 'imageUrl', 'price', 'amount', 'actions'];

  constructor(private productService: ProductService, 
    public dialog: MatDialog) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.productService.findAllProducts().subscribe(data => {
      this.products = data;
      this.dataSource.data = this.products;
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

  addProduct(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  updateProduct(id: number, 
    name: string, 
    category: string, 
    description: string, 
    imageUrl: string, 
    price: number, 
    amount: number): void {
      const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
        width: '500px',
        data: {id: id, name: name, category: category, description: description, imageUrl: imageUrl, price: price, amount: amount}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.refresh();
      });
  }

  deleteProduct(id: Number): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '500px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  refresh() {
    this.productService.findAllProducts().subscribe(data => {
      this.products = data;
      this.dataSource.data = this.products;
    });
    this.table.renderRows();
  }

}
