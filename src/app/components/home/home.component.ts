import { Component, OnInit } from '@angular/core';
// import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    // public cardService: CardService, // kartvizitleri home component te çağırmaya çalıştım html hata verdi
  ) { }

  ngOnInit(): void {
  }

}
