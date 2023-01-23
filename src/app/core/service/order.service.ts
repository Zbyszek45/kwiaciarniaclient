import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { NewOrder } from '../model/new-order';
import { Order } from '../model/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    addOrderUrl: string;
    getAllOrdersUrl: string;
    updateOrderUrl: string;
    newUserOrdersUrl: string;
    finishedUserOrdersUrl: string;

    constructor(private http: HttpClient) {
        this.addOrderUrl = "http://localhost:8080/api/private/orders/add";
        this.getAllOrdersUrl = "http://localhost:8080/api/private/orders/all";
        this.updateOrderUrl = "http://localhost:8080/api/private/orders/update/";
        this.newUserOrdersUrl = "http://localhost:8080/api/private/orders/new/user";
        this.finishedUserOrdersUrl = "http://localhost:8080/api/private/orders/pending/user";
    }

    public addOrder(order: NewOrder): Observable<any> {
        return this.http.post(this.addOrderUrl, order, {responseType: "text"});
    }

    public findAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.getAllOrdersUrl);
    }

    public updateOrder(id: number): Observable<any> {
        return this.http.put<Order[]>(this.updateOrderUrl + id, {});
    }

    public findNewUserOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.newUserOrdersUrl);
    }

    public findFinishedUserOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.finishedUserOrdersUrl);
    }
}