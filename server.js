const express = require('express');
const helmet = require('helmet');

const cors = require('cors');
const server = express();

const ProjectRouter = require('./routers/projectRouter');
const ActionRouter = require('./routers/actionRouter')

server.use(helmet());
server.use(cors());
server.use(logger);
server.use(express.json());
server.use('/api/projects', ProjectRouter)
server.use('/api/actions', ActionRouter)

server.get('/', (req, res) => {
  res.send(`<h3>Node and Express Challenge!</h3>`);
});

function logger(req, res, next) {
  req.TimeStamp = (new Date().toISOString());
  console.log(`${req.method} request to ${req.originalUrl} made at ${req.TimeStamp} `)
  next();
}
module.exports = server;