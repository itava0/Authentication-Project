const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  let userInformation = req.body;

  bcrypt.hash(userInformation.password, 12, (err, hashedPasswod) => {
    userInformation.password = hashedPasswod;

    Users.add(userInformation)
      .then(saved => {
        req.session.username = saved.username;
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      // check that the password is valid
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
        res.status(200).json({ message: `Logged in` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log('login error', error);
      res.status(500).json(error);
    });
});


module.exports= router