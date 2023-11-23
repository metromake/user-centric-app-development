import express from 'express';
import multer from 'multer';
import {
  deleteMedia,
  getMedia,
  postMedia,
  putMedia,
} from '../controller/mediaController.mjs';
import authenticateToken from '../middlewares/authentication.mjs';
import {body} from 'express-validator';
import upload from '../middlewares/upload.mjs';

const mediaRouter = express.Router();

mediaRouter
  .route('/')
  .get(getMedia)
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').trim().isLength({min: 3, max: 20}),
    body('description').trim().isLength({min: 10, max: 100}),
    body('user_id').trim().isInt().toInt(),
    postMedia
  );

mediaRouter
  .route('/:id')
  .get(getMedia)
  .put(
    body('title').trim().isLength({min: 3, max: 20}),
    body('description').trim().isLength({min: 10, max: 100}),
    authenticateToken,
    putMedia
  )
  .delete(authenticateToken, deleteMedia);

export default mediaRouter;
