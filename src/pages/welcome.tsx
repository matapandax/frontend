import React from "react";
import { Link } from "react-router-dom";

const Welcome: React.FC = () => {
  return (
    <div className="welcome-page">
      <h1>
        Selamat Datang, <span className="highlight">Telkom University</span>
      </h1>

      <p>Halaman ini merupakan dashboard yang akan Anda gunakan.</p>

      <p>
        Untuk mengetahui program dan cara menggunakan dashboard ini, silakan
        kunjungi
        <a href="#" className="button">
          Panduan Dashboard Mitra
        </a>
        .
      </p>

      <p>Terima kasih.</p>

      {/* Tombol Next masuk kehalaman dashboard */}
      <Link to="/dashboard" className="next-btn">
        Next
      </Link>
    </div>
  );
};

export default Welcome;
