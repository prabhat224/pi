import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './pages/Home'; // Assuming you have a Home component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm isLogin={true} />} />
        <Route path="/signup" element={<AuthForm isSignup={true} />} />
      </Routes>
    </Router>
  );
};

export default App;
