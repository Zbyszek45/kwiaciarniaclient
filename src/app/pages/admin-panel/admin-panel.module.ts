import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { UserTableComponent } from './user-table/user-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { CategoryTableComponent } from './categories-table/category-table.component';
import { FlowerTableComponent } from './flowers-table/flower-table.component';
import { GiftcardTableComponent } from './giftcards-table/giftcard-table.component';
import { PresentTableComponent } from './presents-table/present-table.component';
import { RibbonTableComponent } from './ribbons-table/ribbon-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AddProductDialogModule } from 'src/app/dialogs/admin-panel/product/add-product-dialog/add-product-dialog.module';
import { UpdateProductDialogModule } from 'src/app/dialogs/admin-panel/product/update-product-dialog/update-product-dialog.module';
import { DeleteProductDialogModule } from 'src/app/dialogs/admin-panel/product/delete-product-dialog/delete-product-dialog.module';
import { AddFlowerDialogModule } from 'src/app/dialogs/admin-panel/flower/add-flower-dialog/add-flower-dialog.module';
import { UpdateFlowerDialogModule } from 'src/app/dialogs/admin-panel/flower/update-flower-dialog/update-flower-dialog.module';
import { DeleteFlowerDialogModule } from 'src/app/dialogs/admin-panel/flower/delete-flower-dialog/delete-flower-dialog.module';
import { AddGiftcardDialogModule } from 'src/app/dialogs/admin-panel/giftcard/add-giftcard-dialog/add-giftcard-dialog.module';
import { UpdateGiftcardDialogModule } from 'src/app/dialogs/admin-panel/giftcard/update-giftcard-dialog/update-giftcard-dialog.module';
import { DeleteGiftcardDialogModule } from 'src/app/dialogs/admin-panel/giftcard/delete-giftcard-dialog/delete-giftcard-dialog.module';
import { AddPresentDialogModule } from 'src/app/dialogs/admin-panel/present/add-present-dialog/add-present-dialog.module';
import { UpdatePresentDialogModule } from 'src/app/dialogs/admin-panel/present/update-present-dialog/update-present-dialog.module';
import { DeletePresentDialogModule } from 'src/app/dialogs/admin-panel/present/delete-present-dialog/delete-present-dialog.module';
import { AddRibbonDialogModule } from 'src/app/dialogs/admin-panel/ribbon/add-ribbon-dialog/add-ribbon-dialog.module';
import { UpdateRibbonDialogModule } from 'src/app/dialogs/admin-panel/ribbon/update-ribbon-dialog/update-ribbon-dialog.module';
import { DeleteRibbonDialogModule } from 'src/app/dialogs/admin-panel/ribbon/delete-ribbon-dialog/delete-ribbon-dialog.module';
import { AddCategoryDialogModule } from 'src/app/dialogs/admin-panel/category/add-category-dialog/add-category-dialog.module';
import { UpdateCategoryDialogModule } from 'src/app/dialogs/admin-panel/category/update-category-dialog/update-category-dialog.module';
import {MatTabsModule} from '@angular/material/tabs';
import { OrdersTableComponent } from './orders-table/orders-table.component'; 


@NgModule({
  declarations: [
    AdminPanelComponent,
    UserTableComponent,
    ProductsTableComponent,
    CategoryTableComponent,
    FlowerTableComponent,
    GiftcardTableComponent,
    PresentTableComponent,
    RibbonTableComponent,
    OrdersTableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    AddProductDialogModule,
    UpdateProductDialogModule,
    DeleteProductDialogModule,
    AddFlowerDialogModule,
    UpdateFlowerDialogModule,
    DeleteFlowerDialogModule,
    AddGiftcardDialogModule,
    UpdateGiftcardDialogModule,
    DeleteGiftcardDialogModule,
    AddPresentDialogModule,
    UpdatePresentDialogModule,
    DeletePresentDialogModule,
    AddRibbonDialogModule,
    UpdateRibbonDialogModule,
    DeleteRibbonDialogModule,
    AddCategoryDialogModule,
    UpdateCategoryDialogModule
  ]
})
export class AdminPanelModule { }
