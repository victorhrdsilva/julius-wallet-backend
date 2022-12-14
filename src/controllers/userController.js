import joi from 'joi';

import mongo from '../db/db.js';

const userSchema = joi.object({
  email: joi.string().required().empty(' '),
  password: joi.string().required().empty(' ')
});

let db = await mongo();

const signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await db.collection('users').findOne({ email: email });
		const passwordIsValid = bcrypt.compareSync(password, user.password)

    if(user && passwordIsValid) {
        const token = uuid();

        await db.collection("sessions").insertOne({
					userId: user._id,
					token
				})

        res.send({
          token,
          name: user.name
        });
    } else {
        res.status(401).send("Email ou/e senha incorretos");
    }
}

