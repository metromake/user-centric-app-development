import {
  getCommentById,
  addComment,
  updateComment,
  deleteComment as deleteCommentFromDb,
  listAllComments,
} from '../models/commentModel.mjs';

const getComment = async (req, res) => {
  const id = req.params.id;
  const comments = await listAllComments();
  if (!id) res.status(200).json(comments);
  else {
    const comment = await getCommentById(id);
    if (comment) res.status(200).json(comment);
    else res.status(404).json({message: `Comment with id ${id} not found`});
  }
};

const postComment = async (req, res) => {
  const comment = req.body;
  if (!comment) res.status(400).json({message: 'Comment data is required'});
  else {
    await addComment(comment);
    res.status(201).json(comment);
  }
};

const putComment = async (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  if (!comment) res.status(400).json({message: 'Comment data is required'});
  else {
    const updatedComment = await updateComment(id, comment);
    if (updatedComment) res.status(200).json(updatedComment);
    else res.status(404).json({message: `Comment with id ${id} not found`});
  }
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  const comment = await deleteCommentFromDb(id);
  if (comment) res.status(200).json(comment);
  else res.status(404).json({message: `Comment with id ${id} not found`});
};

export {getComment, postComment, putComment, deleteComment};
