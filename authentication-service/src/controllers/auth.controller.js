import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/models/index.js';

const User = db.User;

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username: username },
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found!',
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).send({
        success: false,
        message: 'Incorrect password!',
      });
    }

    const jwtToken = await jwt.sign(
      { username: username, id: user.id },
      config.jwtSecret,
      { expiresIn: jwtExpiration }
    );

    return res.status(200).send({
      success: true,
      message: 'Login successful!',
      jwtToken,
    });
  } catch (e) {
    console.log('Login error: ', e);
    return res
      .status(500)
      .send({ success: false, message: 'Error logging in user!' });
  }
};

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = await User.create({
      username: username,
      password: await bcrypt.hash(password, 10),
    });

    if (!newUser) {
      return res.status(409).send({
        success: false,
        message: 'SignUp failed!',
      });
    }

    const jwtToken = await jwt.sign(
      { username: username, id: newUser.id },
      config.jwtSecret,
      { expiresIn: config.jwtExpiration }
    );

    return res.status(201).send({
      success: true,
      message: 'User created successfully!',
      newUser,
      jwtToken,
    });
  } catch (e) {
    console.log('SignUp error ', e);
    return res.status(500).send({
      success: false,
      message: 'Error trying to signup!',
    });
  }
};

export { login, signup };
