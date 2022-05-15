import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { CardModalComponent } from './card-modal/card-modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  // cards!: Card[];  card.service içinde tanımladık çünkü oradan tüm componentlerde kullanabiliyoruz.

  

  constructor(public dialog: MatDialog,
    public cardService: CardService   // html içinde constructor dan bişey çağırıyorsak private olamaz, public olur.
    ) { }

  ngOnInit(): void {
    this.cardService.getCards();
  }

  openAddCardModal(): void {
    this.dialog.open(CardModalComponent, {
      width: "400px"
    });

    
  }

  

}
