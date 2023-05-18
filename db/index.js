const Sequelize = require("sequelize");
const { STRING, INTEGERS } = Sequelize;

const db = new Sequelize(`postgres://localhost:5432/bookmarker`, {
  logging: false, // so we don't see all the SQL queries getting made
});

const Bookmark = db.define("bookmark", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  url: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
//   categoryID: {},
});

const Category = db.define("category", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Bookmark.belongsTo(Category);
Category.hasMany(Bookmark);

module.exports = {
    db,
    Bookmark,
    Category
}