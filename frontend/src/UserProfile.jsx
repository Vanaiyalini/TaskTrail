import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '👨‍💼',
    joinDate: 'January 15, 2023',
    tasksCompleted: 127,
    productivityScore: 88,
    bio: 'Product designer and productivity enthusiast. Love organizing my work with TaskTrail!'
  });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status when component mounts
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    // In a real app, you would fetch user data here
    // fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleEditClick = () => {
    setEditMode(true);
    setFormData({ ...userData });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserData(formData);
    setEditMode(false);
    // In a real app, you would save to the server here
    // saveProfileData(formData);
  };

  const handleAvatarChange = (newAvatar) => {
    setFormData({
      ...formData,
      avatar: newAvatar
    });
  };

  const avatarOptions = ['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '🧑‍🎨', '🧑‍🔬', '👨‍🍳', '👩‍🍳'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {!editMode ? (
                <button 
                  onClick={handleEditClick}
                  className="px-6 py-2 bg-gradient-to-r from-[#421B41] to-[#AC2898] text-white rounded-full hover:opacity-90 transition-all"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleCancelEdit}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="px-6 py-2 bg-gradient-to-r from-[#421B41] to-[#AC2898] text-white rounded-full hover:opacity-90 transition-all"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Avatar and Stats */}
                <div className="w-full md:w-1/3">
                  {editMode ? (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">Choose Avatar</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {avatarOptions.map((avatar, index) => (
                          <button
                            key={index}
                            onClick={() => handleAvatarChange(avatar)}
                            className={`text-3xl p-2 rounded-full ${formData.avatar === avatar ? 'ring-2 ring-[#AC2898] bg-[#FFEDED]' : 'hover:bg-gray-100'}`}
                          >
                            {avatar}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-8xl mb-6 flex justify-center md:justify-start">
                      {userData.avatar}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-500">Member Since</h3>
                      <p className="text-lg">{userData.joinDate}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-500">Tasks Completed</h3>
                      <p className="text-2xl font-bold text-[#AC2898]">{userData.tasksCompleted}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-500">Productivity Score</h3>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-gradient-to-r from-[#421B41] to-[#AC2898] h-2.5 rounded-full" 
                            style={{ width: `${userData.productivityScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{userData.productivityScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Profile Details */}
                <div className="w-full md:w-2/3">
                  {editMode ? (
                    <form onSubmit={handleSaveProfile}>
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#AC2898] focus:border-[#AC2898]"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#AC2898] focus:border-[#AC2898]"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Bio</label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#AC2898] focus:border-[#AC2898]"
                        ></textarea>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{userData.name}</h2>
                      <p className="text-gray-600 mb-6">{userData.email}</p>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">About Me</h3>
                        <p className="text-gray-700">{userData.bio}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="border-t border-gray-200 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#FFEDED] text-[#AC2898] p-2 rounded-full mr-4">
                    <span className="text-xl">✅</span>
                  </div>
                  <div>
                    <p className="font-medium">Completed task "Design new dashboard"</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#FFEDED] text-[#AC2898] p-2 rounded-full mr-4">
                    <span className="text-xl">📅</span>
                  </div>
                  <div>
                    <p className="font-medium">Created new task "Prepare project presentation"</p>
                    <p className="text-sm text-gray-500">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#FFEDED] text-[#AC2898] p-2 rounded-full mr-4">
                    <span className="text-xl">🔄</span>
                  </div>
                  <div>
                    <p className="font-medium">Updated profile information</p>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Productivity Insights */}
          <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6">Productivity Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-500 mb-2">Weekly Completion Rate</h4>
                  <p className="text-3xl font-bold text-[#AC2898]">92%</p>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-gradient-to-r from-[#421B41] to-[#AC2898] rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-500 mb-2">Average Tasks/Day</h4>
                  <p className="text-3xl font-bold text-[#AC2898]">8.4</p>
                  <p className="text-sm text-gray-500 mt-1">+1.2 from last week</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-500 mb-2">Focus Time</h4>
                  <p className="text-3xl font-bold text-[#AC2898]">6.2h</p>
                  <p className="text-sm text-gray-500 mt-1">Daily average</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    <Footer />
    </div>
  );
};

export default UserProfile;