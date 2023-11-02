import mediaController from '../../controller/mediaController.js';

const postMedia = (req, res) => {
  const media = req.body;
  if (media.filename && media.title && media.media_type) {
    mediaController.addMedia(media);
    res.status(201).json(media);
  } else res.status(400).json({message: 'No media data provided'});
};

export default postMedia;
