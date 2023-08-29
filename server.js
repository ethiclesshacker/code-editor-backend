import express from 'express';
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

app.use('/api/users', userRoutes);
app.use('/api/code', codeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
