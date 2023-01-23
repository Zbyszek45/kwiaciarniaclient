import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flower } from '../model/flower';

@Injectable({
    providedIn: 'root'
})
export class FlowerService {
    allFlowersUrl: string;
    updateFlowerUrl: string;
    addFlowerUrl: string;
    deleteFlowerUrl: string;

    constructor(private http: HttpClient) {
        this.allFlowersUrl = "http://localhost:8080/api/public/flowers/all";
        this.updateFlowerUrl = "http://localhost:8080/api/private/flowers/update/"
        this.addFlowerUrl = "http://localhost:8080/api/private/flowers/add"
        this.deleteFlowerUrl = "http://localhost:8080/api/private/flowers/delete/"
    }

    public findAllFlowers(): Observable<Flower[]> {
        return this.http.get<Flower[]>(this.allFlowersUrl);
    }

    public updateFlower(flowerId: string, flower: Flower): Observable<any> {
        return this.http.put(this.updateFlowerUrl + flowerId, flower, {responseType: "text"});
    }

    public addFlower(flower: Flower): Observable<any> {
        return this.http.post(this.addFlowerUrl, flower, {responseType: "text"});
    }
    
    public deleteFlower(flowerId: string): Observable<any> {
        return this.http.delete(this.deleteFlowerUrl + flowerId, {responseType: "text"});
    }
}
