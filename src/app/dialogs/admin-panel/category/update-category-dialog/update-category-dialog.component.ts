import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/core/service/category.service';
import { Category } from 'src/app/core/model/category';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-category-dialog',
  templateUrl: './update-category-dialog.component.html',
  styleUrls: ['./update-category-dialog.component.css']
})
export class UpdateCategoryDialogComponent implements OnInit {
  idNew: number;
  nameNew: string;
  imageUrlNew: string;

  categories: Category[];

  constructor(private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category) {}

  ngOnInit(): void {
    this.categoryService.findAllCategories().subscribe(data => {
      this.categories = data;
    });

    this.idNew = this.data.id;
    this.nameNew = this.data.name;
    this.imageUrlNew = this.data.imageUrl;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  updateCategory(): void {
    let newCategory: Category = {
      id: this.idNew,
      name: this.nameNew,
      imageUrl: this.imageUrlNew
    }
    this.categoryService.updateCategory(JSON.stringify(this.idNew), newCategory).subscribe(response => {
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
