import multer from 'multer';

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) =>
    cb(
      null,
      file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')
    ),
});
export default upload;
