import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlowerService } from 'src/app/core/service/flower.service';
import { Flower } from 'src/app/core/model/flower';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-flower-dialog',
  templateUrl: './add-flower-dialog.component.html',
  styleUrls: ['./add-flower-dialog.component.css']
})
export class AddFlowerDialogComponent implements OnInit {
  nameNew: string;
  imageUrlNew: string;
  priceNew: number;
  amountNew: number;

  flowers: Flower[];


  constructor(private flowerService: FlowerService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddFlowerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.flowerService.findAllFlowers().subscribe(data => {
      this.flowers = data;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() { //empty
  }

  addFlower(): void {
    let newFlower: Flower = {
      id: null,
      name: this.nameNew,
      imageUrl: this.imageUrlNew,
      price: this.priceNew,
      amount: this.amountNew
    }
    this.flowerService.addFlower(newFlower).subscribe(response => {
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
