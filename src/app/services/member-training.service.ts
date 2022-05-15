import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/member';
import { MemberTraining } from 'src/models/memberTraining';
import { Training } from 'src/models/training';

@Injectable({
  providedIn: 'root'
})
export class MemberTrainingService {

token = localStorage.getItem('jwt');
header = {Authorization: `Bearer ${this.token}`};
readonly baseUrl = "https://localhost:44321/api/MemberTraining";
 constructor(private httpClient: HttpClient) { }

getTrainingsByMemberId(id: number): Observable<Training[]> {
  return this.httpClient.get(this.baseUrl + `/get/byMemberId/`+ id, { headers: this.header }) as Observable<Training[]>;
}

getMemberByTrainingId(id: number): Observable<Member[]> {
  return this.httpClient.get(this.baseUrl + `/get/byTrainingId/`+ id, { headers: this.header }) as Observable<Member[]>;
}

addMemberTrainings(memberId:number, trainingId: number): Observable<MemberTraining> {
  return this.httpClient.post(this.baseUrl + `/post/`+ memberId + `/` + trainingId, null, { headers: this.header }) as Observable<MemberTraining>;
}

async CheckIfExist(memberId:number,trainingId: number){
  return  await this.httpClient.get(this.baseUrl + `/Check/`+ memberId+ "/" + trainingId, { headers: this.header }).toPromise();
}
}
