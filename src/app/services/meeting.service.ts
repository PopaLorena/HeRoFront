import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from 'src/models/meeting';

@Injectable()
export class MeetingService {
//   Meeting_DATA: Meeting[] = [
//   {id: 1, Name: 'Hydrogen', Date: new Date(), FacilitatorName: 'Hydrogen'},
//   {id: 2, Name: 'Hydrogen2', Date: new Date(), FacilitatorName: 'Hydrogen'},
//   {id: 3, Name: 'Hydrogen3', Date: new Date(), FacilitatorName: 'Hydrogen'},
//   {Id: 4, Name: 'Hydrogen4', Date: new Date(), FacilitatorName:'Hydrogen'},
//   {Id: 5, Name: 'Hydrogen5', Date: new Date(), FacilitatorName: 'Hydrogen'},
//   {Id: 6, Name: 'Hydrogen6', Date: new Date(), FacilitatorName: 'Hydrogen'},
// ];

readonly baseUrl = "https://localhost:44321/api/Meeting";
constructor(private httpClient: HttpClient) { }

getMeetings(): Observable<Meeting[]> {
  return this.httpClient.get(this.baseUrl + `/get`) as Observable<Meeting[]>;
}

}
