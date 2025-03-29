// api/controllers/tasklistController.js
const db = require('../models');
const TaskList = db.TaskLists;
const Task = db.Tasks;

exports.getTaskLists = async (req, res) => {
  try {
    const tasklists = await TaskList.findAll();
    res.json(tasklists);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving task lists', error: err.message });
  }
};

exports.addTaskList = async (req, res) => {
  try {
    const { list_Title, list_Description, color, owner_Id } = req.body;
    const tasklist = await TaskList.create({
      list_Title,
      list_Description,
      color,
      owner_Id,
      creation_Date: new Date(),
      update_Date: new Date()
    });
    res.json(tasklist);
  } catch (err) {
    res.status(500).json({ message: 'Error adding task list', error: err.message });
  }
};

exports.updateTaskList = async (req, res) => {
  try {
    const id = req.params.id;
    const { list_Title, list_Description, color } = req.body;
    const tasklist = await TaskList.findByPk(id);
    if (!tasklist) return res.status(404).json({ message: 'Task list not found' });
    tasklist.list_Title = list_Title;
    tasklist.list_Description = list_Description;
    tasklist.color = color;
    tasklist.update_Date = new Date();
    await tasklist.save();
    res.json(tasklist);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task list', error: err.message });
  }
};

exports.deleteTaskList = async (req, res) => {
  try {
    const id = req.params.id;
    // Delete tasks associated with the task list
    await Task.destroy({ where: { taskList_Id: id } });
    await TaskList.destroy({ where: { list_Id: id } });
    res.json({ message: 'Task list deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task list', error: err.message });
  }
};
