'use strict';
module.exports = (sequelize, DataTypes) => {
  const upload_file = sequelize.define('upload_file', {
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    type: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  upload_file.associate = function(models) {
    // associations can be defined here
  };
  return upload_file;
};