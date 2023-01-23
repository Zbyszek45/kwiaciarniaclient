import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    allProductsByCategoryUrl: string;
    allProductsUrl: string;
    categoriesUrl: string;
    deleteProductUrl: string;
    addProductUrl: string;
    updateProductUrl: string;
    recommendedUrl: string;

    constructor(private http: HttpClient) {
        this.allProductsByCategoryUrl = "http://localhost:8080/api/public/products/categories/";
        this.allProductsUrl = "http://localhost:8080/api/private/products/all"
        this.deleteProductUrl = "http://localhost:8080/api/private/products/delete/"
        this.addProductUrl = "http://localhost:8080/api/private/products/add"
        this.updateProductUrl = "http://localhost:8080/api/private/products/update/";
        this.recommendedUrl = "http://localhost:8080/api/public/products/recommended"
    }
    

    public findAllProductsByCategory(categoryId: string): Observable<Product[]> {
        return this.http.get<Product[]>(this.allProductsByCategoryUrl + categoryId);
    }

    public findAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.allProductsUrl);
    }

    public deleteProduct(productId: string): Observable<any> {
        return this.http.delete(this.deleteProductUrl + productId, {responseType: "text"});
    }

    public addProduct(product: Product): Observable<any> {
        return this.http.post(this.addProductUrl, product, {responseType: "text"});
    }

    public updateProduct(productId: string, product: Product): Observable<any> {
        return this.http.put(this.updateProductUrl + productId, product, {responseType: "text"});
    }

    public findRecommendedProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.recommendedUrl);
    }
    
}
