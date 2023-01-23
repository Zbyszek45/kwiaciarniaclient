import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './/content.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { HomeModule } from 'src/app/pages/home/home.module';
import { ContactModule } from 'src/app/pages/contact/contact.module';
import { CategoriesModule } from 'src/app/pages/categories/categories.module';
import { CreatorModule } from 'src/app/pages/creator/creator.module';
import { ProductsModule } from 'src/app/pages/products/products.module';
import { AdminPanelModule } from 'src/app/pages/admin-panel/admin-panel.module';
import { CartModule } from 'src/app/pages/cart/cart.module';
import { MatBadgeModule } from '@angular/material/badge'; 
import { LoginModule } from 'src/app/pages/login/login.module';
import { OrderModule } from 'src/app/pages/order/order.module';
import { UserPanelModule } from 'src/app/pages/user-panel/user-panel.module';



@NgModule({
  declarations: [
    ContentComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    HomeModule,
    CategoriesModule,
    CreatorModule,
    ContactModule,
    ProductsModule,
    AdminPanelModule,
    CartModule,
    MatBadgeModule,
    LoginModule,
    OrderModule,
    UserPanelModule
  ]
})
export class ContentModule { }
