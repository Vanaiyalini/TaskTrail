const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

// Protect all /api/tasks routes
router.use(protect);

// Routes
router.get('/', getTasks);          // GET all tasks for logged in user
router.post('/', createTask);       // POST a new task
router.put('/:id', updateTask);     // PUT to update a task
router.delete('/:id', deleteTask);  // DELETE a task

module.exports = router;
