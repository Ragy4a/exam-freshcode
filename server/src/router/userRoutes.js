const { Router } = require('express');
const userController = require('../controllers/userController');
const validators = require('../middlewares/validators');
const hashPass = require('../middlewares/hashPassMiddle');
const checkToken = require('../middlewares/checkToken');
const { uploadAvatar } = require('../utils/fileUpload');
const basicMiddlewares = require('../middlewares/basicMiddlewares');

const router = new Router();

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

router.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

router.get(
  '/getUser',
  checkToken.checkAuth,
);

router.post(
  '/updateUser',
  checkToken.checkToken,
  uploadAvatar.single('avatar'),
  userController.updateUser,
);

router.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

router.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

module.exports = router;