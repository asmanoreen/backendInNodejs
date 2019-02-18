const db = require('../Models/mainModel');
const Author = db.author;
const Book = db.book;
var cloudinary = require('../cloudinary.js').cloudinary;


function bookRecord(req, res) {

    pageLimit = req.params.pageLimit;
    pageOffset = req.params.pageOffset;

    console.log(pageLimit , pageOffset);

    Book.count()
    .then(usersCount => {
        if(usersCount){

          Book.findAll({
            offset: pageOffset ,
            limit: pageLimit ,
            order: [['bookId', 'DESC']],
            include: [{
             model:Author, as: 'Writers',
             through: {
               attributes: ['bookId', 'authorId'],
             }
             }]

            })
          .then(users => {
              var my_next = null, my_previous = null;
              if(users){
                console.log(pageOffset, pageOffset*pageLimit);
                if(pageOffset*pageLimit < usersCount){
                  my_next = "http://localhost:3000/getbookrecord/"  + (parseInt(pageLimit)) + "/" +  (parseInt(pageOffset)+1);
                }
                console.log(pageOffset != 0);
                if(pageOffset != 0){
                  my_previous = "http://localhost:3000/getbookrecord/" + (parseInt(pageLimit)) + "/" + (parseInt(pageOffset)-1);
                }
                res.json({
                  usersListCount:usersCount,
                  next: my_next,
                  previous: my_previous,
                  bookObj:users,
                  success:true
                  })
                  console.log("success"); }
              else { res.json({ success:false }) } })
          .catch(err => res.json(users))
            console.log(usersCount.count ,"success"); }
        else { res.json({ success:false }) } })
    .catch(err => res.json({ success:false }) )

}

function bookRecordbyid(req, res) {
  console.log(req.params.id);

    Book.findAll({ where: {  bookId: req.params.id } })
      .then(users => {
          if(users){ res.json({
              bookObj:users,
              success:true
              })
              console.log("success"); }
          else { res.json({ success:false }) } })
      .catch(err => res.json(users))

}

function addBook(req, res) {

  console.log(req.body);
  console.log(JSON.parse(req.body.authorName));
  var obj = JSON.parse(req.body.authorName);

  console.log(req.file);
  console.log(req.file.path);
  var bookCoverFile = req.file.path;
cloudinary.uploader.upload(bookCoverFile,function(result) {
                  console.log(result.url);
                  if(result.url){
                    console.log("create url");
                    Book.create({
                        bookName: req.body.bookName,
                        publishDate: req.body.publishDate,
                        bookCoverImg:result.url
                    }).then(users => {

                      console.log(users);

                      return users

                    }).then(users => {

                      console.log(users);
                      var i;
                      for(i = 0; i < obj.length; i++) {
                        console.log(obj[i].authorId);
                          Author.findOne({ where: { authorId:  obj[i].authorId  } }).then(result => {
                            console.log(result.author);
                            result.addTasks(users).then(users => {
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

function deleteBook(req, res) {

    console.log(req.params);

    Book.destroy({  where: { bookId: req.params.id, } })
        .then(users => {
          if(users){ res.json({ success:true })
            console.log("success"); }
          else { res.json({ success:false }) }  })
        .catch(err => res.json(users))
}

function updateBook(req, res) {

    console.log(req.params);
    console.log(req.body);
    console.log(req.file);
    if(req.file==undefined){
      Book.update(
          {
            // authorName: req.body.authorName,
            bookName: req.body.bookName,
            publishDate: req.body.publishDate,
          },
          { where: { bookId: req.params.id, } })
           .then(users => {
              if(users){ res.json({ success:true })
                  console.log("success");}
              else { res.json({ success:false }) }  })
          .catch(err => res.json(users))

    }else {
        console.log(req.file);
        var coverImgFile = req.file.path;
      cloudinary.uploader.upload(coverImgFile,function(result) {
                        console.log(result.url);
                        if(result.url){
                          console.log("create url");

                          Book.update(
                              {
                                // authorName: req.body.authorName,
                                bookName: req.body.bookName,
                                publishDate: req.body.publishDate,
                                bookCoverImg:result.url
                              },
                              { where: { bookId: req.params.id, } })
                               .then(users => {
                                  if(users){ res.json({ success:true })
                                      console.log("success");}
                                  else { res.json({ success:false }) }  })
                              .catch(err => res.json(users))

                         }

                        else {
                          console.log("some wrong with cloudinary funtion");
                        }
                      },{ resource_type: "auto"});


    }




}

function addLikes(req, res){
    var userdata;
  console.log(req.params);
  console.log(req.body.numberOfLikes);

  Book.findAll({ where: {  bookId: req.params.id } })
    .then(usersData => {
        if(usersData){
          userLike=usersData[0]['likes']+req.body.numberOfLikes;
          console.log(userLike);
          Book.update(
              {
                likes: userLike,
              },
              { where: { bookId: req.params.id } })
               .then(users => {
                  if(users){ res.json({ success:true }) }
                  else     { res.json({ success:false })}  }) }
        else { res.json({ success:false }) } })
    .catch(err => res.json({ success:false }))

}

function addDisLikes(req, res){

console.log("****************************************");
  console.log(req.params);
console.log("****************************************");
  console.log(req.body);
console.log("****************************************");

    Book.findAll({ where: {  bookId: req.params.id } })
      .then(usersData => {
          if(usersData){
            userDiskLike=usersData[0]['dislikes']+req.body.numberOfDisLikes;
            console.log(userDiskLike);
            Book.update(
                {
                  dislikes: userDiskLike
                },
                { where: { bookId: req.params.id, } })
                 .then(users => {
                    if(users){ res.json({ success:true }) }
                    else     { res.json({ success:false })}  }) }
          else { res.json({ success:false }) } })
      .catch(err => res.json({ success:false }))

}

function searchRecord(req, res) {

    console.log(req.params.searchText);

    Book.findAll({where: {authorName: {like: '%' +  req.params.searchText + '%'}}})
        .then(users => {
          if(users){  res.json({
              bookObj:users,
              success:true })
              console.log(users ,"success"); }
          else { res.json({ success:false }) } })
        .catch(err => res.json(users))
}

function allAuthors(req, res) {

  Author.findAll({})
    .then(users => {
      if (users) {
        res.json({
          bookObj: users,
          success: true
        })
        console.log(users,"success");
      }
      else { res.json({ success: false }) }
    })
    .catch(err => res.json(users))

}




module.exports = {

    addBook: addBook,
    bookRecord: bookRecord,
    deleteBook: deleteBook,
    updateBook: updateBook,
    bookRecordbyid:bookRecordbyid,
    searchRecord:searchRecord,
    addLikes:addLikes,
    addDisLikes:addDisLikes,
    allAuthors:allAuthors

};
