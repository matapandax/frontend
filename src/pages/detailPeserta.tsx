import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReusableForm, { FormField } from '../components/datatable';

interface Peserta {
  id?: string;
  nama: string;
  jenisKelamin: string;
  instansi: string;
  email: string;
  mataKuliah: string;
  noTelp: string;
  alamat: string;
}

const FormPeserta: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [peserta, setPeserta] = useState<Peserta>({
    nama: '',
    jenisKelamin: '',
    instansi: '',
    email: '',
    mataKuliah: '',
    noTelp: '',
    alamat: ''
  });

  useEffect(() => {
    // Jika ada ID, berarti mode edit
    if (id) {
      setLoading(true);
      // Disini kita simulasikan fetch data
      setTimeout(() => {
        // Data dummy
        setPeserta({
          id,
          nama: 'Kirana Fathiya',
          jenisKelamin: 'P',
          instansi: 'Publik',
          email: 'kiranafath@gmail.com',
          mataKuliah: 'Jaringan Nirkabel',
          noTelp: '081234567890',
          alamat: 'Jl. Contoh No. 123, Jakarta'
        });
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  // Definisi fields untuk form
  const formFields: FormField[] = [
    {
      id: 'nama',
      label: 'Nama Lengkap',
      type: 'text',
      placeholder: 'Masukkan nama lengkap',
      value: peserta.nama,
      required: true,
      validation: (value) => {
        if (value.length < 3) return 'Nama harus minimal 3 karakter';
        return null;
      }
    },
    {
      id: 'jenisKelamin',
      label: 'Jenis Kelamin',
      type: 'radio',
      value: peserta.jenisKelamin,
      required: true,
      options: [
        { value: 'L', label: 'Laki-laki' },
        { value: 'P', label: 'Perempuan' }
      ]
    },
    {
      id: 'instansi',
      label: 'Instansi',
      type: 'select',
      placeholder: 'Pilih instansi',
      value: peserta.instansi,
      required: true,
      options: [
        { value: 'Publik', label: 'Publik' },
        { value: 'Swasta', label: 'Swasta' },
        { value: 'Pemerintah', label: 'Pemerintah' }
      ]
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'contoh@email.com',
      value: peserta.email,
      required: true,
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email tidak valid';
        return null;
      }
    },
    {
      id: 'mataKuliah',
      label: 'Mata Kuliah',
      type: 'select',
      placeholder: 'Pilih mata kuliah',
      value: peserta.mataKuliah,
      required: true,
      options: [
        { value: 'Jaringan Nirkabel', label: 'Jaringan Nirkabel' },
        { value: 'Rekayasa Perangkat Lunak', label: 'Rekayasa Perangkat Lunak' },
        { value: 'Game Designer - Game Story', label: 'Game Designer - Game Story' },
        { value: 'Telecommunication System and Business', label: 'Telecommunication System and Business' },
        { value: 'Interaksi Manusia dan Komputer A', label: 'Interaksi Manusia dan Komputer A' },
        { value: 'Keamanan Jaringan', label: 'Keamanan Jaringan' }
      ]
    },
    {
      id: 'noTelp',
      label: 'Nomor Telepon',
      type: 'text',
      placeholder: '08xxxxxxxxxx',
      value: peserta.noTelp,
      validation: (value) => {
        const phoneRegex = /^08\d{8,11}$/;
        if (!phoneRegex.test(value)) return 'Nomor telepon tidak valid (format: 08xxxxxxxxxx)';
        return null;
      }
    },
    {
      id: 'alamat',
      label: 'Alamat',
      type: 'textarea',
      placeholder: 'Masukkan alamat lengkap',
      value: peserta.alamat,
      rows: 3
    }
  ];

  const handleSubmit = async (values: Record<string, any>) => {
    setLoading(true);
    try {
      // Simulasi proses simpan data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Data yang disimpan:', values);
      
      // Redirect ke halaman peserta setelah selesai
      navigate('/peserta');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/peserta');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Peserta' : 'Tambah Peserta Baru'}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <ReusableForm
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitText={id ? 'Update' : 'Simpan'}
          loading={loading}
          layout="vertical"
        />
      </div>
    </div>
  );
};

export default FormPeserta;