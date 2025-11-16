"use client";

import React, { useState, useMemo, memo, useCallback, useEffect } from "react";
import { useAdminLang } from "@/hooks/useAdminLang";

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
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);
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
  const { lang, isArabic } = useAdminLang();

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
    }
  }), []);

  const t = translations[lang];

  const stats = useMemo(() => ({
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    active: users.filter(u => u.is_active).length,
    inactive: users.filter(u => !u.is_active).length,
  }), [users]);

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
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  }, [t.confirmDelete, fetchUsers]);

  const handleSaveEdit = useCallback(async () => {
    if (!editingUser) return;

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
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  }, [editingUser, fetchUsers]);

  const handleCreateUser = useCallback(async () => {
    if (!newUser.email || !newUser.full_name || !newUser.password || !newUser.role) {
      alert(isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

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
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  }, [newUser, fetchUsers, isArabic]);

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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {[
          { label: t.total, value: stats.total, color: '#0A4D8C', icon: 'bx-group' },
          { label: t.admins, value: stats.admins, color: '#e74c3c', icon: 'bx-shield' },
          { label: t.active, value: stats.active, color: '#27ae60', icon: 'bx-check-circle' },
          { label: t.inactive, value: stats.inactive, color: '#95a5a6', icon: 'bx-x-circle' },
        ].map((stat, index) => (
          <div key={index} style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ margin: 0, color: '#6c757d', fontSize: '14px', marginBottom: '8px' }}>{stat.label}</p>
                <h3 style={{ margin: 0, fontSize: '32px', color: '#2c3e50', fontWeight: 'bold' }}>{stat.value}</h3>
              </div>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 6px 16px ${stat.color}40`,
              }}>
                <i className={`bx ${stat.icon}`} style={{ fontSize: '28px', color: '#fff' }}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Add Button */}
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        marginBottom: '20px',
        border: '1px solid rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button
            onClick={() => {
              fetchRoles(); // Refresh roles when opening modal
              setCreatingUser(true);
            }}
            style={{
              padding: '12px 24px',
              background: '#27ae60',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <i className="bx bx-plus" style={{ fontSize: '20px' }}></i>
            {t.addNewUser}
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
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
              fontSize: '14px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}
          >
            <option value="all">{t.allStatuses}</option>
            <option value="active">{t.activeStatus}</option>
            <option value="inactive">{t.inactiveStatus}</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.05)',
      }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6c757d' }}>
            <i className="bx bx-loader-alt bx-spin" style={{ fontSize: '32px' }}></i>
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6c757d' }}>
            <i className="bx bx-user-x" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
            <p>{t.noUsers}</p>
          </div>
        ) : (
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
                {users.map((user) => (
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
                        <button
                          onClick={() => setSelectedUser(user)}
                          style={{
                            padding: '8px 16px',
                            background: '#0A4D8C',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                          }}
                        >
                          {t.view}
                        </button>
                        <button
                          onClick={() => {
                            fetchRoles(); // Refresh roles when opening edit modal
                            setEditingUser({...user});
                          }}
                          style={{
                            padding: '8px 16px',
                            background: '#f39c12',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                          }}
                        >
                          {t.edit}
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          style={{
                            padding: '8px 16px',
                            background: '#e74c3c',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                          }}
                        >
                          {t.delete}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
        }} onClick={() => setSelectedUser(null)}>
          <div style={{
            background: '#fff',
            padding: '32px',
            borderRadius: '20px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 24px 0', color: '#2c3e50', fontSize: '24px', fontWeight: 'bold' }}>
              {t.userDetails}
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
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
                  <strong style={{ color: '#6c757d', fontSize: '14px' }}>{field.label}:</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '16px' }}>{field.value}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              style={{
                marginTop: '24px',
                padding: '12px 32px',
                background: '#0A4D8C',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                width: '100%',
              }}
            >
              {t.close}
            </button>
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
        }} onClick={() => setEditingUser(null)}>
          <div style={{
            background: '#fff',
            padding: '32px',
            borderRadius: '20px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 24px 0', color: '#2c3e50', fontSize: '24px', fontWeight: 'bold' }}>
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
              <button
                onClick={handleSaveEdit}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#27ae60',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                {t.save}
              </button>
              <button
                onClick={() => setEditingUser(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#95a5a6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                {t.cancel}
              </button>
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
        }} onClick={() => setCreatingUser(false)}>
          <div style={{
            background: '#fff',
            padding: '32px',
            borderRadius: '20px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 24px 0', color: '#2c3e50', fontSize: '24px', fontWeight: 'bold' }}>
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
              <button
                onClick={handleCreateUser}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#27ae60',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                {t.create}
              </button>
              <button
                onClick={() => setCreatingUser(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#95a5a6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(UsersList);
