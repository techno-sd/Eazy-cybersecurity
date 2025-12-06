"use client";

import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

// Base Skeleton component
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = '8px',
  className,
  style,
}) => {
  return (
    <>
      <style>{`
        @keyframes skeletonShimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
      `}</style>
      <div
        className={className}
        style={{
          width,
          height,
          borderRadius,
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200px 100%',
          animation: 'skeletonShimmer 1.5s infinite linear',
          ...style,
        }}
      />
    </>
  );
};

// Stat Card Skeleton
export const StatCardSkeleton: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
  <div
    style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      padding: isMobile ? '16px' : '24px',
      borderRadius: isMobile ? '12px' : '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid rgba(0,0,0,0.05)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        <Skeleton width="60%" height={isMobile ? '14px' : '16px'} style={{ marginBottom: isMobile ? '8px' : '12px' }} />
        <Skeleton width="40%" height={isMobile ? '28px' : '36px'} />
      </div>
      <Skeleton
        width={isMobile ? '44px' : '56px'}
        height={isMobile ? '44px' : '56px'}
        borderRadius={isMobile ? '10px' : '14px'}
      />
    </div>
  </div>
);

// Stats Grid Skeleton
export const StatsGridSkeleton: React.FC<{ count?: number; isMobile?: boolean }> = ({ count = 4, isMobile = false }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: isMobile ? '12px' : '20px',
      marginBottom: isMobile ? '20px' : '30px',
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <StatCardSkeleton key={i} isMobile={isMobile} />
    ))}
  </div>
);

// Table Row Skeleton
export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 6 }) => (
  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} style={{ padding: '16px' }}>
        <Skeleton height="16px" width={i === 0 ? '80%' : i === columns - 1 ? '60px' : '70%'} />
      </td>
    ))}
  </tr>
);

// Table Skeleton
export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({ rows = 5, columns = 6 }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.05)',
    }}
  >
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', borderBottom: '2px solid #dee2e6' }}>
          {Array.from({ length: columns }).map((_, i) => (
            <th key={i} style={{ padding: '16px', textAlign: 'left' }}>
              <Skeleton height="14px" width="80%" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} columns={columns} />
        ))}
      </tbody>
    </table>
  </div>
);

// Card Skeleton for mobile views
export const CardSkeleton: React.FC<{ isMobile?: boolean }> = ({ isMobile = true }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid rgba(0,0,0,0.05)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    }}
  >
    {/* Header */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <Skeleton width="70%" height="18px" style={{ marginBottom: '6px' }} />
        <Skeleton width="50%" height="14px" />
      </div>
      <Skeleton width="60px" height="24px" borderRadius="12px" />
    </div>

    {/* Meta Grid */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        paddingTop: '12px',
        borderTop: '1px solid #f3f4f6',
      }}
    >
      <div>
        <Skeleton width="40%" height="12px" style={{ marginBottom: '6px' }} />
        <Skeleton width="70%" height="14px" />
      </div>
      <div>
        <Skeleton width="40%" height="12px" style={{ marginBottom: '6px' }} />
        <Skeleton width="60%" height="14px" />
      </div>
    </div>

    {/* Actions */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        paddingTop: '12px',
        borderTop: '1px solid #f3f4f6',
      }}
    >
      <Skeleton height="40px" borderRadius="8px" />
      <Skeleton height="40px" borderRadius="8px" />
    </div>
  </div>
);

// Cards List Skeleton
export const CardsListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

