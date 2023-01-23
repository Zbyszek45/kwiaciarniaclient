import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/core/service/category.service';
import { Category } from 'src/app/core/model/category';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent implements OnInit {
  nameNew: string;
  imageUrlNew: string;

  categories: Category[];


  constructor(private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.categoryService.findAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  addCategory(): void {
    let newCategory: Category = {
      id: null,
      name: this.nameNew,
      imageUrl: this.imageUrlNew
    }
    this.categoryService.addCategory(newCategory).subscribe(response => {
      this.openSnackBar(response);
    });
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }
}
