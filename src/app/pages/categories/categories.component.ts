import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/model/category';
import { CategoryService } from 'src/app/core/service/category.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    categories: Category[];

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.categoryService.findAllCategories().subscribe(data => {
            this.categories = data;
        });
    }

}
