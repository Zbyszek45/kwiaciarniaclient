import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PresentService } from 'src/app/core/service/present.service';
import { Present } from 'src/app/core/model/present';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-present-dialog',
  templateUrl: './add-present-dialog.component.html',
  styleUrls: ['./add-present-dialog.component.css']
})
export class AddPresentDialogComponent implements OnInit {
  nameNew: string;
  imageUrlNew: string;
  priceNew: number;
  amountNew: number;

  presents: Present[];


  constructor(private presentService: PresentService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddPresentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.presentService.findAllPresents().subscribe(data => {
      this.presents = data;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  addPresent(): void {
    let newPresent: Present = {
      id: null,
      name: this.nameNew,
      imageUrl: this.imageUrlNew,
      price: this.priceNew,
      amount: this.amountNew
    }
    this.presentService.addPresent(newPresent).subscribe(response => {
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
