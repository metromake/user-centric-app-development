import express from 'express';
import multer from 'multer';
import {
  deleteMedia,
  getMedia,
  postMedia,
  putMedia,
} from '../controller/mediaController.mjs';

const upload = multer({dest: 'uploads/'});

const mediaRouter = express.Router();

mediaRouter.route('/').get(getMedia).post(upload.single('file'), postMedia);

mediaRouter.route('/:id').get(getMedia).put(putMedia).delete(deleteMedia);

export default mediaRouter;
