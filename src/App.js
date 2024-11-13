import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Components/HomePage'
import Navbar from './Components/Navbar';
import LoginUser from './Components/LoginUser';
import Register from './Components/Register';
import { AuthProvider } from './AuthContext';
import Profile from './Components/Profile';
import InstructorDashboard from './Components/instructorsComponents/InstructorDashboard';
import StudentDashboard from './Components/studentComponents/StudentDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/instructorDashboard" element={<InstructorDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path='/login' element={<LoginUser />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          {/* Redirect example: */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
