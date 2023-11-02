import mediaController from '../../controller/mediaController.js';

const deleteMedia = async (req, res) => {
  const id = req.params.id;
  const media = mediaController.deleteMedia(id);
  if (media) res.status(200).json(media);
  else res.status(404).json({message: `Media with id ${id} not found`});
};

export default deleteMedia;
