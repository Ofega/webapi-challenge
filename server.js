const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const actionRouter = require('./actions/actionRouter');
const projectRouter = require('./projects/projectRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.json("Welcome to the server!")
})

module.exports = server;