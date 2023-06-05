import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from 'src/models/events';

@Injectable()
export class EventsService {

  token = localStorage.getItem('jwt');
  header = { Authorization: `Bearer ${this.token}` };
  constructor(private httpClient: HttpClient) { }
  readonly baseUrl = "https://localhost:44321/api/event";

  getEvents(): Observable<Events[]> {
    return this.httpClient.get(this.baseUrl + `/get`) as Observable<Events[]>;
  }

  addEvent(newEvent: Events): Observable<Events> {
    return this.httpClient.post(this.baseUrl + `/post`, newEvent, { headers: this.header }) as Observable<Events>;
  }

  updateEvent(newEvent: Events): Observable<Events> {
    return this.httpClient.patch(this.baseUrl + `/edit/` + newEvent.id, newEvent, { headers: this.header }) as Observable<Events>;
  }

  deleteEvent(id: number): Observable<null> {
    return this.httpClient.delete(this.baseUrl + `/delete/` + id, { headers: this.header }) as unknown as Observable<null>;
  }

  getEventById(eventId: number): Observable<Events> {
    return this.httpClient.get(this.baseUrl + `/get/` + eventId, { headers: this.header }) as Observable<Events>;
  }
}
