'use strict';
module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('blog', {
    title: DataTypes.STRING,
    tagid: DataTypes.STRING,
    content: DataTypes.TEXT,
    html: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  blog.associate = function (models) {
    // associations can be defined here
  };
  return blog;
};