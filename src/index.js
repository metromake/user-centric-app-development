import express from 'express';
import mediaRouter from './routers/mediaRouter.mjs';
import userRouter from './routers/userRouter.mjs';
import commentRouter from './routers/commentRouter.mjs';
import authRouter from './routers/authRouter.mjs';

const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('/uploads'));

app.use('/api/media', mediaRouter);
app.use('/api/user', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
