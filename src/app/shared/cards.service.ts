import {Injectable} from '@angular/core';
import {cards} from './sample-cards';

export interface Card {
  character: string;
  age: number;
  image: string;
  status: string;
  titles: string[];
}

@Injectable()
export class CardsService {
  private _backEndMock = cards;

  getCards(): Promise<Card[]> {
    return Promise.resolve(this._backEndMock.thronesCharacterCards);
  }

  getCard(character: string): Promise<Card> {
    return new Promise((resolve, reject) => {
      let index = this._findCardIndex(character);
      if (index === -1) {
        reject('No such card exists');
      }

      resolve(this._backEndMock.thronesCharacterCards[index]);
    });
  }

  addCard(card: Card): Promise<any> {
    return new Promise((resolve, reject) => {
      let index = this._findCardIndex(card.character);
      if (index !== -1) {
        reject('Already Exists');
      }

      this._backEndMock.thronesCharacterCards.push(card);
      resolve();
    });
  }

  updateCard(card: Card): Promise<any> {
    return new Promise((resolve, reject) => {
      let index = this._findCardIndex(card.character);
      if (index === -1) {
        reject('No such card exists');
      }

      this._backEndMock.thronesCharacterCards[index] = card;
      resolve();
    });
  }

  deleteCard(character: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let index = this._findCardIndex(character);

      if (index !== -1) {
        this._backEndMock.thronesCharacterCards.splice(index, 1);
        resolve();
      }

      reject('No such card exists');
    });
  }

  private _findCardIndex(character: string) {
    return this._backEndMock.thronesCharacterCards.findIndex(
        card => card.character === character);
  }
}
