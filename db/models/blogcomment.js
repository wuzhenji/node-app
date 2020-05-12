'use strict';
module.exports = (sequelize, DataTypes) => {
  const blogcomment = sequelize.define('blogcomment', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    blogid: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  blogcomment.associate = function(models) {
    // associations can be defined here
  };
  return blogcomment;
};