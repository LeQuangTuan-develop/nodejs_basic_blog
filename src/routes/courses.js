const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CourseController');
router.get('/create', coursesController.create);
router.get('/:slug', coursesController.show);
router.get('/edit/:id', coursesController.edit);
router.post('/store', coursesController.store);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.destroy);
router.delete('/:id/force', coursesController.forceDestroy);
router.patch('/restore/:id/', coursesController.restore);
router.post('/handle-form-actions', coursesController.handleFormActions);

module.exports = router