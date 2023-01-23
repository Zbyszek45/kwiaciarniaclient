import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Address } from '../model/address';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl: string
    allUsersUrl: string
    addressUrl: string
    userUrl: string

    constructor(private http: HttpClient) {
        this.baseUrl = "http://localhost:8080/api/private/users"
        this.allUsersUrl = "/all"
        this.addressUrl = "/address"
        this.userUrl = "/user"
    }

    public findAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + this.allUsersUrl);
    }

    public findUserAddress(): Observable<Address>  {
        return this.http.get<Address>(this.baseUrl + this.addressUrl);
    }

    public findUser(): Observable<User> {
        return this.http.get<User>(this.baseUrl + this.userUrl);
    }
}