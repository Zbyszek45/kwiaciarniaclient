import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Giftcard } from '../model/giftcard';

@Injectable({
    providedIn: 'root'
})
export class GiftcardService {
    allGiftcardsUrl: string;
    updateGiftcardUrl: string;
    addGiftcardUrl: string;
    deleteGiftcardUrl: string;

    constructor(private http: HttpClient) {
        this.allGiftcardsUrl = "http://localhost:8080/api/public/giftcards/all"
        this.updateGiftcardUrl = "http://localhost:8080/api/private/giftcards/update/"
        this.addGiftcardUrl = "http://localhost:8080/api/private/giftcards/add"
        this.deleteGiftcardUrl = "http://localhost:8080/api/private/giftcards/delete/"
    }

    public findAllGiftcards(): Observable<Giftcard[]> {
        return this.http.get<Giftcard[]>(this.allGiftcardsUrl);
    }

    public updateGiftcard(giftcardId: string, giftcard: Giftcard): Observable<any> {
        return this.http.put(this.updateGiftcardUrl + giftcardId, giftcard, {responseType: "text"});
    }

    public addGiftcard(giftcard: Giftcard): Observable<any> {
        return this.http.post(this.addGiftcardUrl, giftcard, {responseType: "text"});
    }
    
    public deleteGiftcard(giftcardId: string): Observable<any> {
        return this.http.delete(this.deleteGiftcardUrl + giftcardId, {responseType: "text"});
    }
}
