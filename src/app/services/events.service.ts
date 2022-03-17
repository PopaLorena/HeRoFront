import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from 'src/models/events';

@Injectable()
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  EVENTS_DATA: Events[] = [
    { Id: 1, Name: 'Hydrogen', StartDate: new Date(), EndDate: new Date() },
    { Id: 2, Name: 'Hydrogen2', StartDate: new Date(), EndDate: new Date() },
    { Id: 3, Name: 'Hydrogen3', StartDate: new Date(), EndDate: new Date() },
    { Id: 4, Name: 'Hydrogen4', StartDate: new Date(), EndDate: new Date() },
    { Id: 5, Name: 'Hydrogen5', StartDate: new Date(), EndDate: new Date() },
    { Id: 6, Name: 'Hydrogen6', StartDate: new Date(), EndDate: new Date() },
  ];

  //   getEvents(): Events[] {
  //     return this.EVENTS_DATA;
  // }
  readonly baseUrl = "http://localhost:80/api/event";
  getEvents(): Observable<Events[]> {
    return this.httpClient.get<Events[]>(this.baseUrl + `/get`)
  }

}
