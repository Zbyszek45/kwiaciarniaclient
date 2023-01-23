import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/core/pipe/pipes-module.module';

@NgModule({
    declarations: [CategoriesComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        PipesModule
    ]
})
export class CategoriesModule { }
