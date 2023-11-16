import {
  addMedia,
  getMediaById,
  listAllMedia,
  updateMedia,
  deleteMedia as deleteMediaFromDb,
} from '../models/mediaModel.mjs';

const getMedia = async (req, res) => {
  const id = req.params.id;
  const media = await listAllMedia();
  if (!id) res.status(200).json(media);
  else {
    const media = await getMediaById(id);
    if (media) res.status(200).json(media);
    else res.status(404).json({message: `Media with id ${id} not found`});
  }
};

const postMedia = async (req, res) => {
  const {filename, size, mimetype} = req.file;
  const {title, description, user_id} = req.body;
  if (filename && title && user_id) {
    const media = await addMedia({
      filename,
      size,
      mimetype,
      title,
      description,
      user_id,
    });
    if (media?.media_id) res.status(201);
  } else res.status(400).json({message: 'No media data provided'});
};

const putMedia = async (req, res) => {
  const id = req.params.id;
  const media = req.body;
  if (media) {
    const updatedMedia = await updateMedia(id, media);
    if (updatedMedia) res.status(200);
    else res.status(404).json({message: `Media with id ${id} not found`});
  } else res.status(400).json({message: 'No media data provided'});
};

const deleteMedia = async (req, res) => {
  const id = req.params.id;
  const media = await deleteMediaFromDb(id);
  if (media) res.status(200);
  else res.status(404).json({message: `Media with id ${id} not found`});
};

export {getMedia, postMedia, putMedia, deleteMedia};
