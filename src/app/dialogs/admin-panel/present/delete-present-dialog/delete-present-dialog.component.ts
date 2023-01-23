import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PresentService } from 'src/app/core/service/present.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-present-dialog',
  templateUrl: './delete-present-dialog.component.html',
  styleUrls: ['./delete-present-dialog.component.css']
})
export class DeletePresentDialogComponent implements OnInit {
  idDeleted: number;

  constructor(private presentService: PresentService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeletePresentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.idDeleted = this.data.id;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  deletePresent(): void {
    this.presentService.deletePresent(JSON.stringify(this.idDeleted)).subscribe(response => {
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
