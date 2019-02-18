module.exports = (sequelize, Sequelize) => {

    const Book = sequelize.define('book', {
        bookId:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        bookName: {
          type: Sequelize.STRING
        },
        publishDate: {
          type: Sequelize.DATE
        },
        bookCoverImg: {
          type:Sequelize.STRING
        },
        likes:{
          type:Sequelize.INTEGER
        },
        dislikes:{
          type:Sequelize.INTEGER
        }
      });

	return Book;
} 
