'use strict';
module.exports = (sequelize, DataTypes) => {
  const linktag = sequelize.define('linktag', {
    name: DataTypes.STRING
  }, {});
  linktag.associate = function(models) {
    // associations can be defined here
  };
  return linktag;
};