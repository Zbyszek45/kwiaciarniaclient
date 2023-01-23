import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/core/model/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/core/model/category';
import { CategoryService } from 'src/app/core/service/category.service';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.css']
})
export class UpdateProductDialogComponent implements OnInit {
  idNew: number;
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
    public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) {}

  ngOnInit(): void {
    this.categoryService.findAllCategories().subscribe(data => {
      this.categories = data;
    });

    this.idNew = this.data.id;
    this.nameNew = this.data.name;
    this.descriptionNew = this.data.description;
    this.categoryNew = this.data.category;
    this.imageUrlNew = this.data.imageUrl;
    this.priceNew = this.data.price;
    this.amountNew = this.data.amount;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  updateProduct(): void {
    let newProduct: Product = {
      id: this.idNew,
      name: this.nameNew,
      category: this.categoryNew,
      description: this.descriptionNew,
      imageUrl: this.imageUrlNew,
      price: this.priceNew,
      amount: this.amountNew
    }
    this.productService.updateProduct(JSON.stringify(this.idNew), newProduct).subscribe(response => {
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
