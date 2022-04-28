import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  led(test:boolean): Observable<string> {
   var t = this.httpClient.get(`192.168.1.217:8000/led1/true`) as Observable<string>;
   console.log(t);

   return t;
  }

  getFutureTrainings(): Observable<Training[]> {
    return this.httpClient.get(this.baseUrl + `/getSort`) as Observable<Training[]>;
  }

  getTrainingById(memberId: number): Observable<Training> {
    return this.httpClient.get(this.baseUrl + `/get/`+ memberId , {headers:this.header}) as Observable<Training>;
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
