import React, { useState } from 'react';
import API from '../src/services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [serverError, setServerError] = useState(''); // <-- New state for server error message
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({ name: '', email: '', password: '', confirmPassword: '' });
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setServerError(''); // Clear error when toggling
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setServerError(''); // Clear server error on any input change
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Username is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
        valid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setServerError(''); // Clear previous server error

    try {
      let response;
      if (isLogin) {
        response = await API.post('/auth/login', {
          email: formData.email,
          password: formData.password
        });
      } else {
        response = await API.post('/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setLoading(false);
      navigate('/'); // Navigate on success to /tasks
    } catch (error) {
      setLoading(false);
      const errorData = error.response?.data;
      if (errorData?.errors) {
        setErrors(errorData.errors);
      } else if (errorData?.message) {
        setServerError(errorData.message); // Show server error message here
      } else {
        setServerError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="hero bg-gradient-to-b from-black via-[#AC2898] to-white min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-row md:flex-row items-center justify-center w-full max-w-5xl gap-10">
        {/* Left side */}
        <div className="text-center md:text-left flex-1">
          <div className="max-w-md mx-auto md:mx-0">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">Welcome!</h1>
            <div className="text-3xl md:text-4xl py-6">
              <span className="text-white">Task</span>
              <span className="text-white">Trail</span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="w-[120px] h-[45px] text-white font-medium text-lg rounded-lg bg-gradient-to-r from-[#421B41] to-[#AC2898]
                hover:bg-gradient-to-r hover:from-[#AC2898] hover:to-[#421B41] transition-all duration-300
                shadow-lg hover:shadow-[#421B41]/50 hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right side: Form */}
        {showForm && (
          <div className="bg-gradient-to-b from-white to-[#FFEDED] rounded-xl shadow-2xl w-full max-w-sm p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
            
            {/* Server error message */}
            {serverError && (
              <p className="text-red-600 text-center mb-4 font-medium">{serverError}</p>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AC2898] focus:border-transparent text-black`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
              )}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AC2898] focus:border-transparent text-black`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AC2898] focus:border-transparent text-black`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              {!isLogin && (
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AC2898] focus:border-transparent text-black`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[45px] bg-gradient-to-r from-[#421B41] to-[#AC2898] text-white font-medium rounded-lg 
                  hover:bg-gradient-to-r hover:from-[#AC2898] hover:to-[#421B41] transition-all duration-300
                  shadow-md hover:shadow-[#421B41]/50 hover:scale-[1.01]"
              >
                {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
              </button>
              <div className="text-center text-sm text-gray-600 mt-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="ml-1 text-[#AC2898] font-medium hover:text-[#421B41] focus:outline-none"
                  aria-pressed={!isLogin}
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
