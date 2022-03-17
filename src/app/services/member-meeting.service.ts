import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberMeeting } from 'src/models/memberMeeting';

@Injectable({
  providedIn: 'root'
})
export class MemberMeetingService {

  readonly baseUrl = "http://localhost:80/api/memberMeeting";
constructor(private httpClient: HttpClient) { }

getMemberMeetings(): Observable<MemberMeeting[]> {
  return this.httpClient.get<MemberMeeting[]>(this.baseUrl + `/get`)
}

}
