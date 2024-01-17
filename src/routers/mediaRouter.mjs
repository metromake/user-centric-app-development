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

/**
 * @api {get} /media Get All Media
 * @apiName GetMedia
 * @apiGroup Media
 *
 * @apiDescription Retrieve a list of all media items.
 *
 * @apiHeader {String} Authorization User's access token (Bearer YOUR_ACCESS_TOKEN).
 *
 * @apiSuccess {Object[]} media List of media items.
 * @apiSuccess {Number} media.media_id Media ID.
 * @apiSuccess {String} media.filename Filename of the media.
 * @apiSuccess {Number} media.size Size of the media in bytes.
 * @apiSuccess {String} media.mimetype Mimetype of the media.
 * @apiSuccess {String} media.title Title of the media.
 * @apiSuccess {String} media.description Description of the media.
 * @apiSuccess {Number} media.user_id User ID associated with the media.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "media_id": 1,
 *         "filename": "example.jpg",
 *         "size": 1024,
 *         "mimetype": "image/jpeg",
 *         "title": "Example Image",
 *         "description": "An example image",
 *         "user_id": 123
 *       },
 *       {
 *         "media_id": 2,
 *         "filename": "example.mp4",
 *         "size": 2048,
 *         "mimetype": "video/mp4",
 *         "title": "Example Video",
 *         "description": "An example video",
 *         "user_id": 456
 *       },
 *       // ...
 *     ]
 *
 * @api {get} /media/:id Get Media by ID
 * @apiName GetMediaById
 * @apiGroup Media
 *
 * @apiDescription Retrieve details for a specific media item.
 *
 * @apiHeader {String} Authorization User's access token (Bearer YOUR_ACCESS_TOKEN).
 *
 * @apiParam {Number} id Media ID.
 *
 * @apiSuccess {Number} media_id Media ID.
 * @apiSuccess {String} filename Filename of the media.
 * @apiSuccess {Number} size Size of the media in bytes.
 * @apiSuccess {String} mimetype Mimetype of the media.
 * @apiSuccess {String} title Title of the media.
 * @apiSuccess {String} description Description of the media.
 * @apiSuccess {Number} user_id User ID associated with the media.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "media_id": 1,
 *       "filename": "example.jpg",
 *       "size": 1024,
 *       "mimetype": "image/jpeg",
 *       "title": "Example Image",
 *       "description": "An example image",
 *       "user_id": 123
 *     }
 *
 * @apiError {String} error Media not found.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Media not found"
 *     }
 *
 * @api {post} /media Add New Media
 * @apiName PostMedia
 * @apiGroup Media
 *
 * @apiDescription Add a new media item.
 *
 * @apiHeader {String} Authorization User's access token (Bearer YOUR_ACCESS_TOKEN).
 *
 * @apiParam {File} file Media file to upload.
 * @apiParam {String} title Title of the media (between 3 and 20 characters).
 * @apiParam {String} description Description of the media (between 10 and 100 characters).
 * @apiParam {Number} user_id User ID associated with the media.
 *
 * @apiSuccess {Number} media_id Media ID.
 * @apiSuccess {String} filename Filename of the media.
 * @apiSuccess {Number} size Size of the media in bytes.
 * @apiSuccess {String} mimetype Mimetype of the media.
 * @apiSuccess {String} title Title of the media.
 * @apiSuccess {String} description Description of the media.
 * @apiSuccess {Number} user_id User ID associated with the media.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "media_id": 3,
 *       "filename": "new_example.jpg",
 *       "size": 512,
 *       "mimetype": "image/jpeg",
 *       "title": "New Example Image",
 *       "description": "A new example image",
 *       "user_id": 789
 *     }
 *
 * @apiError {String} error No media file provided.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "No media file provided"
 *     }
 *
 * @apiError {String} error Invalid media data.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid media data"
 *     }
 *
 * @api {put} /media/:id Update Media
 * @apiName PutMedia
 * @apiGroup Media
 *
 * @apiDescription Update details for a specific media item.
 *
 * @apiHeader {String} Authorization User's access token (Bearer YOUR_ACCESS_TOKEN).
 *
 * @apiParam {Number} id Media ID.
 * @apiParam {String} title New title of the media (between 3 and 20 characters).
 * @apiParam {String} description New description of the media (between 10 and 100 characters).
 *
 * @apiSuccess {Number} media_id Media ID.
 * @apiSuccess {String} filename Filename of the media.
 * @apiSuccess {Number} size Size of the media in bytes.
 * @apiSuccess {String} mimetype Mimetype of the media.
 * @apiSuccess {String} title Title of the media.
 * @apiSuccess {String} description Description of the media.
 * @apiSuccess {Number} user_id User ID associated with the media.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "media_id": 3,
 *       "filename": "new_example.jpg",
 *       "size": 512,
 *       "mimetype": "image/jpeg",
 *       "title": "New Updated Example Image",
 *       "description": "An updated example image",
 *       "user_id": 789
 *     }
 *
 * @apiError {String} error You are not allowed to modify this media.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "You are not allowed to modify this media"
 *     }
 *
 * @apiError {String} error Media not found.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Media not found"
 *     }
 *
 * @api {delete} /media/:id Delete Media
 * @apiName DeleteMedia
 * @apiGroup Media
 *
 * @apiDescription Delete a specific media item.
 *
 * @apiHeader {String} Authorization User's access token (Bearer YOUR_ACCESS_TOKEN).
 *
 * @apiParam {Number} id Media ID.
 *
 * @apiSuccess {Number} media_id Media ID.
 * @apiSuccess {String} filename Filename of the media.
 * @apiSuccess {Number} size Size of the media in bytes.
 * @apiSuccess {String} mimetype Mimetype of the media.
 * @apiSuccess {String} title Title of the media.
 * @apiSuccess {String} description Description of the media.
 * @apiSuccess {Number} user_id User ID associated with the media.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiError {String} error You are not allowed to delete this media.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "You are not allowed to delete this media"
 *     }
 *
 * @apiError {String} error Media not found.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Media not found"
 *     }
 */

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
