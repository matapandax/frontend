import React from "react";
import ChartJumlahDosenGender from "../components/ChartJumlahDosenGender";
import ChartGender from "../components/ChartGender";
import DataTable from "react-data-table-component";

const columns = [
  { name: "No", selector: (row: any) => row.no, width: "60px" },
  { name: "Nama Peserta", selector: (row: any) => row.nama },
  { name: "Jenis Kelamin", selector: (row: any) => row.gender },
  { name: "Email", selector: (row: any) => row.email },
  { name: "Mata Kuliah", selector: (row: any) => row.matkul },
  {
    name: "Status",
    cell: (row: any) => (
      <span className={`status ${row.status === "Lulus" ? "lulus" : "tidak-lulus"}`}>
        {row.status}
      </span>
    ),
  },
  { name: "Harga", selector: (row: any) => row.harga },
  {
    name: "Aksi",
    cell: () => <button className="detail-btn">Detail</button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const data = [
  {
    no: 1,
    nama: "Kirana Fathaya",
    gender: "P",
    email: "kiranafath@gmail.com",
    matkul: "Jaringan Nirkabel",
    status: "Lulus",
    harga: "IDR 110.000",
  },
  {
    no: 2,
    nama: "Dimas Prada",
    gender: "L",
    email: "dimasprada@gmail.com",
    matkul: "Rekayasa Perangkat Lunak",
    status: "Tidak Lulus",
    harga: "IDR 120.000",
  },
];

const Dosen: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="outbound-header">
        <h1>Dosen Baru Terdaftar</h1>
        <p>&lt;Lorem ipsum dolor sit amet, consectetur adipiscing elit&gt;</p>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards-grid">
        {[{ title: "Total Dosen", value: 375 }, { title: "Dosen Aktif", value: 40 }, { title: "Dosen Tidak Aktif", value: 312 }, { title: "Dosen Baru Terdaftar", value: 23 }].map((item, index) => (
          <div key={index} className="stat-card-red">
            <h2>{item.title}</h2>
            <div className="stat-number">{item.value}</div>
            <button className="stat-btn">Details</button>
          </div>
        ))}
      </div>

      {/* Charts Section - Kanan Kiri */}
      <div className="charts-section flex flex-wrap justify-center gap-6 mb-10">
        <div
          className="chart-box"
          style={{ width: "515px", height: "400px", flex: "none" }}
        >
          <h3 className="chart-title">Jumlah Dosen per Mata Kuliah</h3>
          <ChartJumlahDosenGender />
        </div>
        <div
          className="chart-box"
          style={{ width: "515px", height: "400px", flex: "none" }}
        >
          <h3 className="chart-title">Distribusi Gender Dosen</h3>
          <ChartGender />
        </div>
      </div>

      {/* Toolbar */}
      <div className="outbound-toolbar">
        <select className="select-range">
          <option value="all">Pilih Rentang Waktu</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>

        <input type="text" className="search-input" placeholder="Cari nama peserta..." />
        <button className="download-report-btn">Download Report (CSV)</button>
      </div>

      {/* DataTable Peserta */}
      <div className="outbound-table">
        <DataTable
          title="Daftar Dosen"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default Dosen;
