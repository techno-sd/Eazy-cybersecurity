"use client";

import React, { useState, useMemo, memo, useCallback } from "react";
import { useAdminLang } from "@/hooks/useAdminLang";

interface Consultation {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type?: string;
  message: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: number;
  assigned_to_name?: string;
  notes?: string;
  created_at: string;
}

interface ConsultationsListProps {
  consultations: Consultation[];
}

const ConsultationsList: React.FC<ConsultationsListProps> = ({ consultations: initialConsultations }) => {
  const [consultations, setConsultations] = useState(initialConsultations);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterService, setFilterService] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { lang, isArabic } = useAdminLang();

  const translations = {
    en: {
      total: "Total",
      new: "New",
      inProgress: "In Progress",
      completed: "Completed",
      searchPlaceholder: "Search consultations...",
      allStatuses: "All Statuses",
      allPriorities: "All Priorities",
      allServices: "All Services",
      name: "Name",
      contact: "Contact",
      service: "Service",
      priority: "Priority",
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
      createdAt: "Created At",
      message: "Message",
      close: "Close",
      updateStatus: "Update Status",
      // Status values
      statusNew: "New",
      statusInProgress: "In Progress",
      statusCompleted: "Completed",
      statusCancelled: "Cancelled",
      // Priority values
      priorityUrgent: "Urgent",
      priorityHigh: "High",
      priorityMedium: "Medium",
      priorityLow: "Low",
    },
    ar: {
      total: "الإجمالي",
      new: "جديد",
      inProgress: "قيد التنفيذ",
      completed: "مكتمل",
      searchPlaceholder: "بحث في الاستشارات...",
      allStatuses: "كل الحالات",
      allPriorities: "كل الأولويات",
      allServices: "كل الخدمات",
      name: "الاسم",
      contact: "معلومات الاتصال",
      service: "الخدمة",
      priority: "الأولوية",
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
      createdAt: "تاريخ الإنشاء",
      message: "الرسالة",
      close: "إغلاق",
      updateStatus: "تحديث الحالة",
      // Status values
      statusNew: "جديد",
      statusInProgress: "قيد التنفيذ",
      statusCompleted: "مكتمل",
      statusCancelled: "ملغي",
      // Priority values
      priorityUrgent: "عاجل",
      priorityHigh: "عالي",
      priorityMedium: "متوسط",
      priorityLow: "منخفض",
    }
  };

  const t = translations[lang];

  const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, keyof typeof translations.en> = {
      'new': 'statusNew',
      'in_progress': 'statusInProgress',
      'completed': 'statusCompleted',
      'cancelled': 'statusCancelled',
    };
    const key = statusMap[status];
    return key ? t[key] : status;
  };

  const getPriorityLabel = (priority: string): string => {
    const priorityMap: Record<string, keyof typeof translations.en> = {
      'urgent': 'priorityUrgent',
      'high': 'priorityHigh',
      'medium': 'priorityMedium',
      'low': 'priorityLow',
    };
    const key = priorityMap[priority];
    return key ? t[key] : priority;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: '#f59e0b',
      in_progress: '#3b82f6',
      completed: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      urgent: '#dc2626',
    };
    return colors[priority] || '#6b7280';
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

  const filteredConsultations = useMemo(() => consultations.filter((consultation) => {
    const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || consultation.priority === filterPriority;
    const matchesService = filterService === 'all' || consultation.service_type === filterService;
    const matchesSearch =
      !searchTerm ||
      consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.service_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesPriority && matchesService && matchesSearch;
  }), [consultations, filterStatus, filterPriority, filterService, searchTerm]);

  const stats = useMemo(() => ({
    total: consultations.length,
    new: consultations.filter((c) => c.status === 'new').length,
    in_progress: consultations.filter((c) => c.status === 'in_progress').length,
    completed: consultations.filter((c) => c.status === 'completed').length,
  }), [consultations]);

  return (
    <div style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: t.total, value: stats.total, color: '#0A4D8C' },
          { label: t.new, value: stats.new, color: '#f59e0b' },
          { label: t.inProgress, value: stats.in_progress, color: '#3b82f6' },
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
          <option value="new">{t.statusNew}</option>
          <option value="in_progress">{t.statusInProgress}</option>
          <option value="completed">{t.statusCompleted}</option>
          <option value="cancelled">{t.statusCancelled}</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          style={{
            padding: '10px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
          }}
        >
          <option value="all">{t.allPriorities}</option>
          <option value="urgent">{t.priorityUrgent}</option>
          <option value="high">{t.priorityHigh}</option>
          <option value="medium">{t.priorityMedium}</option>
          <option value="low">{t.priorityLow}</option>
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
                  {t.priority}
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
                  <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
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
                        {consultation.name}
                      </div>
                      {consultation.company && (
                        <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>{consultation.company}</div>
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
                      {consultation.service_type || '-'}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: isArabic ? 'none' : 'uppercase',
                          background: `${getPriorityColor(consultation.priority)}20`,
                          color: getPriorityColor(consultation.priority),
                          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                        }}
                      >
                        {getPriorityLabel(consultation.priority)}
                      </span>
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
                  <div style={{ fontSize: '15px', color: '#1a1a1a', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>{selectedConsultation.name}</div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.company}
                  </label>
                  <div style={{ fontSize: '15px', color: '#1a1a1a', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {selectedConsultation.company || '-'}
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
                  {t.message}
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
                  {selectedConsultation.message}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.status}
                  </label>
                  <span
                    style={{
                      padding: '6px 14px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: isArabic ? 'none' : 'uppercase',
                      background: `${getStatusColor(selectedConsultation.status)}20`,
                      color: getStatusColor(selectedConsultation.status),
                      display: 'inline-block',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                    }}
                  >
                    {getStatusLabel(selectedConsultation.status)}
                  </span>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '6px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.priority}
                  </label>
                  <span
                    style={{
                      padding: '6px 14px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: isArabic ? 'none' : 'uppercase',
                      background: `${getPriorityColor(selectedConsultation.priority)}20`,
                      color: getPriorityColor(selectedConsultation.priority),
                      display: 'inline-block',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                    }}
                  >
                    {getPriorityLabel(selectedConsultation.priority)}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: isArabic ? 'flex-start' : 'flex-end' }}>
              <button
                onClick={() => setSelectedConsultation(null)}
                style={{
                  padding: '10px 24px',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: '#374151',
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                }}
              >
                {t.close}
              </button>
              <button
                style={{
                  padding: '10px 24px',
                  background: '#0A4D8C',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: '#fff',
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                }}
              >
                {t.updateStatus}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ConsultationsList);
