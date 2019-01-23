const Router = require('express').Router;
const {listAction, deleteAction,formAction,saveAction} = require('./controller');
const router = Router();
const bodyParser = require('body-parser')
const checkAuth = require('../checkAuth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/', checkAuth, listAction);
router.get('/delete/:id', checkAuth, deleteAction);
router.get('/form/:id?', checkAuth, formAction);
router.post('/save', checkAuth, saveAction);



module.exports = router;
