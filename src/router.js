import routes from './routes/routes.js';

const router = app => {
  app.get('/', routes.get('get/'));
  app.get('/api/media', routes.get('get/api/media'));
  app.get('/api/media/:id', routes.get('get/api/media/:id'));
  app.post('/api/media', routes.get('post/api/media'));
  app.put('/api/media/:id', routes.get('put/api/media/:id'));
  app.delete('/api/media/:id', routes.get('delete/api/media/:id'));
  app.get('/api/user', routes.get('get/api/user'));
  app.get('/api/user/:id', routes.get('get/api/user/:id'));
  app.post('/api/user', routes.get('post/api/user'));
  app.put('/api/user/:id', routes.get('put/api/user/:id'));
  app.delete('/api/user/:id', routes.get('delete/api/user/:id'));
};

export default router;
