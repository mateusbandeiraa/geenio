export default class Question {
  selectedAlternative;
  constructor({ text, alternatives, correctAlternative }) {
    this.text = text;
    this.alternatives = alternatives;
    this.correctAlternative = correctAlternative;
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
