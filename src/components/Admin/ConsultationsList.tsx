"use client";

import React, { useState, useMemo, memo, useCallback } from "react";
import { useAdminLang } from "@/hooks/useAdminLang";

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

  // Service type mapping to match website consultation form
  const serviceTypeMap = {
    en: {
      'ai-solutions': 'AI Solutions',
      'cybersecurity': 'Cybersecurity Services',
      'big-data': 'Big Data & Analytics',
      'cloud-computing': 'Cloud Computing & Hosting',
      'sme-eazy': 'SME-EAZY Program',
      'digital-transformation': 'Digital Transformation',
      'vision-2030': 'Vision 2030 Initiatives',
      'security-training': 'Security Training & Awareness',
      'other': 'Other',
    },
    ar: {
      'ai-solutions': 'حلول الذكاء الاصطناعي',
      'cybersecurity': 'خدمات الأمن السيبراني',
      'big-data': 'البيانات الضخمة والتحليلات',
      'cloud-computing': 'الحوسبة السحابية والاستضافة',
      'sme-eazy': 'برنامج SME-EAZY',
      'digital-transformation': 'التحول الرقمي',
      'vision-2030': 'مبادرات رؤية 2030',
      'security-training': 'التدريب والتوعية الأمنية',
      'other': 'أخرى',
    }
  };

  const getServiceName = (serviceType: string | undefined): string => {
    if (!serviceType) return '-';
    const serviceMap = isArabic ? serviceTypeMap.ar : serviceTypeMap.en;
    return serviceMap[serviceType as keyof typeof serviceMap] || serviceType;
  };

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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: '#f59e0b',
      scheduled: '#3b82f6',
      completed: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

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

      alert(t.updateSuccess);
    } catch (error) {
      console.error('Error updating status:', error);
      alert(t.updateError);
    } finally {
      setIsUpdating(false);
    }
  }, [selectedConsultation, tempStatus, t]);

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
      alert(t.deleteSuccess);
    } catch (error) {
      console.error('Error deleting consultation:', error);
      alert(t.deleteError);
    } finally {
      setIsUpdating(false);
    }
  }, [deleteConfirm, t]);

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

  return (
    <div style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: t.total, value: stats.total, color: '#0A4D8C' },
          { label: t.pending, value: stats.pending, color: '#f59e0b' },
          { label: t.scheduled, value: stats.scheduled, color: '#3b82f6' },
          { label: t.completed, value: stats.completed, color: '#10b981' },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #e5e7eb',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '250px',
            padding: '10px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            direction: isArabic ? 'rtl' : 'ltr',
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
          }}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '10px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
          }}
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
          style={{
            padding: '10px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            minWidth: '180px',
          }}
        >
          <option value="all">{t.allServices}</option>
          <option value="ai-solutions">{isArabic ? 'حلول الذكاء الاصطناعي' : 'AI Solutions'}</option>
          <option value="cybersecurity">{isArabic ? 'خدمات الأمن السيبراني' : 'Cybersecurity'}</option>
          <option value="big-data">{isArabic ? 'البيانات الضخمة' : 'Big Data & Analytics'}</option>
          <option value="cloud-computing">{isArabic ? 'الحوسبة السحابية' : 'Cloud Computing'}</option>
          <option value="sme-eazy">{isArabic ? 'برنامج SME-EAZY' : 'SME-EAZY'}</option>
          <option value="digital-transformation">{isArabic ? 'التحول الرقمي' : 'Digital Transformation'}</option>
          <option value="vision-2030">{isArabic ? 'رؤية 2030' : 'Vision 2030'}</option>
          <option value="security-training">{isArabic ? 'التدريب الأمني' : 'Security Training'}</option>
          <option value="other">{isArabic ? 'أخرى' : 'Other'}</option>
        </select>
      </div>

      {/* Consultations Table */}
      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                  {t.name}
                </th>
                <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                  {t.contact}
                </th>
                <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                  {t.service}
                </th>
                <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                  {t.status}
                </th>
                <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                  {t.date}
                </th>
                <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultations.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.noConsultations}
                  </td>
                </tr>
              ) : (
                filteredConsultations.map((consultation) => (
                  <tr
                    key={consultation.id}
                    style={{ borderBottom: '1px solid #e5e7eb' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#fff';
                    }}
                  >
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '600', color: '#1a1a1a', marginBottom: '4px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                        {consultation.contact_person}
                      </div>
                      {consultation.company_name && (
                        <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>{consultation.company_name}</div>
                      )}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontSize: '13px', color: '#374151', marginBottom: '2px', direction: 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                        <i className="bx bx-envelope" style={{ [isArabic ? 'marginLeft' : 'marginRight']: '6px' }}></i>
                        {consultation.email}
                      </div>
                      {consultation.phone && (
                        <div style={{ fontSize: '13px', color: '#374151', direction: 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                          <i className="bx bx-phone" style={{ [isArabic ? 'marginLeft' : 'marginRight']: '6px' }}></i>
                          {consultation.phone}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#374151', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                      {getServiceName(consultation.service_type)}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: isArabic ? 'none' : 'uppercase',
                          background: `${getStatusColor(consultation.status)}20`,
                          color: getStatusColor(consultation.status),
                          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                        }}
                      >
                        {getStatusLabel(consultation.status)}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>
                      {formatDate(consultation.created_at)}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <button
                        onClick={() => setSelectedConsultation(consultation)}
                        style={{
                          padding: '8px 16px',
                          background: '#0A4D8C',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                        }}
                      >
                        {t.view}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

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
            padding: '20px',
          }}
          onClick={() => setSelectedConsultation(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              padding: '32px',
              direction: isArabic ? 'rtl' : 'ltr',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                {t.consultationDetails}
              </h2>
              <button
                onClick={() => setSelectedConsultation(null)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <i className="bx bx-x"></i>
              </button>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.name}
                  </label>
                  <div style={{ fontSize: '15px', color: '#1a1a1a', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>{selectedConsultation.contact_person}</div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.company}
                  </label>
                  <div style={{ fontSize: '15px', color: '#1a1a1a', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {selectedConsultation.company_name || '-'}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.email}
                  </label>
                  <div style={{ fontSize: '15px', color: '#1a1a1a', direction: 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                    <a href={`mailto:${selectedConsultation.email}`} style={{ color: '#0A4D8C' }}>
                      {selectedConsultation.email}
                    </a>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.phone}
                  </label>
                  <div style={{ fontSize: '15px', color: '#1a1a1a', direction: 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                    {selectedConsultation.phone ? (
                      <a href={`tel:${selectedConsultation.phone}`} style={{ color: '#0A4D8C' }}>
                        {selectedConsultation.phone}
                      </a>
                    ) : (
                      '-'
                    )}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.serviceType}
                  </label>
                  <div style={{ fontSize: '15px', color: '#1a1a1a', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {selectedConsultation.service_type || '-'}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.createdAt}
                  </label>
                  <div style={{ fontSize: '15px', color: '#1a1a1a' }}>
                    {formatDate(selectedConsultation.created_at)}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                  {t.description}
                </label>
                <div
                  style={{
                    fontSize: '15px',
                    color: '#1a1a1a',
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    lineHeight: '1.6',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  }}
                >
                  {selectedConsultation.description}
                </div>
              </div>

              {(selectedConsultation.budget || selectedConsultation.preferred_date) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  {selectedConsultation.budget && (
                    <div>
                      <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                        {t.budget}
                      </label>
                      <div style={{ fontSize: '15px', color: '#1a1a1a', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                        {selectedConsultation.budget}
                      </div>
                    </div>
                  )}
                  {selectedConsultation.preferred_date && (
                    <div>
                      <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                        {t.preferredDate}
                      </label>
                      <div style={{ fontSize: '15px', color: '#1a1a1a' }}>
                        {formatDate(selectedConsultation.preferred_date)}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '8px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                  {t.status}
                </label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <select
                    value={tempStatus || selectedConsultation.status}
                    onChange={(e) => setTempStatus(e.target.value as Consultation['status'])}
                    disabled={isUpdating}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                      fontWeight: '600',
                      background: '#fff',
                      color: getStatusColor(tempStatus || selectedConsultation.status),
                      cursor: isUpdating ? 'not-allowed' : 'pointer',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      flex: 1,
                      maxWidth: '200px',
                    }}
                  >
                    <option value="pending">{t.statusPending}</option>
                    <option value="scheduled">{t.statusScheduled}</option>
                    <option value="completed">{t.statusCompleted}</option>
                    <option value="cancelled">{t.statusCancelled}</option>
                  </select>

                  {tempStatus && tempStatus !== selectedConsultation.status && (
                    <button
                      onClick={handleStatusUpdate}
                      disabled={isUpdating}
                      style={{
                        padding: '10px 20px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: isUpdating ? 'not-allowed' : 'pointer',
                        color: '#fff',
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                        opacity: isUpdating ? 0.6 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isUpdating) {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
                      }}
                    >
                      <i className="bx bx-check"></i>
                      {isUpdating ? t.updating : t.updateStatus}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', marginTop: '20px' }}>
              <button
                onClick={() => handleDelete(selectedConsultation.id)}
                disabled={isUpdating}
                style={{
                  padding: '10px 24px',
                  background: deleteConfirm === selectedConsultation.id
                    ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                    : '#ef4444',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: isUpdating ? 'not-allowed' : 'pointer',
                  color: '#fff',
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  opacity: isUpdating ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <i className="bx bx-trash"></i>
                {deleteConfirm === selectedConsultation.id ? t.confirmDelete : t.delete}
              </button>

              <div style={{ display: 'flex', gap: '12px' }}>
                {deleteConfirm === selectedConsultation.id && (
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    disabled={isUpdating}
                    style={{
                      padding: '10px 24px',
                      background: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: isUpdating ? 'not-allowed' : 'pointer',
                      color: '#374151',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                    }}
                  >
                    {t.cancel}
                  </button>
                )}
                <button
                  onClick={() => setSelectedConsultation(null)}
                  disabled={isUpdating}
                  style={{
                    padding: '10px 24px',
                    background: '#0A4D8C',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: isUpdating ? 'not-allowed' : 'pointer',
                    color: '#fff',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                    opacity: isUpdating ? 0.6 : 1,
                  }}
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ConsultationsList);
