import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/model/product';
import { CartService } from 'src/app/core/service/cart.service';
import { Bouquet } from 'src/app/core/model/bouquet';
import { element } from 'protractor';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

  delete(index: number) {
    this.cartService.products.splice(index, 1);
    this.cartService.refreshItemsNumber();
  }

  deleteBouquet(index: number) {
    this.cartService.bouquets.splice(index, 1);
    this.cartService.refreshItemsNumber();
  }

  getBouquetDescription(bouquet: Bouquet): string{
    let result: string = "Bukiet składający się z ";
    bouquet.flowers.forEach(element => {
      result += (element.name + ", ");
    });
    return result;
  }

}
