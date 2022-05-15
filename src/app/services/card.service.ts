import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards!: Card[];

  // apiUrl: string = 'https://jsonplaceholder.typicode.com'            'http://demo.limantech.com/cards/public/api/' videodaki api

  constructor(
    @Inject('apiUrl') private apiUrl: string,  // bu şekilde inject etmesek sol üstteki gibi kullanmak gerekiyordu.
    private http: HttpClient,
    
    ) { }

  getCards(): void {
    this.http.get<Card[]>(this.apiUrl + '/users')
    .subscribe((res: Card[]) => {
      this.cards = res;
    })
  }

  addCard(card: Card): Observable<any> {
    return this.http.post(this.apiUrl + '/users', card);
  }


  updateCard(card: Card, cardId: number): Observable<any> {
    return this.http.put(this.apiUrl + '/users/' + cardId, card);
  }

  deleteCard(cardId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/users/' + cardId);
  }
}
