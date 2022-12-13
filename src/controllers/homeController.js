import mongo from '../db/db.js';

let db = await mongo();

const home = async (req, res) => {
    const userToken = req.headers.user;

    const user = await db.collection('sessions').findOne({ userToken });

    if (user) {
        
    }

}