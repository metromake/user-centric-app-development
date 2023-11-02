import mediaController from '../../controller/mediaController.js';

const putMedia = async (req, res) => {
  const id = req.params.id;
  const media = req.body;
  if (media) {
    const updatedMedia = mediaController.updateMedia(id, media);
    if (updatedMedia) res.status(200).json(updatedMedia);
    else res.status(404).json({message: `Media with id ${id} not found`});
  } else res.status(400).json({message: 'No media data provided'});
};

export default putMedia;
