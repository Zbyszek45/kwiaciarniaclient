import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    allCategoriesUrl: string;
    updateCategoryUrl: string;
    addCategoryUrl: string;

    constructor(private http: HttpClient) {
        this.allCategoriesUrl = "http://localhost:8080/api/public/categories";
        this.updateCategoryUrl = "http://localhost:8080/api/private/categories/update/";
        this.addCategoryUrl = "http://localhost:8080/api/private/categories/add";
    }

    public findAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.allCategoriesUrl);
    }

    public updateCategory(categoryId: string, category: Category): Observable<any> {
        return this.http.put(this.updateCategoryUrl + categoryId, category, {responseType: "text"});
    }

    public addCategory(category: Category): Observable<any> {
        return this.http.post(this.addCategoryUrl, category, {responseType: "text"});
    }
}
