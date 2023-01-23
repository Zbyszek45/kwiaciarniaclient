import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/core/model/product';
import { CartService } from 'src/app/core/service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categoryId: string;
  products: Product[];

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private cartService: CartService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.categoryId = params.get('id');
  });

  this.productService.findAllProductsByCategory(this.categoryId).subscribe(data => { //validation
    this.products = data;
  });
  }

  addToCart(newProduct: Product) {
    if (newProduct.amount <= 0){
      this._snackBar.open("Nie ma już bukietu :(", "OK", {
      duration: 2000,
    });
    } else {
      newProduct.amount--;
      this._snackBar.open("Dodano do koszyka!", "OK", {
        duration: 2000,
      });
      this.cartService.addToCart(newProduct);

    }
  }
}
