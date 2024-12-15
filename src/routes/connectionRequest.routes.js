const express = require('express');
const requestRouter = express.Router();

requestRouter.post('/send/interested/:userid');
requestRouter.post('/send/ignored/:userid');
requestRouter.post('/review/accepted/:reqid');
requestRouter.post('/review/rejected/:reqid');

module.exports = requestRouter;