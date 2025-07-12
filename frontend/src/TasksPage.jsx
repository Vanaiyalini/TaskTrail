import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiFilter, FiCheck, FiEdit2, FiTrash2, FiClock, FiFlag, FiPlus } from 'react-icons/fi';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    urgency: 'low',
  });
  const [addingTask, setAddingTask] = useState(false);
  const [addFormData, setAddFormData] = useState({
    title: '',
    description: '',
    urgency: 'low',
  });

  const fetchTasks = async () => {
    try {
      let url = '/api/tasks';
      if (filter !== 'all') url += `?urgency=${filter}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  useEffect(() => {
    if (editingTask) {
      setEditFormData({
        title: editingTask.title,
        description: editingTask.description,
        urgency: editingTask.urgency,
      });
    }
  }, [editingTask]);

  const toggleFilterOpen = () => setFilterOpen(prev => !prev);

  const handleFilterChange = (value) => {
    setFilter(value);
    setFilterOpen(false);
  };

  const toggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t._id === taskId);
      if (!task) return;

      await axios.put(
        `/api/tasks/${taskId}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveTaskChanges = async () => {
    try {
      await axios.put(
        `/api/tasks/${editingTask._id}`,
        editFormData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveNewTask = async () => {
    try {
      await axios.post(
        '/api/tasks',
        addFormData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setAddingTask(false);
      setAddFormData({ title: '', description: '', urgency: 'low' });
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.urgency === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-[#AC2898]">My</span> Tasks
          </h1>

          <div className="relative">
            <button
              onClick={toggleFilterOpen}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              <FiFilter />
              <span>Filter</span>
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                {['all', 'high', 'medium', 'low'].map(level => (
                  <button
                    key={level}
                    onClick={() => handleFilterChange(level)}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      filter === level ? 'bg-[#FFEDED] text-[#AC2898]' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {level === 'all' ? 'All Tasks' : `${level.charAt(0).toUpperCase() + level.slice(1)} Urgency`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks found. Create a new task to get started!</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div
                key={task._id}
                className={`bg-white rounded-xl shadow-sm p-4 border-l-4 ${
                  task.urgency === 'high'
                    ? 'border-red-500'
                    : task.urgency === 'medium'
                    ? 'border-yellow-500'
                    : 'border-green-500'
                } ${task.completed ? 'opacity-70' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleComplete(task._id)}
                      className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border ${
                        task.completed ? 'bg-[#AC2898] border-[#AC2898] text-white' : 'border-gray-300'
                      }`}
                    >
                      {task.completed && <FiCheck className="w-3 h-3 mx-auto" />}
                    </button>
                    <div>
                      <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="p-2 text-gray-500 hover:text-[#AC2898] hover:bg-[#FFEDED] rounded-full"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add new task button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setAddingTask(true)}
            className="bg-[#AC2898] text-white p-4 rounded-full shadow-lg hover:bg-[#921f7a] transition-colors"
          >
            <FiPlus className="w-6 h-6" />
          </button>
        </div>

        {/* Add Task Modal */}
        {addingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Task</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={addFormData.title}
                    onChange={handleAddChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#AC2898] focus:border-[#AC2898]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={addFormData.description}
                    onChange={handleAddChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#AC2898] focus:border-[#AC2898]"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                  <select
                    name="urgency"
                    value={addFormData.urgency}
                    onChange={handleAddChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#AC2898] focus:border-[#AC2898]"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setAddingTask(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveNewTask}
                    className="px-4 py-2 bg-[#AC2898] text-white rounded-lg hover:bg-[#921f7a]"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Task Modal */}
        {editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Task</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#AC2898] focus:border-[#AC2898]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#AC2898] focus:border-[#AC2898]"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                  <select
                    name="urgency"
                    value={editFormData.urgency}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#AC2898] focus:border-[#AC2898]"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setEditingTask(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveTaskChanges}
                    className="px-4 py-2 bg-[#AC2898] text-white rounded-lg hover:bg-[#921f7a]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
