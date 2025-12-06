"use client";

import React, { useState, useMemo, memo, useCallback, useEffect } from "react";
import { useAdminLang } from "@/hooks/useAdminLang";
import { useToast } from "./Toast";
import { StatsGridSkeleton, FiltersSkeleton, TableSkeleton, CardsListSkeleton } from "./Skeleton";
import Pagination from "./Pagination";
import ExportButton from "./ExportButton";
import Button, { ActionButtons, IconButton } from "./Button";

interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  company?: string;
  role: 'admin' | 'user' | 'moderator';
  is_active: boolean;
  last_login?: string;
  created_at: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    full_name: '',
    password: '',
    phone: '',
    company: '',
    role: 'user',
    is_active: true,
  });
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [resettingPassword, setResettingPassword] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { lang, isArabic } = useAdminLang();
  const [isMobile, setIsMobile] = useState(false);
  const { showToast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterRole !== 'all') params.append('role', filterRole);
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [filterRole, filterStatus, searchTerm]);

  // Fetch roles
  const fetchRoles = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/roles');
      const data = await response.json();
      if (data.success) {
        setRoles(data.data);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchRoles]);

  const translations = useMemo(() => ({
    en: {
      total: "Total Users",
      admins: "Admins",
      active: "Active",
      inactive: "Inactive",
      searchPlaceholder: "Search by name, email, or company...",
      allRoles: "All Roles",
      allStatuses: "All Statuses",
      name: "Name",
      email: "Email",
      company: "Company",
      role: "Role",
      status: "Status",
      lastLogin: "Last Login",
      actions: "Actions",
      noUsers: "No users found",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      userDetails: "User Details",
      editUser: "Edit User",
      phone: "Phone",
      createdAt: "Created At",
      close: "Close",
      save: "Save",
      cancel: "Cancel",
      confirmDelete: "Are you sure you want to delete this user?",
      fullName: "Full Name",
      activeStatus: "Active",
      inactiveStatus: "Inactive",
      roleAdmin: "Admin",
      roleUser: "User",
      roleModerator: "Moderator",
      never: "Never",
      addNewUser: "Add New User",
      createUser: "Create User",
      password: "Password",
      assignRole: "Assign Role",
      create: "Create",
      resetPassword: "Reset Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      passwordMismatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 8 characters",
      passwordResetSuccess: "Password reset successfully",
      resetPasswordFor: "Reset Password for",
    },
    ar: {
      total: "إجمالي المستخدمين",
      admins: "المسؤولون",
      active: "نشط",
      inactive: "غير نشط",
      searchPlaceholder: "البحث بالاسم أو البريد أو الشركة...",
      allRoles: "كل الأدوار",
      allStatuses: "كل الحالات",
      name: "الاسم",
      email: "البريد الإلكتروني",
      company: "الشركة",
      role: "الدور",
      status: "الحالة",
      lastLogin: "آخر تسجيل دخول",
      actions: "الإجراءات",
      noUsers: "لم يتم العثور على مستخدمين",
      view: "عرض",
      edit: "تعديل",
      delete: "حذف",
      userDetails: "تفاصيل المستخدم",
      editUser: "تعديل المستخدم",
      phone: "الهاتف",
      createdAt: "تاريخ الإنشاء",
      close: "إغلاق",
      save: "حفظ",
      cancel: "إلغاء",
      confirmDelete: "هل أنت متأكد من حذف هذا المستخدم؟",
      fullName: "الاسم الكامل",
      activeStatus: "نشط",
      inactiveStatus: "غير نشط",
      roleAdmin: "مسؤول",
      roleUser: "مستخدم",
      roleModerator: "مشرف",
      never: "أبداً",
      addNewUser: "إضافة مستخدم جديد",
      createUser: "إنشاء مستخدم",
      password: "كلمة المرور",
      assignRole: "تعيين دور",
      create: "إنشاء",
      resetPassword: "إعادة تعيين كلمة المرور",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      passwordMismatch: "كلمات المرور غير متطابقة",
      passwordTooShort: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
      passwordResetSuccess: "تم إعادة تعيين كلمة المرور بنجاح",
      resetPasswordFor: "إعادة تعيين كلمة المرور لـ",
    }
  }), []);

  const t = translations[lang];

  const stats = useMemo(() => ({
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    active: users.filter(u => u.is_active).length,
    inactive: users.filter(u => !u.is_active).length,
  }), [users]);

  // Paginated users for display
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  }, [users, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterRole, filterStatus, searchTerm]);

  const handleDelete = useCallback(async (id: number) => {
    if (!confirm(t.confirmDelete)) return;

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchUsers();
        setSelectedUser(null);
        showToast(isArabic ? 'تم حذف المستخدم بنجاح' : 'User deleted successfully', 'success');
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast(isArabic ? 'فشل في حذف المستخدم' : 'Failed to delete user', 'error');
    }
  }, [t.confirmDelete, fetchUsers, showToast, isArabic]);

  const handleSaveEdit = useCallback(async () => {
    if (!editingUser) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });

      const data = await response.json();

      if (data.success) {
        fetchUsers();
        setEditingUser(null);
        setSelectedUser(null);
        showToast(isArabic ? 'تم تحديث المستخدم بنجاح' : 'User updated successfully', 'success');
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showToast(isArabic ? 'فشل في تحديث المستخدم' : 'Failed to update user', 'error');
    } finally {
      setIsSaving(false);
    }
  }, [editingUser, fetchUsers, showToast, isArabic]);

  const handleCreateUser = useCallback(async () => {
    if (!newUser.email || !newUser.full_name || !newUser.password || !newUser.role) {
      showToast(isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields', 'warning');
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (data.success) {
        fetchUsers();
        setCreatingUser(false);
        setNewUser({
          email: '',
          full_name: '',
          password: '',
          phone: '',
          company: '',
          role: 'user',
          is_active: true,
        });
        showToast(isArabic ? 'تم إنشاء المستخدم بنجاح' : 'User created successfully', 'success');
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      showToast(isArabic ? 'فشل في إنشاء المستخدم' : 'Failed to create user', 'error');
    } finally {
      setIsCreating(false);
    }
  }, [newUser, fetchUsers, isArabic, showToast]);

  const handleResetPassword = useCallback(async () => {
    if (!resettingPassword) return;

    // Validation
    if (!newPassword || newPassword.length < 8) {
      showToast(t.passwordTooShort, 'warning');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast(t.passwordMismatch, 'warning');
      return;
    }

    setIsResetting(true);
    try {
      const response = await fetch(`/api/admin/users/${resettingPassword.id}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_password: newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        showToast(t.passwordResetSuccess, 'success');
        setResettingPassword(null);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      showToast(isArabic ? 'فشل في إعادة تعيين كلمة المرور' : 'Failed to reset password', 'error');
    } finally {
      setIsResetting(false);
    }
  }, [resettingPassword, newPassword, confirmPassword, t, showToast, isArabic]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return t.never;
    return new Date(dateString).toLocaleString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return '#e74c3c';
      case 'moderator': return '#f39c12';
      default: return '#3498db';
    }
  };

  return (
    <div style={{ padding: '0px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', direction: isArabic ? 'rtl' : 'ltr' }}>
      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: isMobile ? '12px' : '20px',
        marginBottom: isMobile ? '20px' : '30px'
      }}>
        {[
          { label: t.total, value: stats.total, color: '#0A4D8C', icon: 'bx-group' },
          { label: t.admins, value: stats.admins, color: '#e74c3c', icon: 'bx-shield' },
          { label: t.active, value: stats.active, color: '#27ae60', icon: 'bx-check-circle' },
          { label: t.inactive, value: stats.inactive, color: '#95a5a6', icon: 'bx-x-circle' },
        ].map((stat, index) => (
          <div key={index} style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            padding: isMobile ? '16px' : '24px',
            borderRadius: isMobile ? '12px' : '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ margin: 0, color: '#6c757d', fontSize: isMobile ? '12px' : '14px', marginBottom: isMobile ? '4px' : '8px' }}>{stat.label}</p>
                <h3 style={{ margin: 0, fontSize: isMobile ? '24px' : '32px', color: '#2c3e50', fontWeight: 'bold' }}>{stat.value}</h3>
              </div>
              <div style={{
                width: isMobile ? '44px' : '56px',
                height: isMobile ? '44px' : '56px',
                borderRadius: isMobile ? '10px' : '14px',
                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 6px 16px ${stat.color}40`,
              }}>
                <i className={`bx ${stat.icon}`} style={{ fontSize: isMobile ? '20px' : '28px', color: '#fff' }}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Add Button */}
      <div style={{
        background: '#fff',
        padding: isMobile ? '16px' : '20px',
        borderRadius: isMobile ? '12px' : '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        marginBottom: '20px',
        border: '1px solid rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <Button
            variant="success"
            size={isMobile ? 'sm' : 'md'}
            icon="bx-plus"
            onClick={() => {
              fetchRoles();
              setCreatingUser(true);
            }}
            fullWidth={isMobile}
          >
            {t.addNewUser}
          </Button>
          <ExportButton
            data={users}
            filename="users_export"
            columns={[
              { key: 'full_name', label: t.name },
              { key: 'email', label: t.email },
              { key: 'phone', label: t.phone },
              { key: 'company', label: t.company },
              { key: 'role', label: t.role },
              { key: 'is_active', label: t.status },
              { key: 'last_login', label: t.lastLogin },
              { key: 'created_at', label: t.createdAt },
            ]}
            isArabic={isArabic}
            isMobile={isMobile}
          />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: isMobile ? '12px' : '16px'
        }}>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              fontSize: isMobile ? '15px' : '14px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              width: '100%',
            }}
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              fontSize: isMobile ? '15px' : '14px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              width: '100%',
            }}
          >
            <option value="all">{t.allRoles}</option>
            <option value="admin">{t.roleAdmin}</option>
            <option value="moderator">{t.roleModerator}</option>
            <option value="user">{t.roleUser}</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              fontSize: isMobile ? '15px' : '14px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              width: '100%',
            }}
          >
            <option value="all">{t.allStatuses}</option>
            <option value="active">{t.activeStatus}</option>
            <option value="inactive">{t.inactiveStatus}</option>
          </select>
        </div>
      </div>

      {/* Users Table/Cards */}
      {loading ? (
        isMobile ? <CardsListSkeleton count={4} /> : <TableSkeleton rows={5} columns={7} />
      ) : users.length === 0 ? (
        <div style={{
          background: '#fff',
          borderRadius: isMobile ? '12px' : '16px',
          padding: '40px',
          textAlign: 'center',
          color: '#6c757d',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}>
          <i className="bx bx-user-x" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
          <p>{t.noUsers}</p>
        </div>
      ) : isMobile ? (
        // Mobile Card View
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {paginatedUsers.map((user) => (
            <div
              key={user.id}
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
              {/* Name and Role/Status Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: '#1a1a1a',
                    fontSize: '15px',
                    marginBottom: '4px',
                  }}>
                    {user.full_name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
                    {user.email}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    background: getRoleBadgeColor(user.role) + '20',
                    color: getRoleBadgeColor(user.role),
                  }}>
                    {user.role === 'admin' ? t.roleAdmin : user.role === 'moderator' ? t.roleModerator : t.roleUser}
                  </span>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    background: user.is_active ? '#27ae6020' : '#95a5a620',
                    color: user.is_active ? '#27ae60' : '#95a5a6',
                  }}>
                    {user.is_active ? t.activeStatus : t.inactiveStatus}
                  </span>
                </div>
              </div>

              {/* Meta Info */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                paddingTop: '12px',
                borderTop: '1px solid #f3f4f6',
              }}>
                <div>
                  <div style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginBottom: '4px',
                    textTransform: isArabic ? 'none' : 'uppercase',
                  }}>{t.company}</div>
                  <div style={{ fontSize: '13px', color: '#374151' }}>
                    {user.company || '-'}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginBottom: '4px',
                    textTransform: isArabic ? 'none' : 'uppercase',
                  }}>{t.lastLogin}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>
                    {formatDate(user.last_login)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{
                paddingTop: '12px',
                borderTop: '1px solid #f3f4f6',
              }}>
                <ActionButtons
                  onView={() => setSelectedUser(user)}
                  onEdit={() => {
                    fetchRoles();
                    setEditingUser({...user});
                  }}
                  onReset={() => setResettingPassword(user)}
                  onDelete={() => handleDelete(user.id)}
                  size="sm"
                  isArabic={isArabic}
                  isMobile={true}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop Table View
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.05)',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', borderBottom: '2px solid #dee2e6' }}>
                  {[t.name, t.email, t.company, t.role, t.status, t.lastLogin, t.actions].map((header, i) => (
                    <th key={i} style={{
                      padding: '16px',
                      textAlign: isArabic ? 'right' : 'left',
                      fontWeight: '600',
                      fontSize: '14px',
                      color: '#495057',
                      whiteSpace: 'nowrap',
                    }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} style={{
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px', fontWeight: '500' }}>{user.full_name}</td>
                    <td style={{ padding: '16px', color: '#6c757d' }}>{user.email}</td>
                    <td style={{ padding: '16px', color: '#6c757d' }}>{user.company || '-'}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: getRoleBadgeColor(user.role) + '20',
                        color: getRoleBadgeColor(user.role),
                      }}>
                        {user.role === 'admin' ? t.roleAdmin : user.role === 'moderator' ? t.roleModerator : t.roleUser}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: user.is_active ? '#27ae6020' : '#95a5a620',
                        color: user.is_active ? '#27ae60' : '#95a5a6',
                      }}>
                        {user.is_active ? t.activeStatus : t.inactiveStatus}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: '#6c757d', fontSize: '13px' }}>{formatDate(user.last_login)}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <IconButton
                          icon="bx-show"
                          variant="primary"
                          size="sm"
                          tooltip={t.view}
                          onClick={() => setSelectedUser(user)}
                        />
                        <IconButton
                          icon="bx-edit"
                          variant="warning"
                          size="sm"
                          tooltip={t.edit}
                          onClick={() => {
                            fetchRoles();
                            setEditingUser({...user});
                          }}
                        />
                        <IconButton
                          icon="bx-key"
                          variant="info"
                          size="sm"
                          tooltip={t.resetPassword}
                          onClick={() => setResettingPassword(user)}
                        />
                        <IconButton
                          icon="bx-trash"
                          variant="danger"
                          size="sm"
                          tooltip={t.delete}
                          onClick={() => handleDelete(user.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && users.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          isArabic={isArabic}
          isMobile={isMobile}
        />
      )}

      {/* View User Modal */}
      {selectedUser && !editingUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          padding: isMobile ? '12px' : '20px',
        }} onClick={() => setSelectedUser(null)}>
          <div style={{
            background: '#fff',
            padding: isMobile ? '20px' : '32px',
            borderRadius: isMobile ? '12px' : '20px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: isMobile ? '95vh' : '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: isMobile ? '18px' : '24px', fontWeight: 'bold' }}>
              {t.userDetails}
            </h2>
            <div style={{ display: 'grid', gap: isMobile ? '12px' : '16px' }}>
              {[
                { label: t.fullName, value: selectedUser.full_name },
                { label: t.email, value: selectedUser.email },
                { label: t.phone, value: selectedUser.phone || '-' },
                { label: t.company, value: selectedUser.company || '-' },
                { label: t.role, value: selectedUser.role },
                { label: t.status, value: selectedUser.is_active ? t.activeStatus : t.inactiveStatus },
                { label: t.lastLogin, value: formatDate(selectedUser.last_login) },
                { label: t.createdAt, value: formatDate(selectedUser.created_at) },
              ].map((field, i) => (
                <div key={i}>
                  <strong style={{ color: '#6c757d', fontSize: isMobile ? '12px' : '14px' }}>{field.label}:</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: isMobile ? '14px' : '16px' }}>{field.value}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: isMobile ? '16px' : '24px' }}>
              <Button
                variant="primary"
                size={isMobile ? 'sm' : 'md'}
                onClick={() => setSelectedUser(null)}
                fullWidth
              >
                {t.close}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          padding: isMobile ? '12px' : '20px',
        }} onClick={() => setEditingUser(null)}>
          <div style={{
            background: '#fff',
            padding: isMobile ? '20px' : '32px',
            borderRadius: isMobile ? '12px' : '20px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: isMobile ? '95vh' : '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: isMobile ? '18px' : '24px', fontWeight: 'bold' }}>
              {t.editUser}
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={editingUser.full_name}
                  onChange={(e) => setEditingUser({...editingUser, full_name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.email}
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.phone}
                </label>
                <input
                  type="tel"
                  value={editingUser.phone || ''}
                  onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.company}
                </label>
                <input
                  type="text"
                  value={editingUser.company || ''}
                  onChange={(e) => setEditingUser({...editingUser, company: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.role}
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value as any})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  }}
                >
                  <option value="">{isArabic ? 'اختر دور' : 'Select Role'}</option>
                  {roles.filter(role => role.is_active).map(role => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingUser.is_active}
                    onChange={(e) => setEditingUser({...editingUser, is_active: e.target.checked})}
                  />
                  <span style={{ color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>{t.activeStatus}</span>
                </label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button
                variant="success"
                size={isMobile ? 'sm' : 'md'}
                icon="bx-save"
                onClick={handleSaveEdit}
                loading={isSaving}
                disabled={isSaving}
                style={{ flex: 1 }}
              >
                {t.save}
              </Button>
              <Button
                variant="secondary"
                size={isMobile ? 'sm' : 'md'}
                onClick={() => setEditingUser(null)}
                disabled={isSaving}
                style={{ flex: 1 }}
              >
                {t.cancel}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {creatingUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          padding: isMobile ? '12px' : '20px',
        }} onClick={() => setCreatingUser(false)}>
          <div style={{
            background: '#fff',
            padding: isMobile ? '20px' : '32px',
            borderRadius: isMobile ? '12px' : '20px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: isMobile ? '95vh' : '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: isMobile ? '18px' : '24px', fontWeight: 'bold' }}>
              {t.createUser}
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.fullName} *
                </label>
                <input
                  type="text"
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.email} *
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.password} *
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.phone}
                </label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.company}
                </label>
                <input
                  type="text"
                  value={newUser.company}
                  onChange={(e) => setNewUser({...newUser, company: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.assignRole} *
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  }}
                >
                  <option value="">{isArabic ? 'اختر دور' : 'Select Role'}</option>
                  {roles.filter(role => role.is_active).map(role => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newUser.is_active}
                    onChange={(e) => setNewUser({...newUser, is_active: e.target.checked})}
                  />
                  <span style={{ color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>{t.activeStatus}</span>
                </label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button
                variant="success"
                size={isMobile ? 'sm' : 'md'}
                icon="bx-plus"
                onClick={handleCreateUser}
                loading={isCreating}
                disabled={isCreating}
                style={{ flex: 1 }}
              >
                {t.create}
              </Button>
              <Button
                variant="secondary"
                size={isMobile ? 'sm' : 'md'}
                onClick={() => setCreatingUser(false)}
                disabled={isCreating}
                style={{ flex: 1 }}
              >
                {t.cancel}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resettingPassword && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          padding: isMobile ? '12px' : '20px',
        }} onClick={() => {
          setResettingPassword(null);
          setNewPassword('');
          setConfirmPassword('');
        }}>
          <div style={{
            background: '#fff',
            padding: isMobile ? '20px' : '32px',
            borderRadius: isMobile ? '12px' : '20px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 8px 0', color: '#2c3e50', fontSize: isMobile ? '18px' : '24px', fontWeight: 'bold' }}>
              {t.resetPassword}
            </h2>
            <p style={{ margin: '0 0 20px 0', color: '#6c757d', fontSize: isMobile ? '13px' : '14px' }}>
              {t.resetPasswordFor}: <strong>{resettingPassword.full_name}</strong>
            </p>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.newPassword} *
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t.passwordTooShort}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>
                  {t.confirmPassword} *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t.confirmPassword}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button
                variant="info"
                size={isMobile ? 'sm' : 'md'}
                icon="bx-key"
                onClick={handleResetPassword}
                loading={isResetting}
                disabled={isResetting}
                style={{ flex: 1 }}
              >
                {t.resetPassword}
              </Button>
              <Button
                variant="secondary"
                size={isMobile ? 'sm' : 'md'}
                onClick={() => {
                  setResettingPassword(null);
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                disabled={isResetting}
                style={{ flex: 1 }}
              >
                {t.cancel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(UsersList);
