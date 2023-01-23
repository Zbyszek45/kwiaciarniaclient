import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PresentService } from 'src/app/core/service/present.service';
import { Present } from 'src/app/core/model/present';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-present-dialog',
  templateUrl: './update-present-dialog.component.html',
  styleUrls: ['./update-present-dialog.component.css']
})
export class UpdatePresentDialogComponent implements OnInit {
  idNew: number;
  nameNew: string;
  imageUrlNew: string;
  priceNew: number;
  amountNew: number;

  presents: Present[];

  constructor(private presentService: PresentService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdatePresentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Present) {}

  ngOnInit(): void {
    this.presentService.findAllPresents().subscribe(data => {
      this.presents = data;
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

  updatePresent(): void {
    let newPresent: Present = {
      id: this.idNew,
      name: this.nameNew,
      imageUrl: this.imageUrlNew,
      price: this.priceNew,
      amount: this.amountNew
    }
    this.presentService.updatePresent(JSON.stringify(this.idNew), newPresent).subscribe(response => {
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
