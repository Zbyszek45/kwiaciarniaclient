import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlowerService } from 'src/app/core/service/flower.service';
import { Flower } from 'src/app/core/model/flower';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-flower-dialog',
  templateUrl: './update-flower-dialog.component.html',
  styleUrls: ['./update-flower-dialog.component.css']
})
export class UpdateFlowerDialogComponent implements OnInit {
  idNew: number;
  nameNew: string;
  imageUrlNew: string;
  priceNew: number;
  amountNew: number;

  flowers: Flower[];

  constructor(private flowerService: FlowerService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateFlowerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Flower) {}

  ngOnInit(): void {
    this.flowerService.findAllFlowers().subscribe(data => {
      this.flowers = data;
    });

    this.idNew = this.data.id;
    this.nameNew = this.data.name;
    this.imageUrlNew = this.data.imageUrl;
    this.priceNew = this.data.price;
    this.amountNew = this.data.amount;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  updateFlower(): void {
    let newFlower: Flower = {
      id: this.idNew,
      name: this.nameNew,
      imageUrl: this.imageUrlNew,
      price: this.priceNew,
      amount: this.amountNew
    }
    this.flowerService.updateFlower(JSON.stringify(this.idNew), newFlower).subscribe(response => {
      this.openSnackBar(response);
    });
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }

}
