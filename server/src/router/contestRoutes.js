const { Router } = require('express');
const contestController = require('../controllers/contestController');
const { payment } = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const { uploadContestFiles, updateContestFile, uploadLogoFiles } = require('../utils/fileUpload');
const validators = require('../middlewares/validators');

const router = new Router();

router.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest,
);

router.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  uploadContestFiles.array('fileName', 3),
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  payment,
);

router.post(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests,
);

router.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

router.post(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

router.post(
  '/updateContest',
  checkToken.checkToken,
  updateContestFile.single('fileName'),
  contestController.updateContest,
);

router.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile,
);

router.post(
  '/setNewOffer',
  checkToken.checkToken,
  uploadLogoFiles.array('fileName', 3),
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

router.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

module.exports = router;