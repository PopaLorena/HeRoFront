import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Member } from 'src/models/member';
import { User } from 'src/models/user';
import { MemberService } from './member.service';

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

  loggedInUser: BehaviorSubject<string> = new BehaviorSubject(this.username);
  readonly baseUrl = "https://localhost:44321/api/User";
 
  constructor(private httpClient: HttpClient) { }

  async saveUser(username: string |undefined ) {
    localStorage.setItem('username', username!);
    this.loggedInUser.next(username!);
  }

  async saveMemberId(id: number | undefined){
    localStorage.setItem('userId', id?.toString()!);
    this.loggedInUser.next(id?.toString()!);
  }

  addUser(user: User): Observable<User> {
     return this.httpClient.post(this.baseUrl + `/register`, user, {headers:this.header}) as Observable<User>;
   }

   async getRole(username: string){
    return await this.httpClient.get(this.baseUrl + `/getRole/` + username, {responseType: 'text'}).toPromise();
   }

   async login(user: User){
    return await this.httpClient.post(this.baseUrl + `/login`, user, {responseType: 'text'}).toPromise();
  }
}
