module.exports = (sequelize, Sequelize) => {


  const Author = sequelize.define('author', {
    authorId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      authorName: {
          type: Sequelize.STRING
      },
      dateOfBirth: {
          type: Sequelize.DATE
      },
      placeOfBirth: {
          type: Sequelize.STRING
      },
      authorImg: {
        type:Sequelize.STRING
      }
    })

return Author;


} 
