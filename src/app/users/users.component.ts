import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: Array<User>;

  constructor(private user: UserService) {
    this.users = [];
  }

  ngOnInit() {
    this.user.getUsers().subscribe((user: User) => {
      this.users.push(user);
    });
  }

}
