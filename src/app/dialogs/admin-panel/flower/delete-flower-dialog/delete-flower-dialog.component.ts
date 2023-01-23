import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlowerService } from 'src/app/core/service/flower.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-flower-dialog',
  templateUrl: './delete-flower-dialog.component.html',
  styleUrls: ['./delete-flower-dialog.component.css']
})
export class DeleteFlowerDialogComponent implements OnInit {
  idDeleted: number;

  constructor(private flowerService: FlowerService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteFlowerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.idDeleted = this.data.id;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  deleteFlower(): void {
    this.flowerService.deleteFlower(JSON.stringify(this.idDeleted)).subscribe(response => {
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
