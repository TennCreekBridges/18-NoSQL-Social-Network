// required
const router = require('express').Router();

// Thought routes
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

// api thoughts
router.route('/').get(getAllThoughts).post(createThought);

// api thoughts by :id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// api thought:id/reaction
router.route('/:thoughtId/reactions').post(createReaction);

// api thought:id/reaction:id
router.route('/:thoughtId/:reactionId').delete(deleteReaction);

// export thought routes
module.exports = router;
