import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsibility } from 'src/models/responsibility';

@Injectable({
  providedIn: 'root'
})
export class ResponsibilityService {

  token = localStorage.getItem('jwt');
  header = {Authorization: `Bearer ${this.token}`};
  readonly baseUrl = "https://localhost:44321/api/Responsibility";
  constructor(private httpClient: HttpClient) { }

  getResponsibilities(): Observable<Responsibility[]> {
    return this.httpClient.get(this.baseUrl + `/get`) as Observable<Responsibility[]>;
  }

  getResponsibilitiesByEventId(eventId: number): Observable<Responsibility[]> {
    return this.httpClient.get(this.baseUrl + `/get/byEventId/`+eventId, {headers:this.header}) as Observable<Responsibility[]>;
  }

  getResponsibilitiesByMemberId(memberId: number): Observable<Responsibility[]> {
    return this.httpClient.get(this.baseUrl + `/get/byMemberId/`+memberId, {headers:this.header}) as Observable<Responsibility[]>;
  }

  getResponsibilityById(resId: number): Observable<Responsibility> {
    return this.httpClient.get(this.baseUrl + `/get/`+ resId , {headers:this.header}) as Observable<Responsibility>;
  }
  
  addResponsibility(eventId: number, memberId: number, newResponsibility: Responsibility): Observable<Responsibility> {
    return this.httpClient.post(this.baseUrl + `/post/` + eventId + `/` + memberId, newResponsibility, {headers:this.header}) as Observable<Responsibility>;
  }
  
  updateResponsibility(newResponsibility: Responsibility): Observable<Responsibility> {
    return this.httpClient.patch(this.baseUrl + `/edit/`+newResponsibility.id, newResponsibility, {headers:this.header}) as Observable<Responsibility>;
  }
  
  deleteResponsibility(id: number): Observable<null> {
     return this.httpClient.delete(this.baseUrl + `/delete/` + id, { headers: this.header }) as unknown as Observable<null> ;
  }
}
