import React, { useState } from "react";
import ChartJumlahMataKuliah from "../components/ChartJumlahMatakuliah";
import ChartGender from "../components/ChartGender";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialData = [
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

const Outbound: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(initialData);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<any>({});

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      cell: (row: any) => (
        <button
          className="detail-btn"
          onClick={() => {
            setSelectedRow(row);
            setEditedData(row);
            setIsModalOpen(true);
            setEditMode(false);
          }}
        >
          Detail
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const downloadCSV = () => {
    const headers = ["No", "Nama Peserta", "Jenis Kelamin", "Email", "Mata Kuliah", "Status", "Harga"];
    const rows = filteredData.map((item) => [
      item.no,
      item.nama,
      item.gender,
      item.email,
      item.matkul,
      item.status,
      item.harga,
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "laporan-peserta-outbound.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="outbound-header">
        <h1>Peserta Outbound</h1>
        <p>&lt;Lorem ipsum dolor sit amet, consectetur adipiscing elit&gt;</p>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards-grid">
        {[
          { title: "Total Peserta", value: 375 },
          { title: "Progress", value: 40 },
          { title: "Lulus", value: 312 },
          { title: "Tidak Lulus", value: 23 },
        ].map((item, index) => (
          <div key={index} className="stat-card-red">
            <h2>{item.title}</h2>
            <div className="stat-number">{item.value}</div>
            <button className="stat-btn">Details</button>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-section flex flex-wrap justify-center gap-6 mb-10">
        <div className="chart-box" style={{ width: "515px", height: "400px", flex: "none" }}>
          <h3 className="chart-title">Jumlah Peserta per Mata Kuliah</h3>
          <ChartJumlahMataKuliah />
        </div>
        <div className="chart-box" style={{ width: "515px", height: "400px", flex: "none" }}>
          <h3 className="chart-title">Distribusi Gender Peserta</h3>
          <ChartGender />
        </div>
      </div>

      {/* Toolbar */}
      <div className="outbound-toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Cari nama peserta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={downloadCSV} className="download-report-btn">
          Download Report (CSV)
        </button>
      </div>

      {/* DataTable */}
      <div className="outbound-table">
        <DataTable
          title="Daftar Peserta Outbound"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
        />
      </div>

      {/* Modal Detail / Edit / Hapus */}
      {isModalOpen && selectedRow && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <h2>Detail Peserta</h2>

            {editMode ? (
              <>
                <input
                  className="modal-input"
                  value={editedData.nama}
                  onChange={(e) => setEditedData({ ...editedData, nama: e.target.value })}
                />
                <input
                  className="modal-input"
                  value={editedData.email}
                  onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                />
                <input
                  className="modal-input"
                  value={editedData.matkul}
                  onChange={(e) => setEditedData({ ...editedData, matkul: e.target.value })}
                />
              </>
            ) : (
              <>
                <p><strong>Nama:</strong> {selectedRow.nama}</p>
                <p><strong>Email:</strong> {selectedRow.email}</p>
                <p><strong>Jenis Kelamin:</strong> {selectedRow.gender}</p>
                <p><strong>Mata Kuliah:</strong> {selectedRow.matkul}</p>
                <p><strong>Status:</strong> {selectedRow.status}</p>
                <p><strong>Harga:</strong> {selectedRow.harga}</p>
              </>
            )}

            <div className="modal-actions">
              {editMode ? (
                <button
                  className="save-btn"
                  onClick={() => {
                    const updated = data.map((item) =>
                      item.no === selectedRow.no ? editedData : item
                    );
                    setData(updated);
                    setIsModalOpen(false);
                    toast.success("Data berhasil diperbarui!");
                  }}
                >
                  Simpan
                </button>
              ) : (
                <button className="edit-btn" onClick={() => setEditMode(true)}>
                  Edit
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => {
                  const filtered = data.filter((item) => item.no !== selectedRow.no);
                  setData(filtered);
                  setIsModalOpen(false);
                  toast.success("Data berhasil dihapus!");
                }}
              >
                Hapus
              </button>

              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <ToastContainer />
    </div>
  );
};

export default Outbound;
