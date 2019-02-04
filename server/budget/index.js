/*
Router für Budgets

Definierte Routen für Select All, Select One, Update, Insert und Delete-Befehl

Router ruft Methoden aus den Budget-Controller auf
Zusätzlich muss bei jeder Route die checkAuth für die Authentifizierung mitgegeben werden.
 */

const Router = require('express').Router;
const {listAction, createAction,detailAction, updateAction, deleteAction} = require('./controller');
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
