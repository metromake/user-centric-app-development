import express from 'express';

const router = express.Router();

router.route('/').get((req, res, next) => {
  res.render('index', {title: 'REST API'});
});

export default router;
