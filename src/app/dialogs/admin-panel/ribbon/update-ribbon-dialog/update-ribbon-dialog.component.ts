import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RibbonService } from 'src/app/core/service/ribbon.service';
import { Ribbon } from 'src/app/core/model/ribbon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-ribbon-dialog',
  templateUrl: './update-ribbon-dialog.component.html',
  styleUrls: ['./update-ribbon-dialog.component.css']
})
export class UpdateRibbonDialogComponent implements OnInit {
  idNew: number;
  nameNew: string;
  imageUrlNew: string;
  lengthNew: string;
  priceNew: number;
  amountNew: number;

  ribbons: Ribbon[];

  constructor(private ribbonService: RibbonService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateRibbonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ribbon) {}

  ngOnInit(): void {
    this.ribbonService.findAllRibbons().subscribe(data => {
      this.ribbons = data;
    });

    this.idNew = this.data.id;
    this.nameNew = this.data.name;
    this.imageUrlNew = this.data.imageUrl;
    this.lengthNew = this.data.length;
    this.priceNew = this.data.price;
    this.amountNew = this.data.amount;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  updateRibbon(): void {
    let newRibbon: Ribbon = {
      id: this.idNew,
      name: this.nameNew,
      imageUrl: this.imageUrlNew,
      length: this.lengthNew,
      price: this.priceNew,
      amount: this.amountNew
    }
    this.ribbonService.updateRibbon(JSON.stringify(this.idNew), newRibbon).subscribe(response => {
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
