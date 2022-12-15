import mongo from '../db/db.js';

let db = await mongo();

const getHistory = async (req, res) => {
    const userToken = req.headers.user;

    console.log("foi");
}

export {getHistory}