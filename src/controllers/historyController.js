import mongo from '../db/db.js';

let db = await mongo();

const getHistory = async (req, res) => {
    const userToken = req.headers.user;


    const user = await db.collection('sessions').findOne({ token: userToken });

    if (user) {
        
    } else {
        
    }

}