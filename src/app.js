const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cors({
  origin: ['https://connect-fe.onrender.com'],
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth.routes');
const profileRouter = require('./routes/profile.routes');
const requestRouter = require('./routes/connectionRequest.routes');
const userRouter = require('./routes/user.routes');

// Route
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/request', requestRouter);
app.use('/api/v1/user', userRouter);


// Connect to the database, then start the server
connectDB().then(() => {
  app.listen(port, () =>
    console.log(`Server listening on port ${port}`)
  );
});


  

app.use('/', (err, req,res, next)=>{
  if(err){
    res.status(500).send({message:err.message});
  }
})