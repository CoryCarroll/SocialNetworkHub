const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtsRoute = require('./thoughtsRoute');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoute);

module.exports = router;