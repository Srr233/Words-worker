import express from "express";
import mongoose from 'mongoose';
import { create_word } from "./mongodb/CRUD/create_word.js";
import { getWordByIndicator, getAllWords } from "./mongodb/CRUD/read.js";
import uri from './mongodb/remote.js';
import { delete_word } from "./mongodb/CRUD/delete.js";
import { update } from "./mongodb/CRUD/update.js";

const PORT = process.env.PORT || 3000;

(async () => {
    await mongoose.connect(uri);

    const app = express();

    app.use(express.json());

    app.get('/words', async (req, res) => {
        res.status(200).json(await getAllWords());
    })
    app.get('/words/:indicator', async (req, res) => {
        const { indicator } = req.params;
        if (!indicator) {
            res.status(400).json({ status: 'Indicator wasn\'t given' });
            return;
        }

        const current_word = await getWordByIndicator(indicator);
        res.status(200).json(current_word);
    });

    app.delete('/words/:indicator', async (req, res) => {
        const { indicator } = req.params;
        if (!indicator) {
            res.status(400).json({ status: 'Indicator wasn\'t given' });
            return;
        }

        const deleted_count = await delete_word(indicator);

        res.status(200).json({ status: 'success', deleted_count });
    });

    app.post('/words', async (req, res) => {
        const { from, to } = req.body;

        if (!from || !to) {
            res.status(400).json({ status: '\'From\' or \'to\' weren\'t given' });
            return;
        }

        await create_word(from, to);

        res.status(200).json({ status: 'success' });
    });

    app.put('/words/:indicator', async (req, res) => {
        const { indicator } = req.params;
        const { from, to, repeated } = req.body;

        if (!indicator || !from || !to || typeof repeated != 'number') {
            res.status(400).json({ status: '\'From\' or \'to\' or \'repeated\' or \'indicator\'  weren\'t given' });
            return;
        };

        await update(indicator, {
            from,
            to,
            repeated
        });

        res.status(200).json({ status: 'success' });
    });

    app.listen(PORT, () => console.log('Started on: ', PORT, ' port.'))
})();


