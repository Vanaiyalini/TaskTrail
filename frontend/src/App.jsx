import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Home'
import Login from './Login'
import TasksPage from './TasksPage'
import TaskForm from './components/TaskForm';
import UserProfile from './UserProfile';
import AboutUs from './AboutUs';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/taskspage" element={<TasksPage />} />
          <Route path="/TaskForm" element={<TaskForm />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
