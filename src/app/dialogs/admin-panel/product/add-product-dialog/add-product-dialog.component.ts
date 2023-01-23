import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/core/model/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/core/model/category';
import { CategoryService } from 'src/app/core/service/category.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
  nameNew: string;
  descriptionNew: string;
  categoryNew: Category;
  imageUrlNew: string;
  priceNew: number;
  amountNew: number;

  categories: Category[];


  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
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

  addProduct(): void {
    let newProduct: Product = {
      id: null,
      name: this.nameNew,
      category: this.categoryNew,
      description: this.descriptionNew,
      imageUrl: this.imageUrlNew,
      price: this.priceNew,
      amount: this.amountNew
    }
    this.productService.addProduct(newProduct).subscribe(response => {
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
