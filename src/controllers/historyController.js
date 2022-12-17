import mongo from '../db/db.js';
import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';
import joi from 'joi';
dayjs.extend(AdvancedFormat);

const historySchema = joi.object({
    value: joi.string().required().empty(' '),
    description: joi.string().required().empty(' '),
    type: joi.any().valid('inflow', 'outflow'),
    date: joi.required(),
});

let db = await mongo();

const getHistory = async (req, res) => {
    const userId = res.locals.session.userId


    try {
        let existHistory = await db.collection('history').findOne({ userId: userId });
        if (existHistory) {
            return res.status(200).send(existHistory.transactions);
        };
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    };
}

const newHistory = async (req, res) => {
    const { value, description, type } = req.body;

    const newHistoryOfUser = { value, description, type, date: dayjs().format("MM/DD") };

    const validation = historySchema.validate(newHistoryOfUser, {
        abortEarly: false,
    });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    };
    const userId = res.locals.session.userId

    try {
        let existHistory = await db.collection('history').findOne({ userId: userId });
        if (!existHistory) {
            await db.collection('history').insertOne({
                userId,
                transactions: [newHistoryOfUser]
            });
            return res.sendStatus(201);
        }
        let history = existHistory.transactions;
        history.push(newHistoryOfUser);
        console.log(history)

        await db.collection("history").updateOne({ userId: userId }, { $set: { transactions: history } });
        return res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    };

};

export { getHistory, newHistory }