import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './layout/content/content.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreatorComponent } from './pages/creator/creator.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { OrderComponent } from './pages/order/order.component';
import { UserPanelComponent } from './pages/user-panel/user-panel.component';

const modules: Routes = [
    {
        path: '',
        redirectTo: 'home',   
        pathMatch: 'full'
    },
    {
        path: '',
        component: ContentComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'categories',
                component: CategoriesComponent
            },
            {
                path: 'creator',
                component: CreatorComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'products/:id/:type',
                component: ProductsComponent
            },
            {
                canActivate: [AuthGuard],
                path: 'admin-panel',
                component: AdminPanelComponent,
            },
            {
                canActivate: [AuthGuard],
                path: 'user-panel',
                component: UserPanelComponent,
            },
            {
                path: 'cart',
                component: CartComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                canActivate: [AuthGuard],
                path: 'order',
                component: OrderComponent,
            }
        ]
    }]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(modules)
    ]
})
export class AppRoutingModule { }