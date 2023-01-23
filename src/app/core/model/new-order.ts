import { Product } from './product';
import { Bouquet } from './bouquet';
import { Address } from './address';


export class NewOrder {
    products: Product[];
    bouquets: Bouquet[];
    price: number;
    address: Address;
}