import React, { useState, useEffect } from 'react';
import StatCard from '../components/statcard';
import ChartComponent from '../components/chartcomponent';
import { DashboardStats, ChartData } from '../types/dashboard';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    balance: 1525000,
    onlineUsers: 325,
    transactions: {
      total: 375,
      inProcess: 25, 
      successful: 350
    },
    faculty: 85,
    courses: 15,
    certificates: 320
  });
  
  const [transactionData, setTransactionData] = useState<ChartData[]>([
    { month: 'Aug 2022', value: 300 },
    { month: 'Sep 2022', value: 450 },
    { month: 'Oct 2022', value: 320 },
    { month: 'Nov 2022', value: 500 },
    { month: 'Dec 2022', value: 380 }
  ]);
  
  const [accessData, setAccessData] = useState<ChartData[]>([
    { month: 'Aug 2022', value: 250 },
    { month: 'Sep 2022', value: 350 },
    { month: 'Oct 2022', value: 280 },
    { month: 'Nov 2022', value: 450 },
    { month: 'Dec 2022', value: 320 }
  ]);
  
  // In a real application, we would fetch this data from an API
  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      try {
        // API call would go here
        // const response = await api.getDashboardData();
        // setStats(response.stats);
        // setTransactionData(response.transactionData);
        // setAccessData(response.accessData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    // fetchDashboardData();
  }, []);
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p></p>
      </div>
      
      <div className="main-stats">
        <div className="balance-card">
          <h2>Saldo Utama</h2>
          <div className="balance-amount">{formatCurrency(stats.balance)}</div>
        </div>
        
        <div className="online-users">
          <div className="online-dot"></div>
          <div>
            <div className="online-count">{stats.onlineUsers}</div>
            <div className="online-label">Sedang Online</div>
          </div>
        </div>
      </div>
      
      <div className="stat-cards-row">
        <StatCard 
          title="Transaksi" 
          value={stats.transactions.total} 
          color="gray" 
        />
        
        <StatCard 
          title="Transaksi Proses" 
          value={stats.transactions.inProcess} 
          color="red" 
        />
        
        <StatCard 
          title="Transaksi Berhasil" 
          value={stats.transactions.successful} 
          color="red" 
        />
      </div>
      
      <div className="charts-section1">
        <ChartComponent 
          data={transactionData} 
          title="Total peserta yang telah menyelesaikan transaksi" 
          color="#3b82f6" 
        />
        
        <ChartComponent 
          data={accessData} 
          title="Total yang mengakses" 
          color="#3b82f6" 
        />
      </div>
      
      <div className="bottom-stats">
        <div className="stat-cards-row">
          <StatCard 
            title="Total Dosen" 
            value={stats.faculty} 
            color="gray" 
          />
          
          <StatCard 
            title="Total Mata Kuliah" 
            value={stats.courses} 
            color="gray" 
          />
        </div>
        
        <div className="certificates-card">
          <StatCard 
            title="Total Klaim Sertifikat" 
            value={stats.certificates} 
            color="red" 
          />
        </div>
      </div>
      
      <footer className="dashboard-footer">
        <div className="footer-logos">
          <img src="../assets/images/logo 4.png" alt="Indonesia Cyber Education Institute" />
          <img src="../assets/images/logo3-e1511767184374 1.png" alt="Telkom University" />
        </div>
        
        <div className="footer-links">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/support">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;