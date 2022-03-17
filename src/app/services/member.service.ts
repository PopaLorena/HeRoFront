import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  Member_DATA: Member[] = [
    { Id: 1, Name: 'Hydrogen', BirthDate: new Date(), TelNumber: 'Hydrogen', Email: 'Hydrogen', PhotoUrl: 'Hydrogen', StartDate: new Date(), StatutChangeDate: new Date(), University: 'Hydrogen', UserId: 1, Statut: 'Hydrogen' },
    { Id: 2, Name: 'Hydrogen2', BirthDate: new Date(), TelNumber: 'Hydrogen', Email: 'Hydrogen', PhotoUrl: 'Hydrogen', StartDate: new Date(), StatutChangeDate: new Date(), University: 'Hydrogen', UserId: 1, Statut: 'Hydrogen' },
    { Id: 3, Name: 'Hydrogen3', BirthDate: new Date(), TelNumber: 'Hydrogen', Email: 'Hydrogen', PhotoUrl: 'Hydrogen', StartDate: new Date(), StatutChangeDate: new Date(), University: 'Hydrogen', UserId: 1, Statut: 'Hydrogen' },
    { Id: 4, Name: 'Hydrogen4', BirthDate: new Date(), TelNumber: 'Hydrogen', Email: 'Hydrogen', PhotoUrl: 'Hydrogen', StartDate: new Date(), StatutChangeDate: new Date(), University: 'Hydrogen', UserId: 1, Statut: 'Hydrogen' },
    { Id: 5, Name: 'Hydrogen5', BirthDate: new Date(), TelNumber: 'Hydrogen', Email: 'Hydrogen', PhotoUrl: 'Hydrogen', StartDate: new Date(), StatutChangeDate: new Date(), University: 'Hydrogen', UserId: 1, Statut: 'Hydrogen' },
    { Id: 6, Name: 'Hydrogen6', BirthDate: new Date(), TelNumber: 'Hydrogen', Email: 'Hydrogen', PhotoUrl: 'Hydrogen', StartDate: new Date(), StatutChangeDate: new Date(), University: 'Hydrogen', UserId: 1, Statut: 'Hydrogen' },
  ];

  readonly baseUrl = "http://localhost:80/api/Member";
  constructor(private httpClient: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.baseUrl + `/get`)
  }
}
