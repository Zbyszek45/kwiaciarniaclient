import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RibbonService } from 'src/app/core/service/ribbon.service';
import { Ribbon } from 'src/app/core/model/ribbon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-ribbon-dialog',
  templateUrl: './add-ribbon-dialog.component.html',
  styleUrls: ['./add-ribbon-dialog.component.css']
})
export class AddRibbonDialogComponent implements OnInit {
  nameNew: string;
  imageUrlNew: string;
  lengthNew: string;
  priceNew: number;
  amountNew: number;

  ribbons: Ribbon[];


  constructor(private ribbonService: RibbonService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddRibbonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.ribbonService.findAllRibbons().subscribe(data => {
      this.ribbons = data;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  addRibbon(): void {
    let newRibbon: Ribbon = {
      id: null,
      name: this.nameNew,
      imageUrl: this.imageUrlNew,
      length: this.lengthNew,
      price: this.priceNew,
      amount: this.amountNew
    }
    this.ribbonService.addRibbon(newRibbon).subscribe(response => {
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
