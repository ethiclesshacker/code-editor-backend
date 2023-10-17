import express from 'express';
import path from 'path'
const app = express();
import  'dotenv/config';
import morgan from 'morgan';
import connectDb from './db.js';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import codeRoutes from './routes/codeRoutes.js';


connectDb();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const buildPath = path.join('build')


// app.use(express.static(buildPath))
app.use(express.static("public"));


app.use('/api/users', userRoutes);
app.use('/api/code', codeRoutes);

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World' });
});

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
