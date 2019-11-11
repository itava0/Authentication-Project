const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router')

const server = express();

const config = [helmet(), express.json(), cors(), morgan('dev')];

server.use(config)


server.use('/api', authRouter);
server.use('/api', usersRouter);
server.get('/', (req, res) => {
  res.send('Hello World')
})

module.exports = server;