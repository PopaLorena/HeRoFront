import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from 'src/models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  Training_DATA: Training[] = [
    {Id: 1, Name: 'Hydrogen', Date: new Date(), TrainerName: 'Hydrogen'},
    {Id: 2, Name: 'Hydrogen2', Date: new Date(), TrainerName: 'Hydrogen'},
    {Id: 3, Name: 'Hydrogen3', Date: new Date(), TrainerName: 'Hydrogen'},
    {Id: 4, Name: 'Hydrogen4', Date: new Date(), TrainerName:'Hydrogen'},
    {Id: 5, Name: 'Hydrogen5', Date: new Date(), TrainerName: 'Hydrogen'},
    {Id: 6, Name: 'Hydrogen6', Date: new Date(), TrainerName: 'Hydrogen'},
  ];
  
  readonly baseUrl = "http://localhost:80/api/Training";
  constructor(private httpClient: HttpClient) { }

  getTraining(): Observable<Training[]> {
    return this.httpClient.get<Training[]>(this.baseUrl + `/get`)
  }
}
