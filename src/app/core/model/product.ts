import { Category } from './category';

export class Product {
    id: number;
    name: string;
    category: Category;
    description: string;
    imageUrl: string;
    price: number;
    amount: number;
}