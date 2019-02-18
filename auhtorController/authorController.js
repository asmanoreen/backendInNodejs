const db = require('../Models/mainModel');
const Author = db.author;
const Book = db.book;
var cloudinary = require('../cloudinary.js').cloudinary;

function addAuthor(req, res) {

  console.log(req.body);
  console.log(JSON.parse(req.body.bookName));
  var obj = JSON.parse(req.body.bookName)
    console.log(req.file);
    console.log(req.file.path);
    var authorImg = req.file.path;

    cloudinary.uploader.upload(authorImg,function(result) {
                      console.log(result.url);
                      if(result.url){
                        console.log("create url");

                        Author.create({
                          authorName: req.body.authorName,
                          dateOfBirth:req.body.dateOfBirth,
                          placeOfBirth:req.body.placeOfBirth,
                          authorImg:result.url

                        }).then(users => {

                          console.log(users);

                          return users

                        }).then(users => {

                          console.log(users);
                          var i;
                          for(i = 0; i < obj.length; i++) {
                            console.log(obj[i].bookId);
                              Book.findOne({ where: { bookId:  obj[i].bookId  } }).then(result => {
                                console.log(result.book);
                                result.addWriters(users).then(users => {
                                  if(users){ res.json({ success:true })
                                    console.log("success"); }
                                  else { res.json({ success:false }) } })
                                });
                          }
                        })
                      .catch(err => res.json({ success:false }))



                       }
                      else {
                        console.log("some wrong with cloudinary funtion");
                      }
                    },{ resource_type: "auto"});

}

function authorRecord(req, res) {

  pageLimit = req.params.pageLimit;
  pageOffset = req.params.pageOffset;

  console.log(pageLimit, pageOffset);

  Author.count()
    .then(usersCount => {
      console.log("userCount---------------",usersCount);
      if (usersCount) {
        Author.findAll({
           offset: pageOffset,
           limit: pageLimit ,
           order: [['authorId', 'DESC']] ,
           include: [{
       			model:Book, as: 'Tasks',
       			attributes: ['bookName'],
       			through: {
       				attributes: ['bookId', 'authorId'],
       			}
       		  }]
         })
          .then(users => {
            console.log("users findAll :",users);
            var my_next = null, my_previous = null;
            if (users) {
              console.log(pageOffset, pageOffset * pageLimit);
              if (pageOffset * pageLimit < usersCount) {
                my_next = "http://localhost:3000/getauthorrecord/" + (parseInt(pageLimit)) + "/" + (parseInt(pageOffset) + 1);
              }
              console.log(pageOffset != 0);
              if (pageOffset != 0) {
                my_previous = "http://localhost:3000/getauthorrecord/" + (parseInt(pageLimit)) + "/" + (parseInt(pageOffset) - 1);
              }
              res.json({
                usersListCount: usersCount,
                next: my_next,
                previous: my_previous,
                bookObj: users,
                success: true
              })
              console.log("success");
            }
            else { res.json({
              "wrong":"findAll else part",
              success: false
             }) }
          })
        console.log("user list :" ,usersCount, "success");
      }
      else { res.json({
          "wrong":"findAndCountAll else part",
          success: false
       }) }
    })
    .catch(err => res.json({
          "wrong":"findAndCountAll catch part",
          success: false
     }))

}

function authorById(req, res) {

  console.log("id..............", req.params.id);

  Author.findAll({ where: { authorId: req.params.id } })
    .then(users => {
      if (users) {
        res.json({
          bookObj: users,
          success: true
        })
        console.log("success");
      }
      else { res.json({ success: false }) }
    })
    .catch(err => res.json(users))

}

function updateAuhtor(req, res) {

  console.log(req.params);
  console.log(req.body);
  console.log(req.file);
  if (req.file == undefined) {
    Author.update(
      {
        authorName: req.body.authorName,
        dateOfBirth: req.body.dateOfBirth,
        placeOfBirth: req.body.placeOfBirth
      },
      { where: { authorId: req.params.id, } })
      .then(users => {
        if (users) {
          res.json({ success: true })
          console.log("success");
        }
        else { res.json({ success: false }) }
      })
      .catch(err => res.json(users))

  } else {
    console.log(req.file);
    var authorImgFile = req.file.path;
    cloudinary.uploader.upload(authorImgFile, function (result) {
      console.log(result.url);
      if (result.url) {
        console.log("create url");

        Author.update(
          {
            authorName: req.body.authorName,
            dateOfBirth: req.body.dateOfBirth,
            placeOfBirth: req.body.placeOfBirth,
            authorImg: result.url
          },
          { where: { authorId: req.params.id, } })
          .then(users => {
            if (users) {
              res.json({ success: true })
              console.log("success");
            }
            else { res.json({ success: false }) }
          })
          .catch(err => res.json(users))

      }

      else {
        console.log("some wrong with cloudinary funtion");
      }
    }, { resource_type: "auto" });

  }

}

function deleteAuthor(req, res) {

  console.log(req.params);

  Author.destroy({ where: { authorId: req.params.id, } })
    .then(users => {
      if (users) {
        res.json({ success: true })
        console.log("success");
      }
      else { res.json({ success: false }) }
    })
    .catch(err => res.json(users))
}




function addBook(req, res) {

	Book.create({
    bookName: req.body.bookName,
    publishDate: req.body.publishDate,
    bookCoverImg:"hgsgfxjxjvxvjghgfxcvb",
    likes:5,
    dislikes:8
})
.then(users => {
    if(users){ res.json({ success:true })
      console.log("success"); }
    else { res.json({ success:false }) } })
.catch(err => res.json(users))

}

function getAll(req, res) {

	// Book.findAll({
	// 	attributes: ['bookName', 'likes'],
	// 	include: [{
	// 		model:Author, as: 'Writers',
	// 		// attributes: [['authorName', 'bookName'], 'authorImg'],
	// 		through: {
	// 			attributes: ['bookId', 'authorId'],
	// 		}
	// 	  }]
	// }).then(projects => {
	//    res.send(projects);
	// });

  Author.findAll({
		attributes: ['authorName', 'authorImg'],
		include: [{
			model:Book, as: 'Tasks',
			attributes: [['bookName', 'authorName']],
			through: {
				attributes: ['bookId', 'authorId'],
			}
		  }]
	}).then(projects => {
    console.log(projects[0].Tasks);
	   res.send(projects);
	});



}

function allBooks(req, res) {

  Book.findAll({})
    .then(users => {
      if (users) {
        res.json({
          bookObj: users,
          success: true
        })
        console.log("===========================All Books Function===================================");
        console.log(users,"success");
      }
      else { res.json({ success: false }) }
    })
    .catch(err => res.json(users))

}


module.exports = {

  authorRecord: authorRecord,
  addAuthor: addAuthor,
  authorById: authorById,
  updateAuhtor: updateAuhtor,
  deleteAuthor: deleteAuthor,
  allBooks: allBooks,
  getAll:getAll,
  addBook:addBook

};
