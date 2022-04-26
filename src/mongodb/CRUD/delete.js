import Words from "../schemas/schemas.js";
import searchWordBy from "../searchWordBy.js";

async function delete_word(indicator) {
    let deletedCount = 0;
    for (const by of searchWordBy) {
        deletedCount += (await Words.deleteMany({ [by]: indicator })).deletedCount;
    }
    return deletedCount;
}

export {
    delete_word
}