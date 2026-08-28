import { useState } from 'react';
import { Card, Tag, Button, Avatar, Divider, Row, Col, Input, Space, Progress, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  EditOutlined,
  SaveOutlined,
  LockOutlined,
  TeamOutlined,
  GlobalOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  SettingOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  KeyOutlined,
} from '@ant-design/icons';

function Profile({ compact = false }) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Aarav Sharma',
    role: 'Administrator',
    department: 'Revenue Department',
    designation: 'Deputy Collector (Revenue)',
    email: 'admin@lrds.gov.in',
    phone: '+91 94500 12345',
    employeeId: 'UP-REV-2024-0847',
    district: 'Agra',
    state: 'Uttar Pradesh',
    location: 'Collectorate, Agra • Block A, Room 204',
    joiningDate: '12 Mar 2021',
    lastLogin: '27 Aug 2026 • 09:42 IST',
    language: 'Hindi, English',
    govId: 'GOV-UP-AGRA-204',
  });

  const [draft, setDraft] = useState(profile);

  const handleSave = () => { 
    setProfile(draft); 
    setEditing(false); 
    message.success('Profile updated • audit logged'); 
  };

  const handleCancel = () => { 
    setDraft(profile); 
    setEditing(false); 
  };

  const stats = [
    { label: 'Records Verified', value: '1,248', icon: <CheckCircleOutlined />, sub: 'lifetime', color: '#10B981', bg: '#ECFDF5' },
    { label: 'Pending Actions', value: '46', icon: <ClockCircleOutlined />, sub: 'in queue', color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Accuracy Score', value: '96.2%', icon: <TrophyOutlined />, sub: 'avg confidence', color: '#FF6B1A', bg: '#FFF1E6' },
    { label: 'Districts Handled', value: '5', icon: <GlobalOutlined />, sub: 'Agra zone', color: '#6366F1', bg: '#EEF2FF' },
  ];

  const activity = [
    { time: '27 Aug • 09:42', action: 'Verified Khatauni #123/4A — Agra', status: 'Verified' },
    { time: '27 Aug • 08:15', action: 'Approved 12 records for LRMS sync', status: 'Synced' },
    { time: '26 Aug • 16:20', action: 'Corrected Tehsil field (55% → 98%)', status: 'Edited' },
    { time: '26 Aug • 14:30', action: 'Bulk intake: 32 docs ingested', status: 'Ingested' },
    { time: '25 Aug • 11:05', action: 'Password rotated • 2FA verified', status: 'Secured' },
  ];

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: compact ? 14 : 20 }}>
      {/* EXECUTIVE HEADER BANNER */}
      <Card bordered={false} className="saffron-card" style={{ borderRadius: 20, padding: 0, border: '1px solid #E2E8F0' }} bodyStyle={{ padding: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
          <Space size={8}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gradient-saffron)', color: '#111111', borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 850, boxShadow: 'var(--shadow-saffron)' }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: '#111111' }} className="pulse-dot" /> 
              GOVERNMENT PASSPORT & PROFILE
            </span>
            <span style={{ color: '#64748B', fontSize: 12, fontWeight: 700, display: compact ? 'none' : 'inline-flex', gap: 6, alignItems: 'center' }}>
              <SafetyCertificateOutlined style={{ color: '#10B981' }} /> AUDIT-TRAILED ACCESS
            </span>
          </Space>
          <Space size={8}>
            <Tag style={{ margin: 0, background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', fontWeight: 800, borderRadius: 999, fontSize: 11 }}>
              EMP ID: {profile.employeeId}
            </Tag>
          </Space>
        </div>

        <div className="profile-hero-grid" style={{ padding: compact ? '18px 16px' : '28px 24px', display: 'grid', gridTemplateColumns: compact ? 'auto 1fr' : 'auto 1fr auto', gap: 20, alignItems: 'center' }}>
          <Avatar size={compact ? 64 : 88} style={{ background: 'var(--gradient-saffron)', color: '#111111', fontWeight: 900, fontSize: compact ? 22 : 32, border: '3px solid #E2E8F0', flexShrink: 0, boxShadow: 'var(--shadow-saffron)' }}>
            {profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
          </Avatar>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ fontSize: compact ? 20 : 26, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1, fontFamily: 'var(--font-display)' }}>
                {profile.name}
              </div>
              <Tag style={{ margin: 0, background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', fontWeight: 800, borderRadius: 999, fontSize: 11 }}>
                <SafetyCertificateOutlined /> Deputy Collector
              </Tag>
            </div>
            <div style={{ marginTop: 6, color: '#475569', fontSize: 13.5, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <TeamOutlined style={{ color: '#854D0E' }} /> {profile.role} • {profile.department}
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 999, padding: '4px 12px', color: '#0F172A', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <MailOutlined /> {profile.email}
              </span>
              <span style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 999, padding: '4px 12px', color: '#0F172A', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <PhoneOutlined /> {profile.phone}
              </span>
            </div>
          </div>

          {!compact && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
              {!editing ? (
                <Button className="btn-primary-light" icon={<EditOutlined />} onClick={() => setEditing(true)} style={{ borderRadius: 12, fontWeight: 800, height: 42, paddingInline: 20 }}>
                  Edit Profile
                </Button>
              ) : (
                <Space>
                  <Button onClick={handleCancel} style={{ borderRadius: 10, height: 40, background: 'transparent', color: '#475569', border: '1px solid #E2E8F0', fontWeight: 700 }}>
                    Cancel
                  </Button>
                  <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} style={{ borderRadius: 10, height: 40, fontWeight: 800, background: '#10B981', color: '#fff', border: 'none' }}>
                    Save Changes
                  </Button>
                </Space>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* STATS STRIP */}
      {!compact && (
        <Row gutter={[16, 16]}>
          {stats.map((s) => (
            <Col xs={12} lg={6} key={s.label}>
              <Card bordered={false} className="saffron-card kpi-card" bodyStyle={{ padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 750, color: '#64748B', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', marginTop: 4, fontFamily: 'var(--font-display)' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{s.sub}</div>
                </div>
                <div className="metric-icon-wrap" style={{ background: s.bg, color: s.color, borderColor: 'transparent' }}>
                  {s.icon}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* ACTIVITY AUDIT LOG */}
      <Card 
        bordered={false} 
        className="saffron-card" 
        title={<span style={{ fontSize: 16, fontWeight: 850, color: '#0F172A' }}>Recent Verification Audit Log</span>}
        bodyStyle={{ padding: 20 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {activity.map((act, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#FAF9F6', borderRadius: 10, border: '1px solid #EAE1D2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: '#10B981' }} />
                <span style={{ fontWeight: 750, color: '#0F172A', fontSize: 13 }}>{act.action}</span>
              </div>
              <Space size={12}>
                <Tag style={{ margin: 0, borderRadius: 999, background: '#ECFDF5', color: '#10B981', borderColor: '#A7F3D0', fontWeight: 800 }}>{act.status}</Tag>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{act.time}</span>
              </Space>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Profile;
