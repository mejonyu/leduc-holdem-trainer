import Card from "./Card";

export default class LeducDeck {
  private _cards: Card[];

  constructor() {
    const ranks = ["J", "Q", "K"];
    this._cards = ranks.flatMap((rank) => [
      new Card(rank, null),
      new Card(rank, null),
    ]);
    this._shuffle();
  }

  deal(card?: Card): Card {
    if (card) {
      const cardIndex = this._cards.findIndex((c) => c.equals(card));
      return this._cards.splice(cardIndex, 1)[0];
    }
    return this._cards.pop()!;
  }

  getCards(): Card[] {
    return this._cards;
  }

  private _shuffle(): void {
    for (let i = this._cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
    }
  }

  equals(other: LeducDeck): boolean {
    return this._cards.every((card, index) => card.equals(other._cards[index]));
  }
}
