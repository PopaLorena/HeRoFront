import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get username(): string {
    return localStorage.getItem('username') || 'unknown';
  }
  set username(value: string) {
    localStorage.setItem('username', value);
  }
  
  loggedInUser: BehaviorSubject<string> = new BehaviorSubject(this.username);
  readonly baseUrl = "https://localhost:44321/api/User";
  constructor(private httpClient: HttpClient) { }

  saveUser(username: string) {
    localStorage.setItem('username', username);
    this.loggedInUser.next(username);
  }

  login(user: User): Observable<String> {
    //this.saveUser(user.username);
    return this.httpClient.post(this.baseUrl + `/login`, user) as Observable<String>;
  }
}
