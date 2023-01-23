import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bouquet } from '../model/bouquet';

@Injectable({
    providedIn: 'root'
})
export class BouquetService {
    bouquet: Bouquet[];
    baseUrl: string;
    allBouquetsUrl: string;


    constructor(private http: HttpClient) {
        this.baseUrl = "http://localhost:8080/bouquets"
        this.allBouquetsUrl = "/all"

    }

    public findAllBouquets(): Observable<Bouquet[]> {
        return this.http.get<Bouquet[]>(this.baseUrl + this.allBouquetsUrl);
    }
}