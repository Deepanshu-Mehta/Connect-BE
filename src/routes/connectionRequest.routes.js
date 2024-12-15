const express = require('express');
const { sendConnectionRequest, reviewRequest } = require('../controllers/connectionRequest.controller');
const AuthVerify = require('../middlewares/auth');
const requestRouter = express.Router();

// requestRouter.post('/send/interested/:userid',AuthVerify ,sendConnectionRequest);
// requestRouter.post('/send/ignored/:userid',AuthVerify );
requestRouter.post('/send/:status/:userid',AuthVerify ,sendConnectionRequest);

// requestRouter.post('/review/accepted/:requestid',AuthVerify );
// requestRouter.post('/review/rejected/:requestid',AuthVerify );
requestRouter.post('/review/:status/:requestId',AuthVerify , reviewRequest);


module.exports = requestRouter;