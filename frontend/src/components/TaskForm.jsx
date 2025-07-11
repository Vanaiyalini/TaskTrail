import React, { useState } from 'react';

const TaskForm = ({ onClose }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      task,
      description,
      taskType,
      urgency,
      dueDate,
    };
    console.log('Task Data:', taskData);
    onClose(); // Close form after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AC2898]"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AC2898]"
            required
          ></textarea>

          {/* Task Type Dropdown */}
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#AC2898]"
            required
          >
            <option value="" disabled>Select Task Type</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
            <option value="Other">Other</option>
          </select>

          {/* Urgency Dropdown */}
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#AC2898]"
            required
          >
            <option value="" disabled>Set Urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Due Date Picker */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AC2898]"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#421B41] to-[#AC2898] text-white py-2 rounded-full font-semibold hover:scale-105 transition-all"
          >
            Save Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
