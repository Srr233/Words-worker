import Words from "../schemas/schemas.js";
import searchWordBy from "../searchWordBy.js";

async function update(indicator, data) {
    for (const by of searchWordBy) {
        await Words.updateMany({ [by]: indicator }, {
            from: data.from,
            to: data.to,
            repeated: data.repeated
        });
    }
    return true;
}

export {
    update
}