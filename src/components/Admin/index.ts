// Admin Components Index
// Easy imports for all admin components

// Layout and Navigation
export { default as AdminLayout } from './AdminLayout';
export { default as AdminDashboard } from './AdminDashboard';
export { default as AdminLanguageSelector } from './AdminLanguageSelector';

// Content Management
export { default as BlogPostsList } from './BlogPostsList';
export { default as BlogPostEditor } from './BlogPostEditor';
export { default as ConsultationsList } from './ConsultationsList';

// User Management
export { default as UsersList } from './UsersList';
export { default as RolesManagement } from './RolesManagement';

// UI Components
export { ToastProvider, useToast } from './Toast';
export type { ToastType } from './Toast';

export {
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
} from './Skeleton';

export { default as Pagination } from './Pagination';
export { default as ExportButton } from './ExportButton';
export { default as Button, ActionButtons, IconButton } from './Button';
export type { ButtonVariant, ButtonSize } from './Button';
