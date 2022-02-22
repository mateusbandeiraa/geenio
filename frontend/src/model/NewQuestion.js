export default class NewQuestion {
    constructor({ id, text, author, alternatives, correctAlternative } = {}) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.alternatives = alternatives;
        this.correctAlternative = correctAlternative;
    }
}