import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from 'src/models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  readonly baseUrl = "https://localhost:44321/api/Training";
  constructor(private httpClient: HttpClient) { }

  getTraining(): Observable<Training[]> {
    return this.httpClient.get(this.baseUrl + `/get`) as Observable<Training[]>;
  }
}
