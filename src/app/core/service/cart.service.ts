import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { Bouquet } from '../model/bouquet';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    products: Product[];
    bouquets: Bouquet[];
    itemsNumber: number;

    constructor(private http: HttpClient) {
       this.products = [];
       this.bouquets = [];
       this.itemsNumber = 0;
    }

    public addToCart(product: Product) {
        let newProduct: Product = {
            id: product.id,
            category: product.category,
            description: product.description,
            imageUrl: product.imageUrl,
            name: product.name,
            price: product.price,
            amount: 1
        }

        this.products.push(newProduct);
        this.itemsNumber = this.products.length + this.bouquets.length
    }

    public addToCartBouquet(bouquet: Bouquet) {
        this.bouquets.push(bouquet);
        this.itemsNumber = this.products.length + this.bouquets.length
        console.log(this.bouquets);
    }

    public getFullPrice(): number {
        let tmp: number = 0;
        this.products.forEach(element => {
            tmp += element.price;
        });
        this.bouquets.forEach(element => {
            tmp += element.price;
        });
        return tmp;
    }

    public refreshItemsNumber() {
        this.itemsNumber = this.products.length + this.bouquets.length
    }

    public clearCart() {
        this.products = [];
       this.bouquets = [];
       this.itemsNumber = 0;
    }
}
