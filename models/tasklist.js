// api/models/tasklist.js
module.exports = (sequelize, DataTypes) => {
  const TaskList = sequelize.define('TaskList', {
      list_Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      list_Title: { type: DataTypes.STRING, allowNull: false },
      list_Description: { type: DataTypes.STRING },
      creation_Date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      update_Date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      color: { type: DataTypes.STRING, defaultValue: '#ffffff' },
      owner_Id: { type: DataTypes.INTEGER }
  }, { timestamps: false });
  return TaskList;
};
