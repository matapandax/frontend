export interface DashboardStats {
    balance: number;
    onlineUsers: number;
    transactions: {
      total: number;
      inProcess: number;
      successful: number;
    };
    faculty: number;
    courses: number;
    certificates: number;
  }
  
  export interface ChartData {
    month: string;
    value: number;
  }
  