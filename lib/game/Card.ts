export default class Card {
  private _suit: string | null;
  private _rank: string;

  constructor(rank: string, suit: string | null) {
    this._suit = suit;
    this._rank = rank;
  }

  value(): number {
    switch (this._rank) {
      case "J":
        return 11;
      case "Q":
        return 12;
      case "K":
        return 13;
      case "A":
        return 14;
      default:
        return parseInt(this._rank);
    }
  }

  getRank(): string {
    return this._rank;
  }

  getSuit(): string | null {
    return this._suit;
  }

  toString(): string {
    if (!this._suit) {
      return this._rank;
    }
    return `${this._rank}${this._suit}`;
  }

  equals(other: Card): boolean {
    return this._suit === other._suit && this._rank === other._rank;
  }
}
