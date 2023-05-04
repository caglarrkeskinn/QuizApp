import {makeAutoObservable} from 'mobx';

class ScoreStore {
  score: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  correct() {
    this.score += 10;
  }
  reset() {
    this.score = 0;
  }
}
export const scoreStore = new ScoreStore();
