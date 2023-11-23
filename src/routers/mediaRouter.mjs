import express from 'express';
import multer from 'multer';
import {
  deleteMedia,
  getMedia,
  postMedia,
  putMedia,
} from '../controller/mediaController.mjs';
import authenticateToken from '../middlewares/authentication.mjs';

const upload = multer({dest: 'uploads/'});

const mediaRouter = express.Router();

mediaRouter.route('/').get(getMedia).post(upload.single('file'), postMedia);

mediaRouter
  .route('/:id')
  .get(getMedia)
  .put(authenticateToken, putMedia)
  .delete(authenticateToken, deleteMedia);

export default mediaRouter;
