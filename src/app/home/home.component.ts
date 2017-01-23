import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {Card, CardsService} from '../shared';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cards: Card[];

  constructor(
      private _service: CardsService, private _sanitiser: DomSanitizer,
      private _router: Router) {}

  ngOnInit() { this._service.getCards().then(data => this.cards = data); }

  getSrc(card: Card) {
    return this._sanitiser.bypassSecurityTrustUrl(card.image);
  }

  onRemoveClick(card: Card) { this._service.deleteCard(card.character); }

  onEdit(character: string) { this._router.navigate(['/edit', character]); }
}
