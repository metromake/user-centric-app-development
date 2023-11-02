import index from './index.js';
import getMedia from './api/getMedia.js';
import postMedia from './api/postMedia.js';
import putMedia from './api/putMedia.js';
import deleteMedia from './api/deleteMedia.js';
import getUser from './api/getUser.js';
import postUser from './api/postUser.js';
import putUser from './api/putUser.js';
import deleteUser from './api/deleteUser.js';

const routes = new Map();
routes.set('get/', index);
routes.set('get/api/media', getMedia);
routes.set('get/api/media/:id', getMedia);
routes.set('post/api/media', postMedia);
routes.set('put/api/media/:id', putMedia);
routes.set('delete/api/media/:id', deleteMedia);
routes.set('get/api/user', getUser);
routes.set('get/api/user/:id', getUser);
routes.set('post/api/user', postUser);
routes.set('put/api/user/:id', putUser);
routes.set('delete/api/user/:id', deleteUser);

export default routes;
