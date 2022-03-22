import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from 'src/models/events';

@Injectable()
export class EventsService {

  constructor(private httpClient: HttpClient) { }
  readonly baseUrl = "http://localhost:44321/api/event";

  getEvents(): Observable<Events[]> {
    return this.httpClient.get(this.baseUrl + `/get`) as Observable<Events[]>;
  }
}
