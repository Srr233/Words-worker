import Words from "../schemas/schemas.js";
import searchWordBy from "../searchWordBy.js";

async function getWordByIndicator(indicator) {
    for (const by of searchWordBy) {
        const res = await Words.find({ [by]: indicator });
        if (res.length) return res;
    }
    return [];
}

async function getAllWords() {
    return await Words.find();
}
export {
    getWordByIndicator,
    getAllWords
}