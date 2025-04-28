declare module '@heroicons/react/outline';
// src/types/assets.d.ts
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module 'react-data-table-component';
declare module 'react-csv' {
    import React from 'react';
    
    export interface CSVLinkProps {
      data: any[];
      headers?: any[];
      filename?: string;
      separator?: string;
      target?: string;
      className?: string;
      style?: React.CSSProperties;
      label?: React.ReactNode;
      onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
      asyncOnClick?: boolean;
    }
    
    export const CSVLink: React.FC<CSVLinkProps>;
    export const CSVDownload: React.FC<CSVLinkProps>;
  }

