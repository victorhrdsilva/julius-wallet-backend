import joi from 'joi';
import bcrypt from 'bcrypt';

import mongo from '../db/db.js';

const userSchema = joi.object({
  name: joi.string().required().empty(' '),
  email: joi.string().required().empty(' '),
  password: joi.string().required().empty(' ')
});

let db = await mongo();

const create = async (req, res) => {
  const { name, email, password } = req.body;

  
  try {
    let user = {
      name,
      email,
      password
    };
    
    const validation = userSchema.validate(user, {
      abortEarly: false,
    });
    
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    
    const userExist = await db.collection('users').findOne({email: email});
    
    if(userExist) {
      return res.status(422).send("Email já cadastrado")
    }
    
    const passwordHash = bcrypt.hashSync(password, 10);

    user.password = passwordHash;

    await db.collection('users').insertOne(user);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export {create}