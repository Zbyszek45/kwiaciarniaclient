import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDetails } from '../model/user-details';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl: string;
  roleUrl: string;
  userDetails: UserDetails;


  constructor(private http: HttpClient, private router: Router,
    private _snackBar: MatSnackBar) {
    this.loginUrl = 'http://localhost:8080/login';
    this.roleUrl = 'http://localhost:8080/user'
  }

  public login(params: HttpParams) {
    this.http.post(this.loginUrl, params, { observe: 'response' }).subscribe((res: HttpResponse<any>) => {
      localStorage.setItem("token", res.headers.get("authorization"));
      this.getUserDetails();
      this.router.navigate(["/home"]);
    }, error => {
      this._snackBar.open('Nie udało się zalogować :(', 'OK', { duration: 5000 });
    });
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  public getUserDetails() {
      this.http.get<UserDetails>(this.roleUrl).subscribe(response => {
        console.log(response);
        localStorage.setItem("userDetails", response.authorities.toString());
    })
  }

  public isAdmin() {
    if (localStorage.getItem("userDetails").includes("ROLE_ADMIN")) {
      return true;
    }
    return false;
  }

  public logout() {
    localStorage.clear();
  }
}
