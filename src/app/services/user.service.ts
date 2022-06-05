import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from 'src/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token? = localStorage.getItem('jwt');
  header = {Authorization: `Bearer ${this.token}`};

  loggedInUser: BehaviorSubject<string> = new BehaviorSubject(this.username);
  readonly baseUrl = "https://localhost:44321/api/User";
 
  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) { }

  get username(): string {
    return localStorage.getItem('username') || 'unknown';
  }
  set username(value: string) {
    localStorage.setItem('username', value);
  }

  public getUserId() : number {
    return parseInt(localStorage.getItem('userId')!);
  } 
  
  public getUsername(): string {
    return localStorage.getItem('username')!;
  } 

  async saveUser(username: string |undefined ) {
    localStorage.setItem('username', username!);
    this.loggedInUser.next(username!);
  }

  async saveMemberId(id: number | undefined){
    localStorage.setItem('userId', id?.toString()!);
    this.loggedInUser.next(id?.toString()!);
  }

  public isAuthenticated(): boolean {
    const token: string | undefined = localStorage.getItem('jwt')!;

    return !this.jwtHelper.isTokenExpired(token);
  }

  addUser(user: User): Observable<User> {
     return this.httpClient.post(this.baseUrl + `/register`, user, {headers:this.header}) as Observable<User>;
   }

   memberIdNotAdminYet(id: number ) : Observable<boolean>{
    return  this.httpClient.get(this.baseUrl + `/memberIdNotAdminYet/`+ id,  {headers:this.header})as Observable<boolean>;
  } 

  editPassword(user: User, password: string): Observable<User> {
    return this.httpClient.patch(this.baseUrl + `/edit/`+password, user, {headers:this.header}) as Observable<User>;
  }

  setAsAdmin(id: number): Observable<User> {
    return this.httpClient.patch(this.baseUrl + `/setAsAdmin/` + id, null, {headers:this.header}) as Observable<User>;
  }

  setAsUser(id: number): Observable<User> {
    return this.httpClient.patch(this.baseUrl + `/setAsUser/` + id, null, {headers:this.header}) as Observable<User>;
  }

   async getRole(username: string){
    return await this.httpClient.get(this.baseUrl + `/getRole/` + username, {responseType: 'text'}).toPromise();
   }

   async login(user: User){
    return await this.httpClient.post(this.baseUrl + `/login`, user, {responseType: 'text'}).toPromise();
  }
}
