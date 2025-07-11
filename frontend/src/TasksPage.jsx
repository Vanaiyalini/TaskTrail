import React, { useState } from 'react';
import { FiFilter, FiCheck, FiEdit2, FiTrash2, FiClock, FiFlag } from 'react-icons/fi';

const TasksPage = () => {
  // Sample tasks data
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', description: 'Finish and submit the client project proposal', urgency: 'high', completed: false },
    { id: 2, title: 'Team meeting', description: 'Weekly team sync up', urgency: 'medium', completed: true },
    { id: 3, title: 'Update documentation', description: 'Update API documentation for new features', urgency: 'low', completed: false },
    { id: 4, title: 'Review pull requests', description: 'Review open PRs in the repository', urgency: 'high', completed: false },
  ]);

  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  // Filter tasks based on urgency
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.urgency === filter;
  });

  // Toggle task completion
  // const toggleComplete = (taskId) => {
  //   setTasks(tasks.map(task => 
  //     task.id === taskId ? { ...task, completed: !task.completed } : task
  //   ));
  // };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      let url = '/api/tasks';
      if (filter !== 'all') url += `?urgency=${filter}`;
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks(response.data);
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  // Toggle task completion
  const toggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      await axios.put(
        `/api/tasks/${taskId}`,
        { completed: !task.completed },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      fetchTasks();
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-[#AC2898]">My</span> Tasks
          </h1>
          
          {/* Filter dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
              <FiFilter />
              <span>Filter</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                <button 
                  onClick={() => setFilter('all')}
                  className={`block px-4 py-2 text-sm w-full text-left ${filter === 'all' ? 'bg-[#FFEDED] text-[#AC2898]' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  All Tasks
                </button>
                <button 
                  onClick={() => setFilter('high')}
                  className={`block px-4 py-2 text-sm w-full text-left ${filter === 'high' ? 'bg-[#FFEDED] text-[#AC2898]' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  High Urgency
                </button>
                <button 
                  onClick={() => setFilter('medium')}
                  className={`block px-4 py-2 text-sm w-full text-left ${filter === 'medium' ? 'bg-[#FFEDED] text-[#AC2898]' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Medium Urgency
                </button>
                <button 
                  onClick={() => setFilter('low')}
                  className={`block px-4 py-2 text-sm w-full text-left ${filter === 'low' ? 'bg-[#FFEDED] text-[#AC2898]' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Low Urgency
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks list */}
        <div className="grid gap-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks found. Create a new task to get started!</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`bg-white rounded-xl shadow-sm p-4 border-l-4 ${task.urgency === 'high' ? 'border-red-500' : task.urgency === 'medium' ? 'border-yellow-500' : 'border-green-500'} ${task.completed ? 'opacity-70' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => toggleComplete(task.id)}
                      className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border ${task.completed ? 'bg-[#AC2898] border-[#AC2898] text-white' : 'border-gray-300'}`}
                    >
                      {task.completed && <FiCheck className="w-3 h-3 mx-auto" />}
                    </button>
                    <div>
                      <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${task.urgency === 'high' ? 'bg-red-100 text-red-800' : task.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {task.urgency === 'high' ? <FiFlag className="w-3 h-3" /> : <FiClock className="w-3 h-3" />}
                          {task.urgency} priority
                        </span>
                      </div>
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
                      onClick={() => deleteTask(task.id)}
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
          <button className="bg-[#AC2898] text-white p-4 rounded-full shadow-lg hover:bg-[#921f7a] transition-colors">
            <span className="text-xl">+</span>
          </button>
        </div>

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
                    defaultValue={editingTask.title}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#AC2898] focus:border-[#AC2898]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    defaultValue={editingTask.description}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#AC2898] focus:border-[#AC2898]"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                  <select 
                    defaultValue={editingTask.urgency}
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