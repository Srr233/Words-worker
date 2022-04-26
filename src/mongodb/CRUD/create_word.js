import Words from '../schemas/schemas.js';
import uniqid from 'uniqid';

async function create_word(from, to) {
    const newWord = new Words({
        from,
        to,
        repeated: 0,
        id: uniqid('word')
    });
    await newWord.save();
}

export {
    create_word
}