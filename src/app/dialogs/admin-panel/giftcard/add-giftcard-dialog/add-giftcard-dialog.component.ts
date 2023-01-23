import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiftcardService } from 'src/app/core/service/giftcard.service';
import { Giftcard } from 'src/app/core/model/giftcard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-giftcard-dialog',
  templateUrl: './add-giftcard-dialog.component.html',
  styleUrls: ['./add-giftcard-dialog.component.css']
})
export class AddGiftcardDialogComponent implements OnInit {
  nameNew: string;
  imageUrlNew: string;
  messageNew: string;
  priceNew: number;
  amountNew: number;

  giftcards: Giftcard[];


  constructor(private giftcardService: GiftcardService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddGiftcardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.giftcardService.findAllGiftcards().subscribe(data => {
      this.giftcards = data;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  addGiftcard(): void {
    let newGiftcard: Giftcard = {
      id: null,
      name: this.nameNew,
      imageUrl: this.imageUrlNew,
      message: this.messageNew,
      price: this.priceNew,
      amount: this.amountNew
    }
    this.giftcardService.addGiftcard(newGiftcard).subscribe(response => {
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
