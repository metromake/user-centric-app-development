import express from 'express';
import {
  deleteComment,
  getComment,
  postComment,
  putComment,
} from '../controller/commentController.mjs';
import authenticateToken from '../middlewares/authentication.mjs';
import {body} from 'express-validator';

const commentRouter = express.Router();

/**
 * @api {get} /comments Get All Comments
 * @apiName GetComments
 * @apiGroup Comments
 *
 * @apiDescription Retrieve a list of all comments.
 *
 * @apiHeader {String} Authorization User's access token (Bearer YOUR_ACCESS_TOKEN).
 *
 * @apiSuccess {Object[]} comments List of comments.
 * @apiSuccess {Number} comments.comment_id Comment ID.
 * @apiSuccess {String} comments.comment_text Text content of the comment.
 * @apiSuccess {Number} comments.user_id User ID associated with the comment.
 * @apiSuccess {Number} comments.media_id Media ID associated with the comment.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "comment_id": 1,
 *         "comment_text": "This is a comment.",
 *         "user_id": 123,
 *         "media_id": 456
 *       },
 *       {
 *         "comment_id": 2,
 *         "comment_text": "Another comment.",
 *         "user_id": 789,
 *         "media_id": 456
 *       },
 *       // ...
 *     ]
 *
 * @api {get} /comments/:id Get Comment by ID
 * @apiName GetCommentById
 * @apiGroup Comments
 *
 * @apiDescription Retrieve details for a specific comment.
 *
 * @apiHeader {String} Authorization User's access token (Bearer YOUR_ACCESS_TOKEN).
 *
 * @apiParam {Number} id Comment ID.
 *
 * @apiSuccess {Number} comment_id Comment ID.
 * @apiSuccess {String} comment_text Text content of the comment.
 * @apiSuccess {Number} user_id User ID associated with the comment.
 * @apiSuccess {Number} media_id Media ID associated with the comment.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "comment_id": 1,
 *       "comment_text": "This is a comment.",
 *       "user_id": 123,
 *       "media_id": 456
 *     }
 *
 * @apiError {String} error Comment not found.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Comment not found"
 *     }
 *
 * @api {post} /comments Add New Comment
 * @apiName PostComment
 * @apiGroup Comments
 *
 * @apiDescription Add a new comment.
 *
 * @apiHeader {String} Authorization User's access token (Bearer YOUR_ACCESS_TOKEN).
 *
 * @apiParam {String} comment_text Text content of the comment (between 3 and 100 characters).
 * @apiParam {Number} media_id ID of the associated media item.
 *
 * @apiSuccess {Number} comment_id Comment ID.
 * @apiSuccess {String} comment_text Text content of the comment.
 * @apiSuccess {Number} user_id User ID associated with the comment.
 * @apiSuccess {Number} media_id Media ID associated with the comment.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "comment_id": 3,
 *       "comment_text": "New comment.",
 *       "user_id": 456,
 *       "media_id": 789
 *     }
 *
 * @apiError {String} error Invalid input data.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid input data"
 *     }
 *
 * @api {put} /comments/:id Update Comment
 * @apiName PutComment
 * @apiGroup Comments
 *
 * @apiDescription Update details for a specific comment.
 *
 * @apiHeader {String} Authorization User's access token (Bearer YOUR_ACCESS_TOKEN).
 *
 * @apiParam {Number} id Comment ID.
 * @apiParam {String} comment_text New text content of the comment (between 3 and 100 characters).
 *
 * @apiSuccess {Number} comment_id Comment ID.
 * @apiSuccess {String} comment_text Text content of the comment.
 * @apiSuccess {Number} user_id User ID associated with the comment.
 * @apiSuccess {Number} media_id Media ID associated with the comment.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "comment_id": 3,
 *       "comment_text": "Updated comment.",
 *       "user_id": 456,
 *       "media_id": 789
 *     }
 *
 * @apiError {String} error You are not allowed to modify this comment.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "You are not allowed to modify this comment"
 *     }
 *
 * @apiError {String} error Comment not found.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Comment not found"
 *     }
 *
 * @api {delete} /comments/:id Delete Comment
 * @apiName DeleteComment
 * @apiGroup Comments
 *
 * @apiDescription Delete a specific comment.
 *
 * @apiHeader {String} Authorization User's access token (Bearer YOUR_ACCESS_TOKEN).
 *
 * @apiParam {Number} id Comment ID.
 *
 * @apiSuccess {Number} comment_id Comment ID.
 * @apiSuccess {String} comment_text Text content of the comment.
 * @apiSuccess {Number} user_id User ID associated with the comment.
 * @apiSuccess {Number} media_id Media ID associated with the comment.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiError {String} error You are not allowed to delete this comment.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "You are not allowed to delete this comment"
 *     }
 *
 * @apiError {String} error Comment not found.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Comment not found"
 *     }
 */

commentRouter
  .route('/')
  .get(getComment)
  .post(
    authenticateToken,
    body('comment_text').trim().isLength({min: 3, max: 100}),
    body('media_id').trim().isInt().toInt(),
    postComment
  );

commentRouter
  .route('/:id')
  .get(getComment)
  .put(
    authenticateToken,
    body('comment_text').trim().isLength({min: 3, max: 100}),
    putComment
  )
  .delete(authenticateToken, deleteComment);

export default commentRouter;
