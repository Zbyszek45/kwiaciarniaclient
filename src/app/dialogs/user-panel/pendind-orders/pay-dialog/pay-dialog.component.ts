import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/core/service/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/core/model/order';

declare let paypal: any;

@Component({
  selector: 'app-pay-dialog',
  templateUrl: './pay-dialog.component.html',
  styleUrls: ['./pay-dialog.component.css']
})
export class PayDialogComponent implements OnInit, AfterViewInit {
  currentOrder: Order;

  constructor(private orderService: OrderService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.currentOrder = this.data.order;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  private loadPaypalScript() {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = "https://www.paypal.com/sdk/js?client-id=CLIENT_ID&disable-funding=credit,card,p24&currency=PLN";
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  ngAfterViewInit(): void {
    this.loadPaypalScript().then(() => {
      var self = this;
      paypal.Buttons({

        style: {
          color: 'blue',
          shape: 'pill',
          label: 'pay',
          height: 40
        },

        createOrder: function () {
          return fetch('http://localhost:8080/api/private/orders/payment/create/' + self.currentOrder.id, {
            method: 'get',
            headers: {
              'content-type': 'text/plain;charset=UTF-8',
              'Authorization': localStorage.getItem("token")
            }
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            return data.id; // Use the same key name for order ID on the client and server
          });
        }
        ,
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.
            return fetch('http://localhost:8080/api/private/orders/payment/approve/' + self.currentOrder.id, {
              method: 'post',
              headers: {
                'Authorization': localStorage.getItem("token")
              }
            }).then(function () {
              location.reload();
              return false;
            });
          }
          )
        }
      }).render('#paypal-button-container');
    })
  }
}
