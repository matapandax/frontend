import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  color?: 'gray' | 'red' | 'blue';
  hasDetails?: boolean;
  onViewDetails?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  color = 'gray',
  hasDetails = true,
  onViewDetails
}) => {
  const cardClasses = `stat-card ${color}`;
  
  return (
    <div className={cardClasses}>
      <div className="stat-content">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
      </div>
      
      {hasDetails && (
        <div className="stat-footer">
          <button className="details-button" onClick={onViewDetails}>
            Details
          </button>
        </div>
      )}
    </div>
  );
};

export default StatCard;
