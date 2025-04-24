import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Peserta from './pages/peserta';
import Login from './pages/login';
import Sidebar from './components/sidebar';
import Header from './components/header';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Login route tanpa sidebar/header */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard & lainnya dengan layout */}
        <Route
          path="*"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Header />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/peserta" element={<Peserta />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
