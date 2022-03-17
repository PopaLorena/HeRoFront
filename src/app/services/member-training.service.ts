import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberTraining } from 'src/models/memberTraining';

@Injectable({
  providedIn: 'root'
})
export class MemberTrainingService {

  readonly baseUrl = "http://localhost:80/api/MemberTraining";
constructor(private httpClient: HttpClient) { }

getMemberTrainings(): Observable<MemberTraining[]> {
  return this.httpClient.get<MemberTraining[]>(this.baseUrl + `/get`)
}
}
