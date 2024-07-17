import Card from "./Card";
import LeducDeck from "./LeducDeck";

type HandRankings = {
  [key: string]: number;
};

const HAND_RANKINGS: HandRankings = {
  QJ: 1,
  JQ: 1,
  KJ: 2,
  JK: 2,
  KQ: 3,
  QK: 3,
  JJ: 4,
  QQ: 5,
  KK: 6,
};

export class State {
  private _deck: LeducDeck;
  private _p1Card: Card;
  private _p2Card: Card;
  private _commCard: Card | null;
  private _history: string;
  private _p1Pip: number;
  private _p2Pip: number;

  constructor(
    deck: LeducDeck,
    p1Card: Card,
    p2Card: Card,
    commCard: Card | null,
    history: string
  ) {
    this._deck = deck;
    this._p1Card = p1Card;
    this._p2Card = p2Card;
    this._commCard = commCard;
    this._history = history;
    this._p1Pip = this._p2Pip = 1;
  }

  actor(): number {
    if (!this._history) {
      return 1;
    }
    let currentRoundHistory = this._history.split("|");
    if (currentRoundHistory.length === 2) {
      currentRoundHistory = [currentRoundHistory[1]];
    }
    return currentRoundHistory[0].length % 2 === 0 ? 1 : 2;
  }

  isTerminal(): boolean {
    const currentRoundHistory = this._history.split("|");
    if (currentRoundHistory.length === 2) {
      if (!currentRoundHistory[1] && currentRoundHistory[0].endsWith("f")) {
        return true;
      }
      const terminalSequences = ["xx", "rf", "rc"];
      return terminalSequences.some((seq) =>
        currentRoundHistory[1].includes(seq)
      );
    }
    return false;
  }

  payoff(): number {
    if (this._p1Pip > this._p2Pip) {
      return this._p2Pip;
    } else if (this._p1Pip < this._p2Pip) {
      return -this._p1Pip;
    } else {
      const p1HandRank =
        HAND_RANKINGS[this._p1Card.getRank() + this._commCard!.getRank()];
      const p2HandRank =
        HAND_RANKINGS[this._p2Card.getRank() + this._commCard!.getRank()];
      if (p1HandRank > p2HandRank) {
        return this._p1Pip;
      } else if (p1HandRank < p2HandRank) {
        return -this._p1Pip;
      } else {
        return 0;
      }
    }
  }

  getActions(): string[] {
    const actions: string[] = [];
    let currentRoundHistory = this._history.split("|");
    if (currentRoundHistory.length === 2) {
      currentRoundHistory = [currentRoundHistory[1]];
    } else {
      currentRoundHistory = [currentRoundHistory[0]];
    }
    if (!currentRoundHistory[0] || currentRoundHistory[0].endsWith("x")) {
      actions.push("x", "r");
    } else {
      actions.push("c", "f");
      if ((currentRoundHistory[0].match(/r/g) || []).length === 1) {
        actions.push("r");
      }
    }
    return actions;
  }

  move(action: string | Card): State {
    if (action instanceof Card) {
      this._commCard = this._deck.deal(action);
    } else {
      const player = this.actor();
      if (action === "c") {
        this._updatePip(player, this._commCard ? 4 : 2);
      } else if (action === "r") {
        if (!this._commCard) {
          this._updatePip(
            player,
            this._history && this._history.endsWith("r") ? 4 : 2
          );
        } else {
          this._updatePip(player, this._history.endsWith("r") ? 8 : 4);
        }
      }
      this._updateHistory(action);
      if (this.isEndOfFirstRound()) {
        this._updateHistory("|");
      }
    }
    return this;
  }

  getDeck(): LeducDeck {
    return this._deck;
  }

  getHistory(): string {
    return this._history;
  }

  getHand(): Card | [string, string] {
    if (this.actor() === 1) {
      return this._commCard
        ? ([this._p1Card.getRank(), this._commCard.getRank()].sort() as [
            string,
            string
          ])
        : this._p1Card;
    } else {
      return this._commCard
        ? ([this._p2Card.getRank(), this._commCard.getRank()].sort() as [
            string,
            string
          ])
        : this._p2Card;
    }
  }

  getCommCard(): Card | null {
    return this._commCard;
  }

  getP1Card(): Card {
    return this._p1Card;
  }

  getP2Card(): Card {
    return this._p2Card;
  }

  isEndOfFirstRound(): boolean {
    if (!this._commCard) {
      const terminalSequences = ["xx", "rf", "rc"];
      return terminalSequences.some((seq) => this._history.includes(seq));
    }
    return false;
  }

  private _updateHistory(action: string): void {
    this._history += action;
  }

  private _updatePip(player: number, amount: number): void {
    if (player === 1) {
      this._p1Pip += amount;
    } else {
      this._p2Pip += amount;
    }
  }

  equals(other: State): boolean {
    return (
      this._deck.equals(other._deck) &&
      this._p1Card.equals(other._p1Card) &&
      this._p2Card.equals(other._p2Card) &&
      (this._commCard === null
        ? other._commCard === null
        : other._commCard === null
        ? false
        : this._commCard.equals(other._commCard)) &&
      this._history === other._history &&
      this._p1Pip === other._p1Pip &&
      this._p2Pip === other._p2Pip
    );
  }

  toString(): string {
    return `p1_card: ${this._p1Card.getRank()} p2_card: ${this._p2Card.getRank()} comm_card: ${
      this._commCard
    } history: ${this._history} p1_pip: ${this._p1Pip} p2_pip: ${this._p2Pip}`;
  }

  // private clone(): State {
  //   const clonedState = new State(
  //     new LeducDeck(), // You might want to implement a proper clone method for LeducDeck
  //     new Card(this._p1Card.getRank(), this._p1Card.getSuit()),
  //     new Card(this._p2Card.getRank(), this._p2Card.getSuit()),
  //     this._commCard
  //       ? new Card(this._commCard.getRank(), this._commCard.getSuit())
  //       : null,
  //     this._history
  //   );
  //   clonedState._p1Pip = this._p1Pip;
  //   clonedState._p2Pip = this._p2Pip;
  //   return clonedState;
  // }
}

export default class LeducMCCFRGame {
  private _deck: LeducDeck;
  private _state: State;

  constructor() {
    this._deck = new LeducDeck();
    this._state = this.initialState();
  }

  initialState(): State {
    const p1Card = this._deck.deal();
    const p2Card = this._deck.deal();

    this._state = new State(this._deck, p1Card, p2Card, null, "");
    return this._state;
  }

  getState(): State {
    return this._state;
  }
}
