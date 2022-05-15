import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from 'src/models/meeting';
import { Member } from 'src/models/member';

@Injectable()
export class MeetingService {

token = localStorage.getItem('jwt');
header = {Authorization: `Bearer ${this.token}`};
readonly baseUrl = "https://localhost:44321/api/Meeting";
constructor(private httpClient: HttpClient) { }

getMeetings(): Observable<Meeting[]> {
  return this.httpClient.get(this.baseUrl + `/get`) as Observable<Meeting[]>;
}

getFutureMeetings(): Observable<Meeting[]> {
  return this.httpClient.get(this.baseUrl + `/getSort`) as Observable<Meeting[]>;
}

getNextMeeting(): Observable<Meeting> {
  return this.httpClient.get(this.baseUrl + `/getNext`) as Observable<Meeting>;
}

getMeetingById(Id: number): Observable<Meeting> {
  return this.httpClient.get(this.baseUrl + `/get/`+ Id , {headers:this.header}) as Observable<Meeting>;
}

getMeetingByMemberId(memberId: number): Observable<Meeting[]> {
  return this.httpClient.get(this.baseUrl + `/getByMemberId/`+ memberId , {headers:this.header}) as Observable<Meeting[]>;
}
addMeeting(newMeeting: Meeting): Observable<Meeting> {
  return this.httpClient.post(this.baseUrl + `/post`, newMeeting, {headers:this.header}) as Observable<Meeting>;
}

updateMeeting(newMeeting: Meeting): Observable<Meeting> {
  return this.httpClient.patch(this.baseUrl + `/edit/`+newMeeting.id, newMeeting, {headers:this.header}) as Observable<Meeting>;
}

 async getParticipants(meetingId: number){
  return await this.httpClient.get(this.baseUrl + `/getParticipants/`+ meetingId , {headers:this.header}).toPromise();
}

deleteMeeting(id: number): Observable<null>  {
   return this.httpClient.delete(this.baseUrl + `/delete/` + id, { headers: this.header }) as unknown as Observable<null> ;
}
}
