const express = require('express');
const router = express.Router();
const catchAsync = require('../utility/catchAsync');
const {
  index,
  renderNewForm,
  createCampground,
  showCampground,
  renderEditForm,
  updateCampground,
  deleteCampground
} = require('../controllers/campgrounds');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
  .get(catchAsync(index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(createCampground));
router.get('/new', isLoggedIn, renderNewForm);
router.route('/:id')
  .get(catchAsync(showCampground))
  .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground));
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(renderEditForm));

module.exports = router;