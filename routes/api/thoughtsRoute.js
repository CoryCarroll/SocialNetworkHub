const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// path: /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// path: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).post(createThought).delete(removeThought);

// path: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction).delete(removeReaction);

// path: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;