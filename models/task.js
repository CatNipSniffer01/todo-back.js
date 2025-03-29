// api/models/task.js
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
      task_Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      taskList_Id: { type: DataTypes.INTEGER, allowNull: false },
      task_Title: { type: DataTypes.STRING, allowNull: false },
      task_Description: { type: DataTypes.STRING },
      task_Status: { type: DataTypes.BOOLEAN, defaultValue: false },
      task_Priority: { type: DataTypes.ENUM('high', 'medium', 'low'), defaultValue: 'low' },
      due_Date: { type: DataTypes.DATE },
      creation_Date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      update_Date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      color: { type: DataTypes.STRING, defaultValue: '#ffffff' },
      owner_Id: { type: DataTypes.INTEGER }
  }, { timestamps: false });
  return Task;
};
