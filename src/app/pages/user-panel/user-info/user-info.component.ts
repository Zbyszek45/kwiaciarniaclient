import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/core/model/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user1: User = {
    id: null,
    username: null,
    name: null,
    surname: null,
    phone: null,
     address: null
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findUser().subscribe(data => {
      this.user1 = data;
    })
  }

}
