const Task = require('../models/Task');
const mongoose = require('mongoose');

// @desc    Get all tasks for user (with optional filters)
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const { urgency, completed } = req.query;
    const filter = { user: req.user._id };

    if (urgency) filter.urgency = urgency;
    if (completed !== undefined) filter.completed = completed === 'true';

    const tasks = await Task.find(filter).sort('-createdAt');
    res.status(200).json(tasks); // ✅ Send pure array
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    const { title, description, urgency } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const newTask = await Task.create({
      user: req.user._id,
      title: title.trim(),
      description: description?.trim(),
      urgency
    });

    res.status(201).json({ success: true, task: newTask });
  } catch (err) {
    console.error('Error creating task:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }

    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const updates = {};
    if (req.body.title) updates.title = req.body.title.trim();
    if (req.body.description) updates.description = req.body.description.trim();
    if (req.body.urgency) updates.urgency = req.body.urgency;
    if (typeof req.body.completed === 'boolean') updates.completed = req.body.completed;

    task = await Task.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({ success: true, task });
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Task.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
