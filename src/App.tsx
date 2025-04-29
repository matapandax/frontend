import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Login from './pages/login';
import Welcome from './pages/welcome';
import Dashboard from './pages/dashboard';
import Peserta from './pages/peserta';
import Dosen from './pages/dosen';
import Detailpeserta from './pages/detailPeserta';
import Transaksi from './pages/TransactionTable';

import Sidebar from './components/sidebar';
import Header from './components/header';
import Footer from './components/footer';

import './App.css';
import TransactionTable from './pages/TransactionTable';

// 🧩 Layout untuk halaman utama dengan Sidebar & Header
const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Outlet /> {/* Ini akan menampung semua route anaknya */}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root langsung ke login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login dan welcome tanpa layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />

        {/* Semua route yang pakai layout masuk ke sini */}
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dosen" element={<Dosen/>} />
          <Route path="peserta" element={<Peserta />} />
          <Route path="detail-peserta" element={<Detailpeserta />} />
          {/* <Route path="mata-kuliah" element={<MataKuliah />} /> */}
          {<Route path="transaksi" element={< TransactionTable/>} />}
          {/* Tambahkan halaman lainnya di sini */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
