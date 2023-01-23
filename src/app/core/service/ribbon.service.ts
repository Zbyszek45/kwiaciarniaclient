import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ribbon } from '../model/ribbon';

@Injectable({
    providedIn: 'root'
})
export class RibbonService {
    allRibbonsUrl: string;
    updateRibbonUrl: string;
    addRibbonUrl: string;
    deleteRibbonUrl: string;

    constructor(private http: HttpClient) {
        this.allRibbonsUrl = "http://localhost:8080/api/public/ribbons/all"
        this.updateRibbonUrl = "http://localhost:8080/api/private/ribbons/update/"
        this.addRibbonUrl = "http://localhost:8080/api/private/ribbons/add"
        this.deleteRibbonUrl = "http://localhost:8080/api/private/ribbons/delete/"

    }

    public findAllRibbons(): Observable<Ribbon[]> {
        return this.http.get<Ribbon[]>(this.allRibbonsUrl);
    }

    public updateRibbon(ribbonId: string, ribbon: Ribbon): Observable<any> {
        return this.http.put(this.updateRibbonUrl + ribbonId, ribbon, {responseType: "text"});
    }

    public addRibbon(ribbon: Ribbon): Observable<any> {
        return this.http.post(this.addRibbonUrl, ribbon, {responseType: "text"});
    }
    
    public deleteRibbon(ribbonId: string): Observable<any> {
        return this.http.delete(this.deleteRibbonUrl + ribbonId, {responseType: "text"});
    }
}
