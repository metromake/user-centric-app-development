import express from 'express';
import router from './router.js';

const app = express();

app.use(express.json());
app.use('/media', express.static('src/media'));
app.set('view engine', 'pug');
app.set('views', 'src/views');

router(app);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
