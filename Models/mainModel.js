const Sequelize = require('sequelize');
const sequelize = new Sequelize('bookdb', 'user_1', 'test123', {
  dialect: 'postgres',
  host: "localhost",
  port: 5432,
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.book = require('./Book')(sequelize, Sequelize);
db.author = require('./Author')(sequelize, Sequelize);

db.book.belongsToMany(db.author, { as: 'Writers', through: 'writer_tasks', foreignKey: 'bookId', otherKey: 'authorId'});
db.author.belongsToMany(db.book, { as: 'Tasks', through: 'writer_tasks', foreignKey: 'authorId', otherKey: 'bookId'});


module.exports = db; 
