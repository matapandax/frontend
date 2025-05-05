import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Correct interface name: PascalCase
interface Transaction {
  id: number;
  kodeTransaksi: string;
  namaPeserta: string;
  mataKuliah: string;
  namaDosen: string;
  tipeTransaksi: string;
  metodePembayaran: string;
  tanggal: string;
}

// ✅ Properly typed initial data
const initialData: Transaction[] = [
  {
    id: 1,
    kodeTransaksi: "0001075603",
    namaPeserta: "Kirana Fathaya",
    mataKuliah: "Jaringan Nirkabel",
    namaDosen: "Dr. Kirana Fathaya",
    tipeTransaksi: "Voucher",
    metodePembayaran: "BRI",
    tanggal: "2025-04-01",
  },
  {
    id: 2,
    kodeTransaksi: "0001063203",
    namaPeserta: "Dimas Prada",
    mataKuliah: "Rekayasa Perangkat Lunak",
    namaDosen: "Dr. Dimas Prada",
    tipeTransaksi: "Normal",
    metodePembayaran: "OVO",
    tanggal: "2025-04-10",
  },
];

const TransactionTable: React.FC = () => {
  const [data, setData] = useState<Transaction[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = data.filter((item) =>
    item.namaPeserta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { name: "Kode", selector: (row: Transaction) => row.kodeTransaksi, sortable: true },
    { name: "Nama Peserta", selector: (row: Transaction) => row.namaPeserta, sortable: true },
    { name: "Mata Kuliah", selector: (row: Transaction) => row.mataKuliah, sortable: true },
    { name: "Nama Dosen", selector: (row: Transaction) => row.namaDosen },
    { name: "Tipe", selector: (row: Transaction) => row.tipeTransaksi },
    { name: "Pembayaran", selector: (row: Transaction) => row.metodePembayaran },
    { name: "Tanggal", selector: (row: Transaction) => row.tanggal },
    {
      name: "Aksi",
      cell: (row: Transaction) => (
        <button
          className="text-blue-600 hover:underline"
          onClick={() => {
            setSelectedRow(row);
            setIsModalOpen(true);
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
    const headers = ["Kode", "Nama Peserta", "Mata Kuliah", "Nama Dosen", "Tipe", "Pembayaran", "Tanggal"];
    const rows = filteredData.map((item) => [
      item.kodeTransaksi,
      item.namaPeserta,
      item.mataKuliah,
      item.namaDosen,
      item.tipeTransaksi,
      item.metodePembayaran,
      item.tanggal,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "laporan-transaksi.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Cari nama peserta..."
          className="border border-gray-300 rounded px-3 py-2 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={downloadCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download CSV
        </button>
      </div>

      {/* DataTable */}
      <DataTable
        title="Data Transaksi"
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        noHeader
      />

      {/* Modal Detail */}
      {isModalOpen && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Detail Transaksi</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Kode:</strong> {selectedRow.kodeTransaksi}</p>
              <p><strong>Nama Peserta:</strong> {selectedRow.namaPeserta}</p>
              <p><strong>Mata Kuliah:</strong> {selectedRow.mataKuliah}</p>
              <p><strong>Nama Dosen:</strong> {selectedRow.namaDosen}</p>
              <p><strong>Tipe Transaksi:</strong> {selectedRow.tipeTransaksi}</p>
              <p><strong>Pembayaran:</strong> {selectedRow.metodePembayaran}</p>
              <p><strong>Tanggal:</strong> {selectedRow.tanggal}</p>
            </div>
            <div className="mt-4 text-right">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default TransactionTable;
