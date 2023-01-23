import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/service/cart.service';
import { NewOrder } from 'src/app/core/model/new-order';
import { Address } from 'src/app/core/model/address';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/core/service/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: NewOrder = {
    products: null,
    bouquets: null,
    price: null,
    address: {
      id: null,
      city: "Warszawa",
      street: "ul. Warszawska",
      houseNumber: "2",
      zipCode: "34-567"
    }
  };
  addressForm = new FormGroup({
    street: new FormControl(''),
    houseNmb: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(''),
  });

  tmpForm: FormGroup;
  emptyForm: FormGroup;

  addressType: 'own' | 'diffrent' = 'own';

  userAddress: Address = {
    id: null,
    city: "Warszawa",
    street: "ul. Warszawska",
    houseNumber: "2",
    zipCode: "34-567"
  }

  constructor(public cartService: CartService, private _formBuilder: FormBuilder,
    private userService: UserService, private orderService: OrderService, private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.addressForm = this._formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      houseNmb: ['', Validators.required],
      zipCode: ['', Validators.required],
    });

    this.userService.findUserAddress().subscribe(result => {
      this.userAddress = result;
      this.order.address = this.userAddress;
    });
  }

  getDiffrent(): boolean {
    if (this.addressType == "diffrent") {
      return true;
    }
    return false;
  }

  changeFormGroup() {
    if (this.addressType == 'own') {
      this.tmpForm = this.addressForm;
    } else {
      this.tmpForm = this.emptyForm;
    }
  }

  initAddress() {
    if (this.addressType == 'own') {
      this.order.address = this.userAddress;
    } else {
      this.order.address = {
        id: null,
        city: this.addressForm.controls['city'].value,
        street: this.addressForm.controls['street'].value,
        houseNumber: this.addressForm.controls['houseNmb'].value,
        zipCode: this.addressForm.controls['zipCode'].value
      }
    }
  }

  initOrder() {
    this.order.products = [];
    this.order.bouquets = [];

    this.order.products = this.cartService.products;
    this.order.bouquets = this.cartService.bouquets;
    this.order.price = this.cartService.getFullPrice();
    
  }

  finish() {
    this.initOrder();

    //send to server
    this.orderService.addOrder(this.order).subscribe(response => {
      this._snackBar.open(response, 'OK', {duration: 5000});
    });

    this.cartService.clearCart();
    this.router.navigate(['/home']);
  }
}
