import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Home'
import Login from './Login'
import TasksPage from './TasksPage'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/taskspage" element={<TasksPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
