import { Component, OnInit } from '@angular/core';
import { Flower } from 'src/app/core/model/flower';
import { Ribbon } from 'src/app/core/model/ribbon';
import { Present } from 'src/app/core/model/present';
import { Giftcard } from 'src/app/core/model/giftcard';
import { FlowerService } from 'src/app/core/service/flower.service';
import { RibbonService } from 'src/app/core/service/ribbon.service';
import { PresentService } from 'src/app/core/service/present.service';
import { GiftcardService } from 'src/app/core/service/giftcard.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ChooseAmountComponent } from 'src/app/dialogs/creator/choose-amount/choose-amount.component';
import { ChooseLengthComponent } from 'src/app/dialogs/creator/choose-length/choose-length.component';
import { ChooseMessageComponent } from 'src/app/dialogs/creator/choose-message/choose-message.component';
import { Bouquet } from 'src/app/core/model/bouquet';
import { CartService } from 'src/app/core/service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface DefaultAmount {
  id: number,
  amount: number;
}

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {
  bouquet: Bouquet = {
    flowers: null,
    presents: null,
    ribbon: null,
    giftcard: null,
    price: null
  };

  flowersAvailable: Flower[];
  flowersChoosen: Flower[] = [];
  defaultFlowerAmounts: DefaultAmount[] = [];

  ribbonAvailable: Ribbon[];
  ribbonChoosen: Ribbon[] = [];

  presentAvailable: Present[];
  presentChoosen: Present[] = [];
  defaultPresentAmounts: DefaultAmount[] = [];

  giftcardAvailable: Giftcard[];
  giftcardChoosen: Giftcard[] = [];

  wholePrice: number = 0;
  indexToChange: number = 3;

  constructor(private flowerService: FlowerService,
    private ribbonService: RibbonService,
    private presentService: PresentService,
    private giftcardService: GiftcardService,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.flowerService.findAllFlowers().subscribe(data => {
      this.flowersAvailable = data;
      this.flowersAvailable.forEach((flower: Flower) => {
        let tmp: DefaultAmount = {
          id: flower.id,
          amount: flower.amount
        };
        this.defaultFlowerAmounts.push(tmp);
      });
    });

    this.ribbonService.findAllRibbons().subscribe(data => {
      this.ribbonAvailable = data;
    });

    this.presentService.findAllPresents().subscribe(data => {
      this.presentAvailable = data;
      this.presentAvailable.forEach((present: Present) => {
        let tmp: DefaultAmount = {
          id: present.id,
          amount: present.amount
        };
        this.defaultPresentAmounts.push(tmp);
      });
    });

    this.giftcardService.findAllGiftcards().subscribe(data => {
      this.giftcardAvailable = data;
    });
  }

  addToCart(): void {
    this.bouquet.flowers = [];
    this.bouquet.presents = [];
    
    this.bouquet.flowers = this.flowersChoosen;
    this.bouquet.presents = this.presentChoosen;

    if (!(this.ribbonChoosen[0] == null)){
      let ribbonTmp: Ribbon = {
        id: this.ribbonChoosen[0].id,
        price: this.ribbonChoosen[0].price,
        imageUrl: this.ribbonChoosen[0].imageUrl,
        length: this.ribbonChoosen[0].length,
        name: this.ribbonChoosen[0].name,
        amount: 1
      };
      this.bouquet.ribbon = ribbonTmp;
    } else{
      this.bouquet.ribbon = this.ribbonChoosen[0];
    }
    
    if (!(this.giftcardChoosen[0] == null)){
      let giftcardTmp: Giftcard = {
        amount: 1,
        id: this.giftcardChoosen[0].id,
        imageUrl: this.giftcardChoosen[0].imageUrl,
        message: this.giftcardChoosen[0].message,
        name: this.giftcardChoosen[0].name,
        price: this.giftcardChoosen[0].price
      };
      this.bouquet.giftcard = giftcardTmp;
    } else {
      this.bouquet.giftcard = this.giftcardChoosen[0];
    }

    this.bouquet.price = this.wholePrice;

    if (this.wholePrice >= 0 && this.bouquet.flowers.length != 0){
      this.cartService.addToCartBouquet(this.bouquet);
      this._snackBar.open("Dodano do koszyka!", "OK", {
        duration: 2000,
      });
    } else {
      this._snackBar.open("Ups! Musisz dodać przynajmniej 1 kwiatek!", "OK", {
        duration: 2000,
      });
    }
  }

  dropFlowerIntoAvailable(event: CdkDragDrop<Flower[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.wholePrice -= this.flowersAvailable[event.currentIndex].price * this.flowersAvailable[event.currentIndex].amount;

      this.setDefaultFlowerAmount(event.container.data[event.currentIndex].id);
    }
  }

  dropFlowerIntoChoosen(event: CdkDragDrop<Flower[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.openChooseFlowersAmount(event.previousContainer.data[event.previousIndex].amount);
      this.indexToChange = event.currentIndex;
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  openChooseFlowersAmount(amount: number): void {
    const dialogRef = this.dialog.open(ChooseAmountComponent, {
      width: '500px',
      data: { amount: amount }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.flowersChoosen[this.indexToChange].amount = result;
      this.wholePrice += this.flowersChoosen[this.indexToChange].price * this.flowersChoosen[this.indexToChange].amount;
    });
  }

  setDefaultFlowerAmount(id: number): void {
    let result: number = 1;
    this.defaultFlowerAmounts.forEach((i: DefaultAmount) => {
      if (i.id == id) {
        result = i.amount;
      }
    });

    this.flowersAvailable.forEach((i: Flower) => {
      if (i.id == id) {
        i.amount = result;
      }
    });
  }

  dropRibbonIntoAvailable(event: CdkDragDrop<Ribbon[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.wholePrice -= this.ribbonAvailable[event.currentIndex].price;
    }
  }

  dropRibbonIntoChoosen(event: CdkDragDrop<Ribbon[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      this.openChooseRibbonLength();
      this.indexToChange = event.currentIndex;
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0);
    }
  }

  openChooseRibbonLength(): void {
    const dialogRef = this.dialog.open(ChooseLengthComponent, {
      width: '500px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ribbonChoosen[this.indexToChange].length = result;
      this.wholePrice += this.ribbonChoosen[this.indexToChange].price
      if (this.ribbonChoosen.length > 1) {
        let ribbonTmp = this.ribbonChoosen.pop();
        this.wholePrice -= ribbonTmp.price;
        this.ribbonAvailable.push(ribbonTmp);
      }
    });
  }

  dropPresentIntoAvailable(event: CdkDragDrop<Present[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.wholePrice -= this.presentAvailable[event.currentIndex].price * this.presentAvailable[event.currentIndex].amount;

      this.setDefaultPresentAmount(event.container.data[event.currentIndex].id);
    }
  }

  dropPresentIntoChoosen(event: CdkDragDrop<Present[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.openChoosePresentAmount(event.previousContainer.data[event.previousIndex].amount);
      this.indexToChange = event.currentIndex;
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  openChoosePresentAmount(amount: number): void {
    const dialogRef = this.dialog.open(ChooseAmountComponent, {
      width: '500px',
      data: { amount: amount }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.presentChoosen[this.indexToChange].amount = result;
      this.wholePrice += this.presentChoosen[this.indexToChange].price * this.presentChoosen[this.indexToChange].amount;
    });
  }

  setDefaultPresentAmount(id: number): void {
    let result: number = 1;
    this.defaultPresentAmounts.forEach((i: DefaultAmount) => {
      if (i.id == id) {
        result = i.amount;
      }
    });

    this.presentAvailable.forEach((i: Present) => {
      if (i.id == id) {
        i.amount = result;
      }
    });
  }

  dropGiftcardIntoAvailable(event: CdkDragDrop<Giftcard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.wholePrice -= this.giftcardAvailable[event.currentIndex].price;
    }
  }

  dropGiftcardIntoChoosen(event: CdkDragDrop<Giftcard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.openChooseGiftcardMessage(event.previousContainer.data[event.previousIndex].message);
      this.indexToChange = event.currentIndex;
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0);
    }
  }      

  openChooseGiftcardMessage(message: string): void {
    const dialogRef = this.dialog.open(ChooseMessageComponent, {
      width: '500px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.giftcardChoosen[this.indexToChange].message = result;
      this.wholePrice += this.giftcardChoosen[this.indexToChange].price
      if (this.giftcardChoosen.length > 1) {
        let giftcardTmp = this.giftcardChoosen.pop();
        this.wholePrice -= giftcardTmp.price;
        this.giftcardAvailable.push(giftcardTmp);
      }
    });
  }
}
