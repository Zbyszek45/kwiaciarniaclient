import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-choose-length',
  templateUrl: './choose-length.component.html',
  styleUrls: ['./choose-length.component.css']
})
export class ChooseLengthComponent implements OnInit {
  lengthNew = 'krótka';

  constructor(public dialogRef: MatDialogRef<ChooseLengthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
  }

  onSubmit() { //empty
  }

  updateLength(): void {
    this.dialogRef.close(this.lengthNew);
  }
}
