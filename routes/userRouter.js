const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/userinfor', auth, userCtrl.getUserInfor);
router.get('/getAllMsgs', auth, userCtrl.getAllMsgs);
router.post('/postMsg', auth, userCtrl.postMsg);

// router.post('/sendMsg', auth, userCtrl.sendMsg);
module.exports = router;
