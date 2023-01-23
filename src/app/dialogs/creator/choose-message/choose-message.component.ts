import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-choose-message',
  templateUrl: './choose-message.component.html',
  styleUrls: ['./choose-message.component.css']
})
export class ChooseMessageComponent implements OnInit {
  messageNew: string;

  constructor(public dialogRef: MatDialogRef<ChooseMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
    this.messageNew = this.data.message;
  }

  onSubmit() { //empty
  }

  updateMessage(): void {
    this.dialogRef.close(this.messageNew);
  }

}
