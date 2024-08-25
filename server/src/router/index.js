const { Router } = require('express');
const userRoutes = require('./userRoutes');
const contestRoutes = require('./contestRoutes');
const chatRoutes = require('./chatRoutes');

const router = new Router();

router.use('/user', userRoutes);
router.use('/contest', contestRoutes);
router.use('/chat', chatRoutes);

module.exports = router;