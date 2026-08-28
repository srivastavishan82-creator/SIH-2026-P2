import { useState } from 'react';
import { Card, Button, message, Tabs, Table, Typography, Space, Badge, Popconfirm, List, Avatar, Tag, Divider } from 'antd';
import { ApiOutlined, GlobalOutlined, KeyOutlined, DeleteOutlined, SyncOutlined, CheckCircleOutlined, CopyOutlined, PlusOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

function Integrations() {
  const [loading, setLoading] = useState(false); 
  const [lrmsStatus, setLrmsStatus] = useState('disconnected'); 
  const [lrmsResponse, setLrmsResponse] = useState(null);
  
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'GIS System Integration', key: 'lrds_live_sk_89f3b20a1...', created: '2026-08-20', lastUsed: '2026-08-26 14:31', scope: 'read • write' },
    { id: '2', name: 'Mobile Field Inspector App', key: 'lrds_live_sk_44a9c11e7...', created: '2026-08-15', lastUsed: '2026-08-25 09:12', scope: 'read' },
  ]);

  const lrmsColumns = [
    { title: 'Status', dataIndex: 'status', key: 'status', render: (v) => <Tag style={{ background: '#ECFDF5', color: '#10B981', borderColor: '#A7F3D0', fontWeight: 800 }}>{v}</Tag> },
    { title: 'Records Synced', dataIndex: 'records_synced', key: 'records_synced', render: (v) => <span style={{ fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-mono)' }}>{v}</span> },
    { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp', render: (v) => <span style={{ color: '#64748B', fontSize: 12 }}>{v}</span> }
  ];

  const syncLrms = () => { 
    setLoading(true); 
    setLrmsStatus('syncing'); 
    setTimeout(() => { 
      setLrmsResponse({ status: 'Success', records_synced: 245, timestamp: new Date().toLocaleString() }); 
      setLrmsStatus('connected'); 
      setLoading(false); 
      message.success('LRMS / DILRMP sync completed — 245 records reconciled');
    }, 1800); 
  };

  const deleteKey = (id) => { 
    setApiKeys(apiKeys.filter(k => k.id !== id)); 
    message.success('API key revoked successfully'); 
  };

  const generateKey = () => { 
    const nk = { 
      id: Date.now().toString(), 
      name: 'New Integration Secret Key', 
      key: `lrds_live_sk_${Math.random().toString(36).substring(2, 11)}...`, 
      created: new Date().toISOString().split('T')[0], 
      lastUsed: 'Never', 
      scope: 'read • write' 
    }; 
    setApiKeys([nk, ...apiKeys]); 
    message.success('New API key generated! Store securely.'); 
  };

  const items = [
    { 
      key: 'systems', 
      label: 'Gov System Connections', 
      icon: <GlobalOutlined />, 
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '8px 0' }}>
          {/* LRMS CARD */}
          <Card bordered={false} className="saffron-card" bodyStyle={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', minWidth: 280 }}>
                <div style={{ 
                  width: 50, height: 50, borderRadius: 14, 
                  background: 'var(--gradient-navy)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', color: '#fff', 
                  fontSize: 22, boxShadow: 'var(--shadow-navy)' 
                }}>
                  <GlobalOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 850, color: '#0F172A', fontSize: 16 }}>LRMS / DILRMP Central Sync</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                    Reconcile verified digital records directly to central government database.
                  </div>
                  <Space size={6} style={{ marginTop: 8 }} wrap>
                    <Tag style={{ borderRadius: 999, background: '#EEF2FF', border: '1px solid #C7D2FE', color: '#4F46E5', fontWeight: 750 }}>mTLS 1.3</Tag>
                    <Tag style={{ borderRadius: 999, background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#047857', fontWeight: 750 }}>Idempotent Gate</Tag>
                  </Space>
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                {lrmsStatus === 'disconnected' && <Badge status="default" text={<span style={{ fontWeight: 700, color: '#64748B', fontSize: 12 }}>Disconnected</span>} />}
                {lrmsStatus === 'syncing' && <Badge status="processing" color="#FF6B1A" text={<span style={{ fontWeight: 700, color: '#FF6B1A', fontSize: 12 }}>Syncing with DILRMP…</span>} />}
                {lrmsStatus === 'connected' && <Badge status="success" color="#10B981" text={<span style={{ fontWeight: 700, color: '#10B981', fontSize: 12 }}>Connected • Synced</span>} />}
                
                <Button 
                  type={lrmsStatus === 'connected' ? 'default' : 'primary'} 
                  icon={lrmsStatus === 'syncing' ? <SyncOutlined spin /> : <ApiOutlined />} 
                  loading={loading} 
                  onClick={syncLrms} 
                  style={{ borderRadius: 10, fontWeight: 800, paddingInline: 20 }}
                >
                  {lrmsStatus === 'connected' ? 'Sync Again' : 'Connect & Sync'}
                </Button>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>Last sync: 2 hours ago</div>
              </div>
            </div>

            {lrmsResponse && (
              <div style={{ marginTop: 16, background: '#FAF9F6', border: '1px solid #EAE1D2', borderRadius: 12, padding: 14 }}>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 12, letterSpacing: '0.04em' }}>LAST SYNC EXECUTION SUMMARY</div>
                <Table dataSource={[lrmsResponse]} columns={lrmsColumns} pagination={false} size="small" style={{ marginTop: 8 }} />
              </div>
            )}
          </Card>

          {/* POSTGIS SPATIAL STORE CARD */}
          <Card bordered={false} className="saffron-card" bodyStyle={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: 22 }}>
                  <CheckCircleOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 850, color: '#0F172A', fontSize: 16 }}>PostGIS — Cadastral Boundary Layer</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                    Spatial vector store for GeoJSON parcel exports • EPSG 4326 • Tile cache enabled.
                  </div>
                </div>
              </div>
              <Space>
                <Tag style={{ borderRadius: 999, background: '#ECFDF5', color: '#047857', borderColor: '#A7F3D0', fontWeight: 800, padding: '4px 12px' }}>
                  Connected
                </Tag>
                <Button style={{ borderRadius: 10, background: '#fff', border: '1px solid #CBD5E1', fontWeight: 700, color: '#0F172A' }}>
                  Configure Layer
                </Button>
              </Space>
            </div>
          </Card>
        </div>
      )
    },
    { 
      key: 'apikeys', 
      label: 'API Keys & Developer Portal', 
      icon: <KeyOutlined />, 
      children: (
        <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Text style={{ color: '#64748B', fontSize: 13.5 }}>
              Manage API secret keys for GIS systems, mobile inspectors, and partner state portals.
            </Text>
            <Button type="primary" icon={<PlusOutlined />} onClick={generateKey} style={{ borderRadius: 10, fontWeight: 800 }}>
              Generate New API Key
            </Button>
          </div>

          <List 
            bordered 
            dataSource={apiKeys} 
            style={{ borderRadius: 14, borderColor: '#E2E8F0', background: '#fff', overflow: 'hidden' }} 
            renderItem={item => (
              <List.Item actions={[
                <Button key="copy" size="small" icon={<CopyOutlined />} onClick={() => { navigator.clipboard?.writeText(item.key); message.success('API key copied!'); }} style={{ borderRadius: 8, fontWeight: 700, border: '1px solid #CBD5E1', color: '#0F172A', background: '#fff' }}>
                  Copy Key
                </Button>,
                <Popconfirm key="del" title="Revoke this API key? Access will be immediately cut off." onConfirm={() => deleteKey(item.id)}>
                  <Button type="text" danger icon={<DeleteOutlined />} style={{ borderRadius: 8 }} />
                </Popconfirm>
              ]}>
                <List.Item.Meta 
                  avatar={<Avatar style={{ background: 'var(--gradient-navy)', color: '#fff' }} icon={<KeyOutlined />} />} 
                  title={<span style={{ fontWeight: 800, color: '#0F172A' }}>{item.name} <Tag style={{ marginLeft: 8, borderRadius: 999, background: '#EEF2FF', border: '1px solid #C7D2FE', color: '#4F46E5', fontWeight: 750 }}>{item.scope}</Tag></span>} 
                  description={
                    <Space direction="vertical" size={4} style={{ marginTop: 4 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', background: '#FAF9F6', border: '1px solid #EAE1D2', padding: '4px 10px', borderRadius: 8, fontSize: 12.5, fontWeight: 750, color: '#0F172A' }}>
                        {item.key}
                      </span>
                      <span style={{ fontSize: 12, color: '#94A3B8' }}>Created: {item.created} • Last used: {item.lastUsed}</span>
                    </Space>
                  } 
                />
              </List.Item>
            )} 
          />
        </div>
      )
    }
  ];

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* HEADER BANNER */}
      <Card bordered={false} className="saffron-card" style={{ borderRadius: 20, padding: 0, border: '1px solid #E2E8F0' }} bodyStyle={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: '#854D0E', fontWeight: 700 }}>
              SYSTEM INTEGRATIONS • API GATEWAY
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#0F172A', marginTop: 6, lineHeight: 1 }}>
              Integrations & API Portal <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#854D0E' }}>— connect</span>
            </div>
            <div style={{ color: '#475569', fontSize: 14, marginTop: 8 }}>
              Government database connectors, PostGIS spatial store, and scoped API security keys.
            </div>
          </div>
          <Tag style={{ borderRadius: 999, background: '#F1F5F9', color: '#0F172A', border: '1px solid #E2E8F0', fontWeight: 800, padding: '6px 14px' }}>
            Gov Cloud • Isolated VPC
          </Tag>
        </div>
      </Card>

      <Card bordered={false} className="saffron-card animate-scale-in" bodyStyle={{ padding: 20 }}>
        <Tabs defaultActiveKey="systems" items={items} size="large" />
      </Card>
    </div>
  );
}

export default Integrations;
