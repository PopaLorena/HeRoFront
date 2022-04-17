import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = localStorage.getItem('jwt');
  header = {Authorization: `Bearer ${this.token}`};
  get username(): string {
    return localStorage.getItem('username') || 'unknown';
  }
  set username(value: string) {
    localStorage.setItem('username', value);
  }
  //token = localStorage.getItem('jwt');
  loggedInUser: BehaviorSubject<string> = new BehaviorSubject(this.username);
  readonly baseUrl = "https://localhost:44321/api/User";
  //header = {Authorization: `Bearer ${this.token}`};
  constructor(private httpClient: HttpClient) { }

  saveUser(username: string |undefined ) {
    localStorage.setItem('username', username!);
    this.loggedInUser.next(username!);
  }

  addUser(user: User): Observable<User> {

     return this.httpClient.post(this.baseUrl + `/register`, user, {headers:this.header}) as Observable<User>;
   }

  login(user: User): Observable<string> {
    this.saveUser(user.username);
    return this.httpClient.post(this.baseUrl + `/login`, user, {responseType: 'text'}) as Observable<string>;
  }
}
