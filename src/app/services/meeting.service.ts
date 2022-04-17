import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from 'src/models/meeting';

@Injectable()
export class MeetingService {

token = localStorage.getItem('jwt');
header = {Authorization: `Bearer ${this.token}`};
readonly baseUrl = "https://localhost:44321/api/Meeting";
constructor(private httpClient: HttpClient) { }

getMeetings(): Observable<Meeting[]> {
  return this.httpClient.get(this.baseUrl + `/get`) as Observable<Meeting[]>;
}

getMeetingById(memberId: number): Observable<Meeting> {
  return this.httpClient.get(this.baseUrl + `/get/`+ memberId , {headers:this.header}) as Observable<Meeting>;
}

addMeeting(newMeeting: Meeting): Observable<Meeting> {
  return this.httpClient.post(this.baseUrl + `/post`, newMeeting, {headers:this.header}) as Observable<Meeting>;
}

updateMeeting(newMeeting: Meeting): Observable<Meeting> {
  return this.httpClient.patch(this.baseUrl + `/edit/`+newMeeting.id, newMeeting, {headers:this.header}) as Observable<Meeting>;
}

deleteMeeting(newMeeting: Meeting): void {
   this.httpClient.delete(this.baseUrl + `/delete/`+ newMeeting.id);
}
}
