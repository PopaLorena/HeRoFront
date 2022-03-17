import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsibility } from 'src/models/responsibility';

@Injectable({
  providedIn: 'root'
})
export class ResponsibilityService {

  Responsibility_DATA: Responsibility[] = [
    { Id: 1, Name: 'Hydrogen', StartDate: new Date(), Description: 'Hydrogen', EndDate: new Date(), ResponsibleId: 1, EventId: 1 },
    { Id: 2, Name: 'Hydrogen2', StartDate: new Date(), Description: 'Hydrogen', EndDate: new Date(), ResponsibleId: 1, EventId: 1 },
    { Id: 3, Name: 'Hydrogen3', StartDate: new Date(), Description: 'Hydrogen', EndDate: new Date(), ResponsibleId: 1, EventId: 1 },
    { Id: 4, Name: 'Hydrogen4', StartDate: new Date(), Description: 'Hydrogen', EndDate: new Date(), ResponsibleId: 1, EventId: 1 },
    { Id: 5, Name: 'Hydrogen5', StartDate: new Date(), Description: 'Hydrogen', EndDate: new Date(), ResponsibleId: 1, EventId: 1 },
    { Id: 6, Name: 'Hydrogen6', StartDate: new Date(), Description: 'Hydrogen', EndDate: new Date(), ResponsibleId: 1, EventId: 1 },
  ];

  readonly baseUrl = "http://localhost:80/api/Responsibility";
  constructor(private httpClient: HttpClient) { }

  getResponsibilities(): Observable<Responsibility[]> {
    return this.httpClient.get<Responsibility[]>(this.baseUrl + `/get`)
  }
}
