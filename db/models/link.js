'use strict';
module.exports = (sequelize, DataTypes) => {
  const link = sequelize.define('link', {
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    bg: DataTypes.STRING,
    url: DataTypes.STRING,
    tagid: DataTypes.INTEGER
  }, {});
  link.associate = function(models) {
    // associations can be defined here
  };
  return link;
};