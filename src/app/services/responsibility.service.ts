import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsibility } from 'src/models/responsibility';

@Injectable({
  providedIn: 'root'
})
export class ResponsibilityService {

  readonly baseUrl = "http://localhost:44321/api/Responsibility";
  constructor(private httpClient: HttpClient) { }

  getResponsibilities(): Observable<Responsibility[]> {
    return this.httpClient.get(this.baseUrl + `/get`) as Observable<Responsibility[]>;
  }
}
