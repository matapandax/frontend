import React from 'react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: number | string;
  color?: 'gray' | 'red' | 'blue';
  hasDetails?: boolean;
  onViewDetails?: () => void;
  linkTo?: string; // ➕ link opsional
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  color = 'gray',
  hasDetails = true,
  onViewDetails,
  linkTo
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
          {linkTo ? (
            <Link to={linkTo} className="details-button">
              Details
            </Link>
          ) : (
            <button className="details-button" onClick={onViewDetails}>
              Details
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
