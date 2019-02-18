var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var app = express();
var upload = multer({ dest: 'uploads/' });
// const cors = require('cors');
// var corsOptions = {
//     origin: '*'
// };

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var router = express.Router();
var con = require('../bookController/bookController');

router.use(bodyParser.json());
// router.use(cors(corsOptions));
router.get('/getallauthor',con.allAuthors);
router.get('/getbookrecord/:pageLimit/:pageOffset', con.bookRecord);
router.get('/getrecord/:id', con.bookRecordbyid);
router.put('/addlikes/:id',urlencodedParser, con.addLikes);
router.put('/adddislikes/:id',urlencodedParser, con.addDisLikes);
router.get('/searchrecord/:searchText', con.searchRecord);
router.post('/addbook',upload.single('avatar'), con.addBook);
router.put('/updatebook/:id',upload.single('avatar'), con.updateBook);
router.delete('/deletebook/:id', con.deleteBook);

module.exports = router;
