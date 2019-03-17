import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    const URL = 'https://jsonplaceholder.typicode.com/users';

    const userObserver = new Observable(observer => {
      this.http.get(URL).subscribe((data: Array<object>) => {
        data.forEach((user: User) => {
          observer.next(user);
        });
      },
      err => {
        observer.error(err);
      });
    });

    return userObserver;
  }
}
