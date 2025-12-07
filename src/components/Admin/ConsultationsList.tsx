"use client";

import React, { useState, useMemo, memo, useCallback, useEffect } from "react";
import { useAdminLang } from "@/hooks/useAdminLang";
import { useToast } from "./Toast";
import Button, { IconButton, StatusBadge, EmptyState, StatCard } from "./Button";
import { colors, radius, typography, transitions, spacing, getFontFamily, getDirection } from './theme';

interface Consultation {
  id: number;
  contact_person: string;
  company_name?: string;
  email: string;
  phone?: string;
  service_type?: string;
  budget?: string;
  description: string;
  preferred_date?: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  ip_address?: string;
  created_at: string;
  updated_at?: string;
}

interface ConsultationsListProps {
  consultations: Consultation[];
}

// Service type mapping - centralized
const serviceTypeMap = {
  en: {
    'ai-solutions': 'AI Solutions',
    'cybersecurity': 'Cybersecurity',
    'big-data': 'Big Data & Analytics',
    'cloud-computing': 'Cloud Computing',
    'sme-eazy': 'SME-EAZY',
    'digital-transformation': 'Digital Transformation',
    'vision-2030': 'Vision 2030',
    'security-training': 'Security Training',
    'other': 'Other',
  },
  ar: {
    'ai-solutions': 'حلول الذكاء الاصطناعي',
    'cybersecurity': 'الأمن السيبراني',
    'big-data': 'البيانات الضخمة',
    'cloud-computing': 'الحوسبة السحابية',
    'sme-eazy': 'SME-EAZY',
    'digital-transformation': 'التحول الرقمي',
    'vision-2030': 'رؤية 2030',
    'security-training': 'التدريب الأمني',
    'other': 'أخرى',
  }
} as const;

