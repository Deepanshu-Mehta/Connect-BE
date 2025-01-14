const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173/',
  credentials: true
}));

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
  app.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
  );
});


  

app.use('/', (err, req,res, next)=>{
  if(err){
    res.status(500).send({message:err.message});
  }
})