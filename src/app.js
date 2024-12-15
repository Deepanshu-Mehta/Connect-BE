const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const app = express();
const port = 3000;
app.use(express.json());

const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');

// Route
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/v1/auth', authRouter);
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