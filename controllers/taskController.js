// api/controllers/taskController.js
const db = require('../models');
const Task = db.Tasks;

exports.getTasks = async (req, res) => {
  try {
    const taskList_Id = req.query.taskList_Id;
    const tasks = await Task.findAll({ where: { taskList_Id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tasks', error: err.message });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { taskList_Id, task_Title, task_Description, task_Priority, due_Date, color, owner_Id } = req.body;
    const task = await Task.create({
      taskList_Id,
      task_Title,
      task_Description,
      task_Priority,
      due_Date,
      color,
      owner_Id,
      task_Status: false,
      creation_Date: new Date(),
      update_Date: new Date()
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error adding task', error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { task_Title, task_Description, task_Status, task_Priority, due_Date, color } = req.body;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.task_Title = task_Title;
    task.task_Description = task_Description;
    task.task_Status = task_Status;
    task.task_Priority = task_Priority;
    task.due_Date = due_Date;
    task.color = color;
    task.update_Date = new Date();
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.destroy({ where: { task_Id: id } });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};
