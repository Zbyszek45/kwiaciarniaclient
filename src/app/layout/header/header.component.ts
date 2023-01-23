import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { CartService } from 'src/app/core/service/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(public cartService: CartService, private auth: AuthService) { }

    ngOnInit(): void {
    }

    public isLoggedIn() {
        return this.auth.isLoggedIn();
    }

    public logout() {
        return this.auth.logout();
    }

    public isAdmin() {
        return this.auth.isAdmin();
    }
}
