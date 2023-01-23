import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RibbonService } from 'src/app/core/service/ribbon.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-ribbon-dialog',
  templateUrl: './delete-ribbon-dialog.component.html',
  styleUrls: ['./delete-ribbon-dialog.component.css']
})
export class DeleteRibbonDialogComponent implements OnInit {
  idDeleted: number;

  constructor(private ribbonService: RibbonService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteRibbonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.idDeleted = this.data.id;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  deleteRibbon(): void {
    this.ribbonService.deleteRibbon(JSON.stringify(this.idDeleted)).subscribe(response => {
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
