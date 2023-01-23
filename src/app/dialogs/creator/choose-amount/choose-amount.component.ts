import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-choose-amount',
  templateUrl: './choose-amount.component.html',
  styleUrls: ['./choose-amount.component.css']
})
export class ChooseAmountComponent implements OnInit {
  amountNew: number = 1;
  amountMax: number;


  constructor(public dialogRef: MatDialogRef<ChooseAmountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
    this.amountMax = this.data.amount;
  }

  onSubmit() { //empty
  }

  updateAmount(): void {
    this.dialogRef.close(this.amountNew);
  }

  onKey(event: any) { // without type info
    if (this.amountNew > this.amountMax) {
      this.amountNew = this.amountMax
    }

    if (this.amountNew < 1 && this.amountNew != null) {
      this.amountNew = 1;
    }
  }
}
