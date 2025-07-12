import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status when component mounts
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleAddTaskClick = () => {
    if (isAuthenticated) {
      setShowForm(true);
    } else {
      alert('Please login to add a task');
      navigate('/login');
    }
  };

  // Features data
  const features = [
    {
      icon: '⏱️',
      title: 'Time Tracking',
      description: 'Monitor how much time you spend on each task with our built-in timer'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Get insights into your productivity with visual reports and statistics'
    },
    {
      icon: '🔔',
      title: 'Smart Reminders',
      description: 'Never miss a deadline with customizable notifications'
    },
    {
      icon: '🤝',
      title: 'Team Collaboration',
      description: 'Share tasks and projects with your team members seamlessly'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      quote: 'TaskTrail has transformed how our team works. Our productivity increased by 40% in just two months!',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'Freelance Developer',
      quote: 'As a solo developer, I need to stay organized. TaskTrail keeps all my projects on track effortlessly.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Small Business Owner',
      quote: 'Simple yet powerful. Exactly what I needed to manage my growing business tasks.',
      avatar: '👩‍💼'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      {/* Hero Section */}
      <div className="bg-white min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-[#FFEDED]">
        <div className="text-center py-4 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Effortless task <br/>management, 
          <span className='bg-gradient-to-r from-[#AC2898] to-[#421B41] bg-clip-text text-transparent'>anytime</span></h1>

          <p className='text-[#646464] py-8'>Your daily work, digitalized. Ditch the paperwork and get organized with TaskTrail. 
          Your secure, centralized platform for tasks, docs and teamwork.</p>    

          <div className="flex justify-center gap-4">
            <button 
              onClick={handleAddTaskClick}
              className="px-12 py-3 text-white font-medium text-lg rounded-full bg-gradient-to-r from-[#421B41] to-[#AC2898] 
              hover:bg-gradient-to-r hover:from-[#AC2898] hover:to-[#421B41] transition-all duration-300
              shadow-lg hover:shadow-[#421B41]/50 hover:scale-105"
            >
              Add task
            </button>

            <button 
              className="px-8 py-3 font-medium text-lg rounded-full border-2 border-[#AC2898] text-[#AC2898]
              hover:bg-[#AC2898]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#AC2898]"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-white to-[#FFEDED]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-lg bg-white shadow-sm">
              <h3 className="text-4xl font-bold text-[#AC2898]">10K+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-sm">
              <h3 className="text-4xl font-bold text-[#AC2898]">500K+</h3>
              <p className="text-gray-600">Tasks Completed</p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-sm">
              <h3 className="text-4xl font-bold text-[#AC2898]">99.9%</h3>
              <p className="text-gray-600">Uptime</p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-sm">
              <h3 className="text-4xl font-bold text-[#AC2898]">24/7</h3>
              <p className="text-gray-600">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-r from-white to-[#FFEDED]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#AC2898]">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-gray-50 hover:bg-gradient-to-br hover:from-white hover:to-[#FFEDED] transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gradient-to-r from-white to-[#FFEDED]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#AC2898]">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-1 p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#AC2898] text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                <p className="text-gray-600">Sign up in seconds and start organizing your tasks immediately.</p>
              </div>
              <div className="flex-1 p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#AC2898] text-white flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Add Your Tasks</h3>
                <p className="text-gray-600">Quickly add tasks with deadlines, priorities, and categories.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#AC2898] text-white flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Organize & Prioritize</h3>
                <p className="text-gray-600">Drag and drop tasks to organize them by priority or project.</p>
              </div>
              <div className="flex-1 p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#AC2898] text-white flex items-center justify-center text-xl font-bold mb-4">4</div>
                <h3 className="text-xl font-semibold mb-2">Achieve Your Goals</h3>
                <p className="text-gray-600">Watch your productivity soar as you complete tasks efficiently.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gradient-to-r from-white to-[#FFEDED]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#AC2898]">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-lg bg-gray-50 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-[#421B41] to-[#AC2898] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Productivity?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of professionals who are already achieving more with TaskTrail.</p>
          <button 
            onClick={handleAddTaskClick}
            className="px-12 py-3 bg-white text-[#AC2898] font-medium text-lg rounded-full 
            hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </div>

      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setShowForm(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <TaskForm onClose={() => setShowForm(false)} />
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}

export default Home;