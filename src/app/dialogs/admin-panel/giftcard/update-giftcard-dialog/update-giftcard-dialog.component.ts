import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiftcardService } from 'src/app/core/service/giftcard.service';
import { Giftcard } from 'src/app/core/model/giftcard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-giftcard-dialog',
  templateUrl: './update-giftcard-dialog.component.html',
  styleUrls: ['./update-giftcard-dialog.component.css']
})
export class UpdateGiftcardDialogComponent implements OnInit {
  idNew: number;
  nameNew: string;
  imageUrlNew: string;
  messageNew: string;
  priceNew: number;
  amountNew: number;

  giftcards: Giftcard[];

  constructor(private giftcardService: GiftcardService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateGiftcardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Giftcard) {}

  ngOnInit(): void {
    this.giftcardService.findAllGiftcards().subscribe(data => {
      this.giftcards = data;
    });

    this.idNew = this.data.id;
    this.nameNew = this.data.name;
    this.imageUrlNew = this.data.imageUrl;
    this.messageNew = this.data.message;
    this.priceNew = this.data.price;
    this.amountNew = this.data.amount;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  updateGiftcard(): void {
    let newGiftcard: Giftcard = {
      id: this.idNew,
      name: this.nameNew,
      imageUrl: this.imageUrlNew,
      message: this.messageNew,
      price: this.priceNew,
      amount: this.amountNew
    }
    this.giftcardService.updateGiftcard(JSON.stringify(this.idNew), newGiftcard).subscribe(response => {
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
