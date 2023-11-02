import mediaController from '../../controller/mediaController.js';

const getMedia = (req, res) => {
  const id = req.params.id;
  if (!id) res.status(200).json(mediaController.media);
  else {
    const media = mediaController.getMedia(id);
    if (media) res.status(200).json(media);
    else res.status(404).json({message: `Media with id ${id} not found`});
  }
};

export default getMedia;
