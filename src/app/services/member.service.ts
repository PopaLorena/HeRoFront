import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {


  readonly baseUrl = "http://localhost:44321/api/Member";
  constructor(private httpClient: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.httpClient.get(this.baseUrl + `/get`) as Observable<Member[]>;
  }
}
