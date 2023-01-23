import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Present } from '../model/present';

@Injectable({
    providedIn: 'root'
})
export class PresentService {
    allPresentsUrl: string;
    updatePresentUrl: string;
    addPresentUrl: string;
    deletePresentUrl: string;

    constructor(private http: HttpClient) {
        this.allPresentsUrl = "http://localhost:8080/api/public/presents/all"
        this.updatePresentUrl = "http://localhost:8080/api/private/presents/update/"
        this.addPresentUrl = "http://localhost:8080/api/private/presents/add"
        this.deletePresentUrl = "http://localhost:8080/api/private/presents/delete/"
    }

    public findAllPresents(): Observable<Present[]> {
        return this.http.get<Present[]>(this.allPresentsUrl);
    }

    public updatePresent(presentId: string, present: Present): Observable<any> {
        return this.http.put(this.updatePresentUrl + presentId, present, {responseType: "text"});
    }

    public addPresent(present: Present): Observable<any> {
        return this.http.post(this.addPresentUrl, present, {responseType: "text"});
    }
    
    public deletePresent(presentId: string): Observable<any> {
        return this.http.delete(this.deletePresentUrl + presentId, {responseType: "text"});
    }
}
