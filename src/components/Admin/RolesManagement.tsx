"use client";

import React, { useState, useEffect } from "react";
import { Role, MenuPermissions, ADMIN_MENUS } from "@/types/roles";

interface RolesManagementProps {
  isArabic?: boolean;
}

const RolesManagement: React.FC<RolesManagementProps> = ({ isArabic = false }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const t = {
    title: isArabic ? "إدارة الأدوار والصلاحيات" : "Roles & Permissions Management",
    roleName: isArabic ? "اسم الدور" : "Role Name",
    description: isArabic ? "الوصف" : "Description",
    menuAccess: isArabic ? "الوصول للقوائم" : "Menu Access",
    active: isArabic ? "نشط" : "Active",
    inactive: isArabic ? "غير نشط" : "Inactive",
    actions: isArabic ? "الإجراءات" : "Actions",
    edit: isArabic ? "تعديل" : "Edit",
    delete: isArabic ? "حذف" : "Delete",
    loading: isArabic ? "جاري التحميل..." : "Loading...",
    noRoles: isArabic ? "لا توجد أدوار" : "No roles found",
    createdAt: isArabic ? "تاريخ الإنشاء" : "Created At",

    // Admin Menus
    dashboard: isArabic ? "لوحة التحكم" : "Dashboard",
    blog: isArabic ? "المدونة" : "Blog Posts",
    consultations: isArabic ? "الاستشارات" : "Consultations",
    users: isArabic ? "المستخدمون" : "Users",
    roles: isArabic ? "الأدوار والصلاحيات" : "Roles & Permissions",
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/roles");
      const data = await response.json();

      if (data.success) {
        // Parse menu_access if it's a string from database
        const parsedRoles = data.data.map((role: any) => ({
          ...role,
          menu_access: typeof role.menu_access === 'string'
            ? JSON.parse(role.menu_access)
            : role.menu_access
        }));
        setRoles(parsedRoles);
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setShowEditModal(true);
  };

  const handleDeleteRole = async (roleId: number) => {
    if (!confirm(isArabic ? "هل أنت متأكد من حذف هذا الدور؟" : "Are you sure you want to delete this role?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/roles/${roleId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(isArabic ? "تم حذف الدور بنجاح" : "Role deleted successfully");
        fetchRoles();
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete role");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getMenuAccessCount = (menuAccess: MenuPermissions): number => {
    return Object.values(menuAccess).filter(value => value === true).length;
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
        <i className="bx bx-loader-alt bx-spin" style={{ fontSize: "32px" }}></i>
        <p style={{ marginTop: "16px" }}>{t.loading}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", direction: isArabic ? "rtl" : "ltr" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "32px",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <h1 style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#0EA5E9",
          margin: 0
        }}>
          {t.title}
        </h1>
      </div>

      {/* Messages */}
      {error && (
        <div style={{
          padding: "12px 20px",
          marginBottom: "20px",
          borderRadius: "8px",
          backgroundColor: "#fee",
          border: "1px solid #fcc",
          color: "#c33",
        }}>
          <i className="bx bx-error-circle" style={{ marginRight: isArabic ? "0" : "8px", marginLeft: isArabic ? "8px" : "0" }}></i>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          padding: "12px 20px",
          marginBottom: "20px",
          borderRadius: "8px",
          backgroundColor: "#efe",
          border: "1px solid #cfc",
          color: "#3c3",
        }}>
          <i className="bx bx-check-circle" style={{ marginRight: isArabic ? "0" : "8px", marginLeft: isArabic ? "8px" : "0" }}></i>
          {success}
        </div>
      )}

      {/* Roles Grid */}
      {roles.length === 0 ? (
        <div style={{ padding: "60px", textAlign: "center", color: "#6b7280" }}>
          <i className="bx bx-shield-quarter" style={{ fontSize: "64px", opacity: 0.3 }}></i>
          <p style={{ marginTop: "16px", fontSize: "16px" }}>{t.noRoles}</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "24px",
        }}>
          {roles.map((role) => (
            <div
              key={role.id}
              style={{
                background: "linear-gradient(135deg, #0a1628 0%, #0d2137 100%)",
                border: "1px solid rgba(14, 165, 233, 0.2)",
                borderRadius: "12px",
                padding: "24px",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.5)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(14, 165, 233, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.2)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Status Badge */}
              <div style={{
                position: "absolute",
                top: "16px",
                right: isArabic ? "auto" : "16px",
                left: isArabic ? "16px" : "auto",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "600",
                backgroundColor: role.is_active ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
                color: role.is_active ? "#22c55e" : "#ef4444",
                border: `1px solid ${role.is_active ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
              }}>
                {role.is_active ? t.active : t.inactive}
              </div>

              {/* Role Name */}
              <h3 style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#0EA5E9",
                marginBottom: "12px",
                marginTop: "8px",
              }}>
                {role.name}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: "14px",
                color: "#94a3b8",
                marginBottom: "20px",
                lineHeight: "1.6",
                minHeight: "42px",
              }}>
                {role.description}
              </p>

              {/* Menu Access Count */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                padding: "12px",
                backgroundColor: "rgba(14, 165, 233, 0.1)",
                borderRadius: "8px",
                border: "1px solid rgba(14, 165, 233, 0.2)",
              }}>
                <i className="bx bx-menu" style={{ fontSize: "20px", color: "#0EA5E9" }}></i>
                <span style={{ fontSize: "14px", color: "#e2e8f0" }}>
                  {getMenuAccessCount(role.menu_access)} / {Object.keys(ADMIN_MENUS).length} {isArabic ? "قوائم" : "menus"}
                </span>
              </div>

              {/* Created Date */}
              <div style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                <i className="bx bx-calendar"></i>
                {formatDate(role.created_at)}
              </div>

              {/* Actions */}
              <div style={{
                display: "flex",
                gap: "12px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(14, 165, 233, 0.2)",
              }}>
                <button
                  onClick={() => handleEditRole(role)}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    backgroundColor: "rgba(14, 165, 233, 0.1)",
                    color: "#0EA5E9",
                    border: "1px solid rgba(14, 165, 233, 0.3)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(14, 165, 233, 0.2)";
                    e.currentTarget.style.borderColor = "#0EA5E9";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(14, 165, 233, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.3)";
                  }}
                >
                  <i className="bx bx-edit" style={{ marginRight: isArabic ? "0" : "6px", marginLeft: isArabic ? "6px" : "0" }}></i>
                  {t.edit}
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  disabled={['admin', 'moderator'].includes(role.name)}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: ['admin', 'moderator'].includes(role.name) ? "not-allowed" : "pointer",
                    opacity: ['admin', 'moderator'].includes(role.name) ? 0.5 : 1,
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    if (!['admin', 'moderator'].includes(role.name)) {
                      e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                      e.currentTarget.style.borderColor = "#ef4444";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!['admin', 'moderator'].includes(role.name)) {
                      e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                      e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                    }
                  }}
                >
                  <i className="bx bx-trash" style={{ marginRight: isArabic ? "0" : "6px", marginLeft: isArabic ? "6px" : "0" }}></i>
                  {t.delete}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedRole && (
        <RoleEditModal
          role={selectedRole}
          isArabic={isArabic}
          onClose={() => {
            setShowEditModal(false);
            setSelectedRole(null);
          }}
          onSuccess={() => {
            setShowEditModal(false);
            setSelectedRole(null);
            setSuccess(isArabic ? "تم تحديث الدور بنجاح" : "Role updated successfully");
            fetchRoles();
          }}
          onError={(msg) => setError(msg)}
        />
      )}
    </div>
  );
};

// Role Edit Modal Component - Simplified Menu Access
interface RoleEditModalProps {
  role: Role;
  isArabic: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const RoleEditModal: React.FC<RoleEditModalProps> = ({ role, isArabic, onClose, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    name: role.name,
    description: role.description,
    is_active: role.is_active,
    menu_access: JSON.parse(JSON.stringify(role.menu_access)), // Deep clone
  });
  const [loading, setLoading] = useState(false);

  // Re-initialize form data when role changes
  useEffect(() => {
    setFormData({
      name: role.name,
      description: role.description,
      is_active: role.is_active,
      menu_access: JSON.parse(JSON.stringify(role.menu_access)),
    });
  }, [role]);

  const t = {
    editRole: isArabic ? "تعديل الدور" : "Edit Role",
    roleName: isArabic ? "اسم الدور" : "Role Name",
    description: isArabic ? "الوصف" : "Description",
    menuAccess: isArabic ? "الوصول للقوائم" : "Menu Access",
    active: isArabic ? "نشط" : "Active",
    cancel: isArabic ? "إلغاء" : "Cancel",
    save: isArabic ? "حفظ التغييرات" : "Save Changes",
    saving: isArabic ? "جاري الحفظ..." : "Saving...",

    // Admin Menus
    dashboard: isArabic ? "لوحة التحكم" : "Dashboard",
    blog: isArabic ? "المدونة" : "Blog Posts",
    consultations: isArabic ? "الاستشارات" : "Consultations",
    users: isArabic ? "المستخدمون" : "Users",
    roles: isArabic ? "الأدوار والصلاحيات" : "Roles & Permissions",
  };

  const menuKeys = Object.keys(ADMIN_MENUS) as Array<keyof typeof ADMIN_MENUS>;

  const handleMenuAccessChange = (menuKey: string) => {
    setFormData(prev => ({
      ...prev,
      menu_access: {
        ...prev.menu_access,
        [menuKey]: !prev.menu_access[menuKey],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/roles/${role.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
      } else {
        onError(data.message || (isArabic ? "فشل تحديث الدور" : "Failed to update role"));
      }
    } catch (err: any) {
      onError(err.message || (isArabic ? "حدث خطأ" : "An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px',
      direction: isArabic ? 'rtl' : 'ltr',
    }}
    onClick={onClose}>
      <div style={{
        backgroundColor: '#0a1628',
        borderRadius: '16px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        border: '1px solid rgba(14, 165, 233, 0.3)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
      onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(14, 165, 233, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0EA5E9' }}>
            {t.editRole}: {role.name}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px',
            }}>
            <i className="bx bx-x"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* Role Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '14px', fontWeight: '600' }}>
              {t.roleName}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={['admin', 'moderator'].includes(role.name)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(14, 165, 233, 0.3)',
                backgroundColor: 'rgba(14, 165, 233, 0.05)',
                color: '#e2e8f0',
                fontSize: '14px',
              }}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '14px', fontWeight: '600' }}>
              {t.description}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(14, 165, 233, 0.3)',
                backgroundColor: 'rgba(14, 165, 233, 0.05)',
                color: '#e2e8f0',
                fontSize: '14px',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Active Status */}
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <label htmlFor="is_active" style={{ color: '#e2e8f0', fontSize: '14px', cursor: 'pointer' }}>
              {t.active}
            </label>
          </div>

          {/* Menu Access - Simplified Grid */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '16px', color: '#0EA5E9', fontSize: '18px', fontWeight: '600' }}>
              {t.menuAccess}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}>
              {menuKeys.map(menuKey => (
                <label
                  key={menuKey}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px',
                    backgroundColor: formData.menu_access[menuKey] ? 'rgba(14, 165, 233, 0.15)' : 'rgba(14, 165, 233, 0.05)',
                    border: `1px solid ${formData.menu_access[menuKey] ? 'rgba(14, 165, 233, 0.4)' : 'rgba(14, 165, 233, 0.2)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = formData.menu_access[menuKey] ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = formData.menu_access[menuKey] ? 'rgba(14, 165, 233, 0.15)' : 'rgba(14, 165, 233, 0.05)';
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.menu_access[menuKey] || false}
                    onChange={() => handleMenuAccessChange(menuKey)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500', flex: 1 }}>
                    {t[menuKey]}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '1px solid rgba(14, 165, 233, 0.2)' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid rgba(14, 165, 233, 0.3)',
                backgroundColor: 'transparent',
                color: '#e2e8f0',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}>
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: loading ? '#9ca3af' : '#0EA5E9',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: loading ? 0.7 : 1,
              }}>
              {loading && <i className="bx bx-loader-alt bx-spin" style={{ fontSize: '18px' }}></i>}
              {loading ? t.saving : t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RolesManagement;