const ConsultationsList: React.FC<ConsultationsListProps> = ({ consultations: initialConsultations }) => {
  const [consultations, setConsultations] = useState(initialConsultations);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterService, setFilterService] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [tempStatus, setTempStatus] = useState<Consultation['status'] | null>(null);
  const { lang, isArabic } = useAdminLang();
  const [isMobile, setIsMobile] = useState(false);
  const { showToast } = useToast();

  const fontFamily = getFontFamily(isArabic);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getServiceName = useMemo(() => (serviceType: string | undefined): string => {
    if (!serviceType) return '-';
    const serviceMap = isArabic ? serviceTypeMap.ar : serviceTypeMap.en;
    return serviceMap[serviceType as keyof typeof serviceMap] || serviceType;
  }, [isArabic]);

  const translations = {
    en: {
      total: "Total",
      pending: "Pending",
      scheduled: "Scheduled",
      completed: "Completed",
      searchPlaceholder: "Search consultations...",
      allStatuses: "All Statuses",
      allServices: "All Services",
      name: "Name",
      contact: "Contact",
      service: "Service",
      status: "Status",
      date: "Date",
      actions: "Actions",
      noConsultations: "No consultations found",
      view: "View",
      consultationDetails: "Consultation Details",
      company: "Company",
      email: "Email",
      phone: "Phone",
      serviceType: "Service Type",
      budget: "Budget",
      preferredDate: "Preferred Date",
      createdAt: "Created At",
      description: "Description",
      close: "Close",
      updateStatus: "Update Status",
      delete: "Delete",
      confirmDelete: "Are you sure you want to delete this consultation?",
      cancel: "Cancel",
      updating: "Updating...",
      deleting: "Deleting...",
      updateSuccess: "Status updated successfully",
      deleteSuccess: "Consultation deleted successfully",
      updateError: "Failed to update status",
      deleteError: "Failed to delete consultation",
      // Status values
      statusPending: "Pending",
      statusScheduled: "Scheduled",
      statusCompleted: "Completed",
      statusCancelled: "Cancelled",
    },
    ar: {
      total: "الإجمالي",
      pending: "قيد الانتظار",
      scheduled: "مجدولة",
      completed: "مكتملة",
      searchPlaceholder: "بحث في الاستشارات...",
      allStatuses: "كل الحالات",
      allServices: "كل الخدمات",
      name: "الاسم",
      contact: "معلومات الاتصال",
      service: "الخدمة",
      status: "الحالة",
      date: "التاريخ",
      actions: "الإجراءات",
      noConsultations: "لا توجد استشارات",
      view: "عرض",
      consultationDetails: "تفاصيل الاستشارة",
      company: "الشركة",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      serviceType: "نوع الخدمة",
      budget: "الميزانية",
      preferredDate: "التاريخ المفضل",
      createdAt: "تاريخ الإنشاء",
      description: "الوصف",
      close: "إغلاق",
      updateStatus: "تحديث الحالة",
      delete: "حذف",
      confirmDelete: "هل أنت متأكد من حذف هذه الاستشارة؟",
      cancel: "إلغاء",
      updating: "جاري التحديث...",
      deleting: "جاري الحذف...",
      updateSuccess: "تم تحديث الحالة بنجاح",
      deleteSuccess: "تم حذف الاستشارة بنجاح",
      updateError: "فشل تحديث الحالة",
      deleteError: "فشل حذف الاستشارة",
      // Status values
      statusPending: "قيد الانتظار",
      statusScheduled: "مجدولة",
      statusCompleted: "مكتملة",
      statusCancelled: "ملغية",
    }
  };

  const t = translations[lang];

  const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, keyof typeof translations.en> = {
      'pending': 'statusPending',
      'scheduled': 'statusScheduled',
      'completed': 'statusCompleted',
      'cancelled': 'statusCancelled',
    };
    const key = statusMap[status];
    return key ? t[key] : status;
  };

  const getStatusColor = useMemo(() => (status: string) => {
    const statusColors: Record<string, string> = {
      pending: colors.warning,
      scheduled: colors.info,
      completed: colors.success,
      cancelled: colors.danger,
    };
    return statusColors[status] || colors.textMuted;
  }, []);

  const formatDate = useMemo(() => (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }, [isArabic]);

  const handleStatusUpdate = useCallback(async () => {
    if (!selectedConsultation || !tempStatus || tempStatus === selectedConsultation.status) {
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/consultations/${selectedConsultation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: tempStatus }),
      });

      if (!response.ok) throw new Error('Failed to update');

      setConsultations(prev =>
        prev.map(c => c.id === selectedConsultation.id ? { ...c, status: tempStatus } : c)
      );

      setSelectedConsultation({ ...selectedConsultation, status: tempStatus });
      setTempStatus(null);

      showToast(t.updateSuccess, 'success');
    } catch (error) {
      console.error('Error updating status:', error);
      showToast(t.updateError, 'error');
    } finally {
      setIsUpdating(false);
    }
  }, [selectedConsultation, tempStatus, t, showToast]);

  const handleDelete = useCallback(async (id: number) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/consultations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      setConsultations(prev => prev.filter(c => c.id !== id));
      setSelectedConsultation(null);
      setDeleteConfirm(null);
      showToast(t.deleteSuccess, 'success');
    } catch (error) {
      console.error('Error deleting consultation:', error);
      showToast(t.deleteError, 'error');
    } finally {
      setIsUpdating(false);
    }
  }, [deleteConfirm, t, showToast]);

  const filteredConsultations = useMemo(() => consultations.filter((consultation) => {
    const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
    const matchesService = filterService === 'all' || consultation.service_type === filterService;
    const matchesSearch =
      !searchTerm ||
      consultation.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.service_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesService && matchesSearch;
  }), [consultations, filterStatus, filterService, searchTerm]);

  const stats = useMemo(() => ({
    total: consultations.length,
    pending: consultations.filter((c) => c.status === 'pending').length,
    scheduled: consultations.filter((c) => c.status === 'scheduled').length,
    completed: consultations.filter((c) => c.status === 'completed').length,
  }), [consultations]);

  const inputStyle: React.CSSProperties = {
    padding: `${spacing.sm} ${spacing.md}`,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    fontSize: typography.fontSize.sm,
    fontFamily,
    background: colors.surface,
    color: colors.text,
    outline: 'none',
    transition: transitions.fast,
  };

  return (
    <div style={{ direction: getDirection(isArabic), fontFamily }}>
      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: spacing.md,
        marginBottom: spacing.lg,
      }}>
        <StatCard label={t.total} value={stats.total} icon="bx-conversation" color={colors.primary} />
        <StatCard label={t.pending} value={stats.pending} icon="bx-time" color={colors.warning} />
        <StatCard label={t.scheduled} value={stats.scheduled} icon="bx-calendar-check" color={colors.info} />
        <StatCard label={t.completed} value={stats.completed} icon="bx-check-circle" color={colors.success} />
      </div>

      {/* Filters */}
      <div
        style={{
          background: colors.surface,
          padding: spacing.md,
          borderRadius: radius.xl,
          marginBottom: spacing.lg,
          border: `1px solid ${colors.border}`,
          display: 'flex',
          gap: spacing.sm,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <i className="bx bx-search" style={{
            position: 'absolute',
            left: isArabic ? 'auto' : spacing.sm,
            right: isArabic ? spacing.sm : 'auto',
            top: '50%',
            transform: 'translateY(-50%)',
            color: colors.textMuted,
            fontSize: '18px',
          }} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              ...inputStyle,
              width: '100%',
              paddingLeft: isArabic ? spacing.md : spacing.xl,
              paddingRight: isArabic ? spacing.xl : spacing.md,
            }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ ...inputStyle, minWidth: '140px' }}
        >
          <option value="all">{t.allStatuses}</option>
          <option value="pending">{t.statusPending}</option>
          <option value="scheduled">{t.statusScheduled}</option>
          <option value="completed">{t.statusCompleted}</option>
          <option value="cancelled">{t.statusCancelled}</option>
        </select>

        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          style={{ ...inputStyle, minWidth: '160px' }}
        >
          <option value="all">{t.allServices}</option>
          {Object.entries(isArabic ? serviceTypeMap.ar : serviceTypeMap.en).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      {/* Consultations Table/Cards */}
      {isMobile ? (
        // Mobile Card View
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
          {filteredConsultations.length === 0 ? (
            <div style={{
              background: colors.surface,
              borderRadius: radius.xl,
              border: `1px solid ${colors.border}`,
              padding: spacing.xl,
            }}>
              <EmptyState icon="bx-message-x" title={t.noConsultations} />
            </div>
          ) : (
            filteredConsultations.map((consultation) => (
              <div
                key={consultation.id}
                style={{
                  background: colors.surface,
                  borderRadius: radius.lg,
                  border: `1px solid ${colors.border}`,
                  padding: spacing.md,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm }}>
                  <div>
                    <div style={{
                      fontWeight: typography.fontWeight.medium,
                      color: colors.text,
                      fontSize: typography.fontSize.base,
                    }}>
                      {consultation.contact_person}
                    </div>
                    {consultation.company_name && (
                      <div style={{ fontSize: typography.fontSize.sm, color: colors.textMuted }}>
                        {consultation.company_name}
                      </div>
                    )}
                  </div>
                  <StatusBadge
                    status={consultation.status}
                    customLabels={{ [consultation.status]: getStatusLabel(consultation.status) }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  gap: spacing.lg,
                  fontSize: typography.fontSize.sm,
                  color: colors.textMuted,
                  marginBottom: spacing.sm,
                }}>
                  <span>{getServiceName(consultation.service_type)}</span>
                  <span>{formatDate(consultation.created_at)}</span>
                </div>

                <div style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary, marginBottom: spacing.md }}>
                  {consultation.email}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  icon="bx-show"
                  onClick={() => setSelectedConsultation(consultation)}
                  fullWidth
                >
                  {t.view}
                </Button>
              </div>
            ))
          )}
        </div>
      ) : (
        // Desktop Table View
        <div
          style={{
            background: colors.surface,
            borderRadius: radius.xl,
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: colors.background, borderBottom: `1px solid ${colors.border}` }}>
                <tr>
                  {[t.name, t.contact, t.service, t.status, t.date, t.actions].map((header, idx) => (
                    <th key={idx} style={{
                      padding: spacing.md,
                      textAlign: isArabic ? 'right' : 'left',
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.textMuted,
                      textTransform: 'uppercase',
                    }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredConsultations.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: spacing.xl }}>
                      <EmptyState icon="bx-message-x" title={t.noConsultations} />
                    </td>
                  </tr>
                ) : (
                  filteredConsultations.map((consultation) => (
                    <tr
                      key={consultation.id}
                      style={{
                        borderBottom: `1px solid ${colors.border}`,
                        transition: transitions.fast,
                      }}
                    >
                      <td style={{ padding: spacing.md }}>
                        <div style={{
                          fontWeight: typography.fontWeight.medium,
                          color: colors.text,
                          fontSize: typography.fontSize.sm,
                        }}>
                          {consultation.contact_person}
                        </div>
                        {consultation.company_name && (
                          <div style={{ fontSize: typography.fontSize.xs, color: colors.textMuted }}>
                            {consultation.company_name}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: spacing.md }}>
                        <div style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary }}>
                          {consultation.email}
                        </div>
                        {consultation.phone && (
                          <div style={{ fontSize: typography.fontSize.xs, color: colors.textMuted }}>
                            {consultation.phone}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: spacing.md, fontSize: typography.fontSize.sm, color: colors.textSecondary }}>
                        {getServiceName(consultation.service_type)}
                      </td>
                      <td style={{ padding: spacing.md }}>
                        <StatusBadge
                          status={consultation.status}
                          customLabels={{ [consultation.status]: getStatusLabel(consultation.status) }}
                        />
                      </td>
                      <td style={{ padding: spacing.md, fontSize: typography.fontSize.sm, color: colors.textMuted }}>
                        {formatDate(consultation.created_at)}
                      </td>
                      <td style={{ padding: spacing.md }}>
                        <IconButton
                          icon="bx-show"
                          variant="primary"
                          size="sm"
                          tooltip={t.view}
                          onClick={() => setSelectedConsultation(consultation)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Consultation Detail Modal */}
      {selectedConsultation && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: spacing.lg,
          }}
          onClick={() => setSelectedConsultation(null)}
        >
          <div
            style={{
              background: colors.surface,
              borderRadius: radius.xl,
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              padding: spacing.xl,
              direction: getDirection(isArabic),
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
              <h2 style={{
                margin: 0,
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text,
              }}>
                {t.consultationDetails}
              </h2>
              <IconButton
                icon="bx-x"
                variant="default"
                onClick={() => setSelectedConsultation(null)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md, marginBottom: spacing.lg }}>
              {[
                { label: t.name, value: selectedConsultation.contact_person },
                { label: t.company, value: selectedConsultation.company_name || '-' },
                { label: t.email, value: selectedConsultation.email, isLink: `mailto:${selectedConsultation.email}` },
                { label: t.phone, value: selectedConsultation.phone || '-', isLink: selectedConsultation.phone ? `tel:${selectedConsultation.phone}` : undefined },
                { label: t.serviceType, value: getServiceName(selectedConsultation.service_type) },
                { label: t.createdAt, value: formatDate(selectedConsultation.created_at) },
              ].map((field, idx) => (
                <div key={idx}>
                  <label style={{
                    fontSize: typography.fontSize.xs,
                    color: colors.textMuted,
                    fontWeight: typography.fontWeight.medium,
                    display: 'block',
                    marginBottom: spacing.xs,
                    textTransform: 'uppercase',
                  }}>
                    {field.label}
                  </label>
                  {field.isLink ? (
                    <a href={field.isLink} style={{ color: colors.primary, fontSize: typography.fontSize.sm, textDecoration: 'none' }}>
                      {field.value}
                    </a>
                  ) : (
                    <div style={{ fontSize: typography.fontSize.sm, color: colors.text }}>{field.value}</div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: spacing.lg }}>
              <label style={{
                fontSize: typography.fontSize.xs,
                color: colors.textMuted,
                fontWeight: typography.fontWeight.medium,
                display: 'block',
                marginBottom: spacing.xs,
                textTransform: 'uppercase',
              }}>
                {t.description}
              </label>
              <div
                style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.text,
                  padding: spacing.md,
                  background: colors.background,
                  borderRadius: radius.lg,
                  lineHeight: '1.6',
                  border: `1px solid ${colors.border}`,
                }}
              >
                {selectedConsultation.description}
              </div>
            </div>

            <div style={{ marginBottom: spacing.lg }}>
              <label style={{
                fontSize: typography.fontSize.xs,
                color: colors.textMuted,
                fontWeight: typography.fontWeight.medium,
                display: 'block',
                marginBottom: spacing.sm,
                textTransform: 'uppercase',
              }}>
                {t.status}
              </label>
              <div style={{ display: 'flex', gap: spacing.sm, alignItems: 'center', flexWrap: 'wrap' }}>
                <select
                  value={tempStatus || selectedConsultation.status}
                  onChange={(e) => setTempStatus(e.target.value as Consultation['status'])}
                  disabled={isUpdating}
                  style={{
                    ...inputStyle,
                    color: getStatusColor(tempStatus || selectedConsultation.status),
                    fontWeight: typography.fontWeight.medium,
                    minWidth: '160px',
                  }}
                >
                  <option value="pending">{t.statusPending}</option>
                  <option value="scheduled">{t.statusScheduled}</option>
                  <option value="completed">{t.statusCompleted}</option>
                  <option value="cancelled">{t.statusCancelled}</option>
                </select>

                {tempStatus && tempStatus !== selectedConsultation.status && (
                  <Button
                    variant="success"
                    size="sm"
                    icon="bx-check"
                    onClick={handleStatusUpdate}
                    loading={isUpdating}
                    disabled={isUpdating}
                  >
                    {t.updateStatus}
                  </Button>
                )}
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: spacing.sm,
              justifyContent: 'space-between',
              paddingTop: spacing.lg,
              borderTop: `1px solid ${colors.border}`,
            }}>
              <Button
                variant="danger"
                size="sm"
                icon="bx-trash"
                onClick={() => handleDelete(selectedConsultation.id)}
                disabled={isUpdating}
              >
                {deleteConfirm === selectedConsultation.id ? t.confirmDelete : t.delete}
              </Button>

              <div style={{ display: 'flex', gap: spacing.sm }}>
                {deleteConfirm === selectedConsultation.id && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setDeleteConfirm(null)}
                    disabled={isUpdating}
                  >
                    {t.cancel}
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedConsultation(null)}
                  disabled={isUpdating}
                >
                  {t.close}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ConsultationsList);
