import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from 'src/models/meeting';
import { Member } from 'src/models/member';
import { MemberMeeting } from 'src/models/memberMeeting';

@Injectable({
  providedIn: 'root'
})
export class MemberMeetingService {

  token = localStorage.getItem('jwt');
  header = {Authorization: `Bearer ${this.token}`};
  readonly baseUrl = "http://localhost:44321/api/memberMeeting";
   constructor(private httpClient: HttpClient) { }

getMeetingsByMemberId(id: number): Observable<Meeting[]> {
  return this.httpClient.get(this.baseUrl + `/get/byMemberId`+ id, { headers: this.header }) as Observable<Meeting[]>;
}

getMemberByMeetingId(id: number): Observable<Member[]> {
  return this.httpClient.get(this.baseUrl + `/get/byMeetingId`+ id, { headers: this.header }) as Observable<Member[]>;
}

addMemberMeetings(memberId:number, meetingId: number, memberMeeting: MemberMeeting): Observable<MemberMeeting> {
  return this.httpClient.post(this.baseUrl + `/post`+ memberId+ "/" + meetingId, memberMeeting ,{ headers: this.header }) as Observable<MemberMeeting>;
}
CheckIfExist(memberId:number, meetingId: number): Observable<boolean> {
  return this.httpClient.get(this.baseUrl + `Check/`+ memberId+ "/" + meetingId, { headers: this.header }) as Observable<boolean>;
}
}