// Dashboard Activity Card Skeleton
export const ActivityCardSkeleton: React.FC = () => (
  <div
    style={{
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid rgba(10,77,140,0.08)',
      boxShadow: '0 4px 20px 0 rgba(10,77,140,0.08)',
    }}
  >
    {/* Header */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '2px solid #f3f4f6',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Skeleton width="24px" height="24px" borderRadius="6px" />
        <Skeleton width="180px" height="20px" />
      </div>
      <Skeleton width="80px" height="16px" />
    </div>

    {/* Activity Items */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          style={{
            padding: '18px',
            background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
            borderRadius: '14px',
            border: '1px solid #e5e7eb',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Skeleton width="60%" height="16px" />
            <Skeleton width="70px" height="22px" borderRadius="14px" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Skeleton width="14px" height="14px" borderRadius="3px" />
            <Skeleton width="45%" height="14px" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Skeleton width="14px" height="14px" borderRadius="3px" />
            <Skeleton width="30%" height="12px" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Filters Section Skeleton
export const FiltersSkeleton: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
  <div
    style={{
      background: '#fff',
      padding: isMobile ? '16px' : '20px',
      borderRadius: isMobile ? '12px' : '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '20px',
      border: '1px solid rgba(0,0,0,0.05)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <Skeleton width={isMobile ? '100%' : '160px'} height="44px" borderRadius="10px" />
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: isMobile ? '12px' : '16px',
      }}
    >
      <Skeleton height="44px" borderRadius="10px" />
      <Skeleton height="44px" borderRadius="10px" />
      <Skeleton height="44px" borderRadius="10px" />
    </div>
  </div>
);

// Role Card Skeleton (Dark theme)
export const RoleCardSkeleton: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
  <div
    style={{
      background: 'linear-gradient(135deg, #0a1628 0%, #0d2137 100%)',
      border: '1px solid rgba(14, 165, 233, 0.2)',
      borderRadius: '12px',
      padding: isMobile ? '16px' : '24px',
    }}
  >
    {/* Header */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div style={{ flex: 1 }}>
        <Skeleton width="60%" height="22px" style={{ marginBottom: '8px', background: 'linear-gradient(90deg, #1a2d47 25%, #243a5a 50%, #1a2d47 75%)' }} />
        <Skeleton width="80%" height="14px" style={{ background: 'linear-gradient(90deg, #1a2d47 25%, #243a5a 50%, #1a2d47 75%)' }} />
      </div>
      <Skeleton width="60px" height="24px" borderRadius="12px" style={{ background: 'linear-gradient(90deg, #1a2d47 25%, #243a5a 50%, #1a2d47 75%)' }} />
    </div>

    {/* Menu Access */}
    <div style={{ marginBottom: '16px' }}>
      <Skeleton width="50%" height="14px" style={{ marginBottom: '8px', background: 'linear-gradient(90deg, #1a2d47 25%, #243a5a 50%, #1a2d47 75%)' }} />
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} width="80px" height="26px" borderRadius="6px" style={{ background: 'linear-gradient(90deg, #1a2d47 25%, #243a5a 50%, #1a2d47 75%)' }} />
        ))}
      </div>
    </div>

    {/* Actions */}
    <div style={{ display: 'flex', gap: '12px' }}>
      <Skeleton width="100px" height="36px" borderRadius="8px" style={{ background: 'linear-gradient(90deg, #1a2d47 25%, #243a5a 50%, #1a2d47 75%)' }} />
    </div>
  </div>
);

// Roles Grid Skeleton
export const RolesGridSkeleton: React.FC<{ count?: number; isMobile?: boolean }> = ({ count = 3, isMobile = false }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: isMobile ? '16px' : '24px',
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <RoleCardSkeleton key={i} isMobile={isMobile} />
    ))}
  </div>
);

// Full Page Loading Skeleton for Users/Consultations
export const ListPageSkeleton: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
  <div>
    <StatsGridSkeleton isMobile={isMobile} />
    <FiltersSkeleton isMobile={isMobile} />
    {isMobile ? <CardsListSkeleton count={5} /> : <TableSkeleton rows={5} columns={7} />}
  </div>
);

export default {
  Skeleton,
  StatCardSkeleton,
  StatsGridSkeleton,
  TableRowSkeleton,
  TableSkeleton,
  CardSkeleton,
  CardsListSkeleton,
  ActivityCardSkeleton,
  FiltersSkeleton,
  RoleCardSkeleton,
  RolesGridSkeleton,
  ListPageSkeleton,
};
