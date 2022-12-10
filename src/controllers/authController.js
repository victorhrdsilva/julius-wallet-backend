import joi from 'joi';

import mongo from '../db/db.js';

const userSchema = joi.object({
  name: joi.string().required().empty(' '),
  email: joi.string().required().empty(' '),
  password: joi.string().required().empty(' ')
});

let db = await mongo();

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const user = {
      name,
      email,
      password: passwordHash,
    };

    const validation = userSchema.validate(message, {
      abortEarly: false,
    });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    await db.collection('users').insertOne(user) 

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export {create}