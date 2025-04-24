import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ChartData } from '../types/dashboard';

interface ChartComponentProps {
  data: ChartData[];
  title: string;
  color?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ 
  data, 
  title,
  color = '#3b82f6'
}) => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
            fill={`${color}20`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
