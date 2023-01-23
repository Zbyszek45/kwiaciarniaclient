import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryService } from 'src/app/core/service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/core/model/category';
import { UpdateCategoryDialogComponent } from 'src/app/dialogs/admin-panel/category/update-category-dialog/update-category-dialog.component';
import { AddCategoryDialogComponent } from 'src/app/dialogs/admin-panel/category/add-category-dialog/add-category-dialog.component';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {

  categories: Category[]
  dataSource = new MatTableDataSource<Category>()
  displayedColumns: string[] = ['id', 'name', 'imageUrl', 'actions']

  constructor(private categoryService: CategoryService,
    public dialog: MatDialog ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;


  ngOnInit(): void {
    this.categoryService.findAllCategories().subscribe(data => {
      this.categories = data;
      this.dataSource.data = this.categories;
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

  addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  updateCategory(id: number, 
    name: string, 
    imageUrl: string): void {
      const dialogRef = this.dialog.open(UpdateCategoryDialogComponent, {
        width: '500px',
        data: {id: id, name: name, imageUrl: imageUrl}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.refresh();
      });
  }

  refresh() {
    this.categoryService.findAllCategories().subscribe(data => {
      this.categories = data;
      this.dataSource.data = this.categories;
    });
    this.table.renderRows();
  }

}
