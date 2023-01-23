import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/core/service/auth.service';
import { LoginModule } from './login.module'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() { //po naciśnięciu "zaloguj"
    let params = new HttpParams()
    .set('username', this.login)
    .set('password', this.password);
    
    this.auth.login(params);
  }

}
