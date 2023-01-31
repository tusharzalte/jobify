import express from 'express';
import "express-async-errors"
import morgan from 'morgan';
import dotenv from 'dotenv';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import connectToMongo from './db.js';
import authRouter from './Routes/authRoutes.js';
import jobRouter from './Routes/jobsRouter.js';
connectToMongo();
const app = express();

dotenv.config();

if(process.env.NOD_ENV !== 'production')
{
    app.use(morgan('dev'))
}

app.use(express.json());

app.get('/', (req, res) => {
    res.json({msg:'HELLO!'});
});
app.get('/api/v1', (req, res) => {
    res.json({msg:'API!'});
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/job',jobRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})