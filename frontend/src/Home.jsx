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

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
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
                    hover:bg-[#AC2898]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#AC2898]">
                    Learn more
                    </button>
              </div>
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

export default Home
