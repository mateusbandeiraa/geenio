import { shuffle, simpleHash } from "../util/shuffle-seed";
export default class Question {
  selectedAlternative;
  constructor({
    text,
    correct_alternative,
    incorrect_alternative1,
    incorrect_alternative2,
  }) {
    this.text = text;

    // Shuffle the options using a the text hash as a seed.
    // This is a way of always getting the same alternative order.
    this.alternatives = shuffle(
      [correct_alternative, incorrect_alternative1, incorrect_alternative2],
      simpleHash(this.text)
    );

    // If all alternatives are numeric values, we want to display them in order.
    if (
      this.alternatives.every((value) => {
        return !isNaN(value);
      })
    ) {
      this.alternatives = this.alternatives.sort((a, b) => a - b);
    }

    this.correctAlternative = correct_alternative;
  }

  set selectedAlternative(alternative) {
    if (!this.alternatives.includes(alternative)) {
      throw new Error("Invalid alternative");
    }
    this.selectedAlternative = alternative;
  }

  get isSelectedAlternativeCorrect() {
    if (this.selectedAlternative == undefined) {
      throw new Error("Alternative not selected yet");
    }
    return this.selectedAlternative == this.correctAlternative;
  }

  get isAnswered() {
    return this.selectedAlternative != undefined;
  }

  getAlternativeIndex(alternative) {
    return this.alternatives.indexOf(alternative);
  }
}
