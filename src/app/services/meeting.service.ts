import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from 'src/models/meeting';

@Injectable()
export class MeetingService {

readonly baseUrl = "https://localhost:44321/api/Meeting";
constructor(private httpClient: HttpClient) { }

getMeetings(): Observable<Meeting[]> {
  return this.httpClient.get(this.baseUrl + `/get`) as Observable<Meeting[]>;
}

}
