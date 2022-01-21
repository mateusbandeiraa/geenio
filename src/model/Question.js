import { shuffle } from "shuffle-seed";
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

// This is a simple, *insecure* hash that's short, fast, and has no dependencies.
// For algorithmic use, where security isn't needed, it's way simpler than sha1 (and all its deps)
// or similar, and with a short, clean (base 36 alphanumeric) result.
// Loosely based on the Java version; see
// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return new Uint32Array([hash])[0].toString(36);
};
