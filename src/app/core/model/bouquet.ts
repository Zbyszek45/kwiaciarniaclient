import { Flower } from './flower';
import { Present } from './present';
import { Ribbon } from './ribbon';
import { Giftcard } from './giftcard';

export class Bouquet {
    flowers: Flower[];
    presents: Present[];
    ribbon: Ribbon;
    giftcard: Giftcard;
    price: number;
}