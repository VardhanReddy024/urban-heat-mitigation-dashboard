import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  type?: 'card' | 'chart' | 'list' | 'map';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className = '', type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className={`glass-card rounded-2xl p-6 animate-pulse ${className}`}>
        <div className="h-4 bg-white/10 rounded w-1/3 mb-4" />
        <div className="h-8 bg-white/20 rounded w-1/2 mb-2" />
        <div className="h-3 bg-white/10 rounded w-2/3" />
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className={`glass-card rounded-2xl p-6 animate-pulse flex flex-col justify-between ${className}`}>
        <div className="flex justify-between mb-6">
          <div className="h-6 bg-white/10 rounded w-1/4" />
          <div className="h-6 bg-white/10 rounded w-1/6" />
        </div>
        <div className="flex items-end space-x-3 h-48 py-4">
          {[40, 65, 30, 85, 50, 75, 45, 90, 60, 40].map((h, i) => (
            <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/10 rounded-t" />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'map') {
    return (
      <div className={`glass-card rounded-2xl p-6 animate-pulse flex flex-col items-center justify-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-white/10 mb-4 animate-spin border-t-2 border-[#FF7A00]" />
        <div className="h-4 bg-white/20 rounded w-48 mb-2" />
        <div className="h-3 bg-white/10 rounded w-32" />
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-2xl p-4 animate-pulse space-y-3 ${className}`}>
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/10 rounded w-1/2" />
    </div>
  );
};
