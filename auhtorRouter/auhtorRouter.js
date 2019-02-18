var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var app = express();
var upload = multer({ dest: 'uploads/' });

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var router = express.Router();
var con = require('../auhtorController/authorController');

router.use(bodyParser.json());


// router.post('/addauthor',urlencodedParser,con.addAuthor);
router.post('/addbookk',con.addBook);
router.get('/getall',con.getAll);



router.get('/getauthorrecord/:pageLimit/:pageOffset', con.authorRecord);
router.get('/getallbook', con.allBooks);
router.get('/getauthor/:id', con.authorById);
router.post('/addauthor',upload.single('avatar'),con.addAuthor);
router.post('/addauthor',con.addAuthor);
router.put('/updateauthor/:id',upload.single('avatar'), con.updateAuhtor);
router.delete('/deleteauthor/:id', con.deleteAuthor);

module.exports = router;
