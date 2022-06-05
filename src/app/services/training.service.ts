import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/member';
import { Training } from 'src/models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  token = localStorage.getItem('jwt');
  header = {Authorization: `Bearer ${this.token}`};
  readonly baseUrl = "https://localhost:44321/api/Training";
  constructor(private httpClient: HttpClient) { }

  getTrainings(): Observable<Training[]> {
    return this.httpClient.get(this.baseUrl + `/get`) as Observable<Training[]>;
  }
  
  getFutureTrainings(): Observable<Training[]> {
    return this.httpClient.get(this.baseUrl + `/getSort`) as Observable<Training[]>;
  }

  async getTrainingById(Id: number) {
    return await this.httpClient.get(this.baseUrl + `/get/`+ Id , {headers:this.header}).toPromise();
  }

  getTrainingsByMemberId(memberId: number): Observable<Training[]> {
    return this.httpClient.get(this.baseUrl + `/getByMemberId/`+ memberId , {headers:this.header}) as Observable<Training[]>;
  }

  async getParticipants(trainingId: number){
    return await this.httpClient.get(this.baseUrl + `/getParticipants/`+ trainingId , {headers:this.header}).toPromise();
  }
  
  addTraining(newTraining: Training): Observable<Training> {
    return this.httpClient.post(this.baseUrl + `/post`, newTraining, {headers:this.header}) as Observable<Training>;
  }
  
  updateTraining(newTraining: Training): Observable<Training> {
    return this.httpClient.patch(this.baseUrl + `/edit/`+ newTraining.id, newTraining, {headers:this.header}) as Observable<Training>;
  }
  
  deleteTraining(id: number): Observable<null> {
     return this.httpClient.delete(this.baseUrl + `/delete/` + id, { headers: this.header }) as unknown as Observable<null>;
  }

}
