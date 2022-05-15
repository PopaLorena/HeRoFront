import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  token = localStorage.getItem('jwt');
  header = {Authorization: `Bearer ${this.token}`};
  readonly baseUrl = "https://localhost:44321/api/Member";
  memberList!: Member[];
  constructor(private httpClient: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.httpClient.get(this.baseUrl + `/get/`) as Observable<Member[]>;
  }

  getMemberById(memberId: number): Observable<Member> {
    return this.httpClient.get(this.baseUrl + `/get/`+ memberId , {headers:this.header}) as Observable<Member>;
  }

  async getMemberByUsername(username: string){
    return await this.httpClient.get(this.baseUrl + `/get/byUsername/`+ username , {headers:this.header}).toPromise();
  }
  
  addMember(newMember: Member): Observable<Member> {
    return this.httpClient.post(this.baseUrl + `/post`, newMember, {headers:this.header}) as Observable<Member>;
  }

  updateMember(newMember: Member): Observable<Member> {
    return this.httpClient.patch(this.baseUrl + `/edit/`+newMember.id, newMember, {headers:this.header}) as Observable<Member>;
  }

  deleteMember(id: number): Observable<null>  {
    return this.httpClient.delete(this.baseUrl + `/delete/` + id, { headers: this.header }) as unknown as Observable<null> ;
  }
}
