import mongo from '../db/db.js';
let db = await mongo();

async function verifySession(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await db.collection("sessions").findOne({ token: token });
        if (!session) {
            return res.send("caiu aqui").status(401);
        }

        res.locals.session = session;
        next();

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export {verifySession}