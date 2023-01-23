import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiftcardService } from 'src/app/core/service/giftcard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-giftcard-dialog',
  templateUrl: './delete-giftcard-dialog.component.html',
  styleUrls: ['./delete-giftcard-dialog.component.css']
})
export class DeleteGiftcardDialogComponent implements OnInit {
  idDeleted: number;

  constructor(private giftcardService: GiftcardService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteGiftcardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.idDeleted = this.data.id;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  deleteGiftcard(): void {
    this.giftcardService.deleteGiftcard(JSON.stringify(this.idDeleted)).subscribe(response => {
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
