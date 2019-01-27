const Router = require('express').Router;
const {listAction, detailAction, createAction, updateAction, deleteAction} = require('./controller');
const router = Router();
const bodyParser = require('body-parser');
const checkAuth = require('../checkAuth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/', checkAuth, listAction);
router.get('/:id', checkAuth, detailAction);
router.post('/', checkAuth, createAction);
router.put('/:id',checkAuth,updateAction);
router.delete('/:id',checkAuth, deleteAction);



module.exports = router;
