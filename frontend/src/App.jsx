import { useState } from 'react';
import { Layout, Menu, ConfigProvider, theme, Avatar, Dropdown, Button, Input, Badge, Breadcrumb, Tooltip, Tag, Drawer } from 'antd';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  FileTextOutlined,
  BarChartOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  CloudUploadOutlined,
  DashboardOutlined,
  AuditOutlined,
  SettingOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import Dashboard from './pages/Dashboard';
import UploadDocument from './pages/UploadDocument';
import VerificationQueue from './pages/VerificationQueue';
import DocumentDetails from './pages/DocumentDetails';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';
import Profile from './pages/Profile';
import Landing from './components/Landing';
import Login from './pages/Login';

const { Header, Sider, Content } = Layout;

const routeMeta = {
  landing: { label: 'Product Landing', icon: <HomeOutlined /> },
  dashboard: { label: 'Overview', icon: <DashboardOutlined /> },
  upload: { label: 'Document Intake', icon: <CloudUploadOutlined /> },
  verification: { label: 'Verification Queue', icon: <AuditOutlined /> },
  documents: { label: 'Verified Records', icon: <FileTextOutlined /> },
  analytics: { label: 'Analytics & Reports', icon: <BarChartOutlined /> },
  integrations: { label: 'System Settings', icon: <SettingOutlined /> },
  profile: { label: 'My Profile', icon: <UserOutlined /> },
};

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rawPath = location.pathname.replace(/^\//, '');
  const currentPath = !rawPath || rawPath === 'landing' ? 'landing' : rawPath;
  const meta = routeMeta[currentPath] || routeMeta.dashboard;

  const menuItems = [
    { type: 'group', label: <span className="section-label" style={{ paddingLeft: 12 }}>Product</span> },
    { key: 'landing', icon: <HomeOutlined />, label: 'Landing Showcase' },
    { type: 'group', label: <span className="section-label" style={{ paddingLeft: 12 }}>Operations</span> },
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Overview' },
    { key: 'upload', icon: <CloudUploadOutlined />, label: 'Document Intake' },
    { key: 'verification', icon: <AuditOutlined />, label: 'Verification Queue' },
    { key: 'documents', icon: <FileTextOutlined />, label: 'Verified Records' },
    { type: 'group', label: <span className="section-label" style={{ paddingLeft: 12 }}>Intelligence</span> },
    { key: 'analytics', icon: <BarChartOutlined />, label: 'Analytics & Reports' },
    { type: 'group', label: <span className="section-label" style={{ paddingLeft: 12 }}>System</span> },
    { key: 'integrations', icon: <SettingOutlined />, label: 'Integrations' },
  ];

  const handleUserMenuClick = ({ key }) => {
    if (key === 'profile') setProfileOpen(true);
    if (key === 'prefs') setProfileOpen(true);
    if (key === 'landing') navigate('/landing');
  };

  const userMenu = {
    items: [
      { key: 'landing', label: 'View Showcase Landing', icon: <HomeOutlined /> },
      { key: 'profile', label: 'View Profile', icon: <UserOutlined /> },
      { key: 'prefs', label: 'Preferences', icon: <SettingOutlined /> },
      { type: 'divider' },
      { key: 'signout', label: 'Sign Out', danger: true, onClick: () => { setIsAuthenticated(false); navigate('/login'); } },
    ],
    onClick: handleUserMenuClick,
  };

  const breadcrumbItems = [ 
    { title: <span className="breadcrumb-muted" style={{ cursor: 'pointer' }} onClick={() => navigate('/landing')}>Bhoomi AI</span> }, 
    { title: <span className="breadcrumb-active">{meta.label}</span> }, 
  ];

  if (currentPath === 'landing') {
    return (
      <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm,
        token: { colorPrimary: '#d9f203', colorBgContainer: '#111111', fontFamily: 'Inter, system-ui, sans-serif' },
      }}>
        <Landing onLaunch={() => navigate(isAuthenticated ? '/dashboard' : '/login')} />
      </ConfigProvider>
    );
  }

  if (currentPath === 'login') {
    return (
      <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm,
        token: { colorPrimary: '#d9f203', colorBgContainer: '#111111', fontFamily: 'Inter, system-ui, sans-serif' },
      }}>
        <Login onLogin={() => { setIsAuthenticated(true); navigate('/dashboard'); }} />
      </ConfigProvider>
    );
  }

  // Temporarily disabled for prototype testing so all pages are accessible
  // if (!isAuthenticated && currentPath !== 'landing' && currentPath !== 'login') {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm,
      token: { 
        colorPrimary: '#d9f203', 
        colorBgContainer: '#111111', 
        fontFamily: 'Inter, system-ui, sans-serif', 
        colorText: '#ffffff', 
        colorTextSecondary: '#9e9e9e', 
        borderRadius: 10, 
        colorBorderSecondary: '#333333' 
      },
      components: { 
        Layout: { siderBg: '#111111', headerBg: '#111111' }, 
        Menu: { itemBg: 'transparent', itemHoverBg: '#212121', itemSelectedBg: '#d9f203', itemSelectedColor: '#111111' } 
      },
    }}>
      <Layout style={{ minHeight: '100vh', background: '#000000' }}>
        <Sider 
          collapsible 
          collapsed={collapsed} 
          onCollapse={setCollapsed} 
          trigger={null} 
          width={268} 
          collapsedWidth={72} 
          breakpoint="lg" 
          onBreakpoint={(b)=>setCollapsed(b)}
          style={{ overflow:'auto', height:'100vh', position:'sticky', top:0, left:0, zIndex:20, borderRight:'1px solid #333333', background:'#111111' }}
        >
          <div style={{ height:64, display:'flex', alignItems:'center', padding: collapsed?'0 14px':'0 18px', justifyContent:collapsed?'center':'flex-start', borderBottom:'1px solid #333333', gap:10, flexShrink:0 }}>
            <div style={{ width:34, height:34, borderRadius:9, background:'#d9f203', display:'flex', alignItems:'center', justifyContent:'center', color:'#111111', fontSize:14, fontWeight:900, flexShrink:0 }}>◈</div>
            {!collapsed && (
              <div style={{lineHeight:1.1, cursor: 'pointer'}} onClick={() => navigate('/landing')}>
                <div style={{fontWeight:850, fontSize:15, letterSpacing:'-0.03em', color:'#ffffff', fontFamily:'Host Grotesk, Inter, sans-serif'}}>Bhoomi AI</div>
                <div style={{fontSize:11, color:'#9e9e9e', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase'}}>Land Record OS</div>
              </div>
            )}
          </div>



          <Menu 
            mode="inline" 
            selectedKeys={[currentPath]} 
            items={menuItems} 
            onClick={({key}) => navigate(`/${key}`)} 
            style={{borderRight:0, background:'transparent', paddingBottom:16}} 
          />


        </Sider>

        <Layout style={{background:'transparent', minWidth:0}}>
          <Header className="glass-header" style={{padding:'0 18px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:10, height:64, gap:16, background: '#111111', borderBottom: '1px solid #333333'}}>
            <div style={{display:'flex', alignItems:'center', gap:12, minWidth:0, flex:1}}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => {
                  setCollapsed(!collapsed);
                  setMobileNavOpen(true);
                }}
                style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid #333333', background: '#1a1a1a', color:'#ffffff' }}
              />
              <div className="mobile-brand-title" style={{ display: 'none', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 26, height: 26, borderRadius: 6, background: '#d9f203', color: '#111111', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900 }}>◈</span>
                <span style={{ fontWeight: 850, fontSize: 14, color: '#ffffff', letterSpacing: '-0.02em' }}>Bhoomi AI</span>
              </div>
              <div className="header-divider" style={{width:1, height:18, background:'#333333', flexShrink:0}} />
              <div className="header-breadcrumb-wrap" style={{display:'flex', alignItems:'center', gap:8, minWidth:0}}>
                <span style={{fontSize:16, color:'#d9f203'}}>{meta.icon}</span>
                <Breadcrumb items={breadcrumbItems} style={{margin:0}} />
                <Tag className="header-version-tag" style={{marginLeft:6, background:'#d9f203', color:'#111111', border:'none', borderRadius:999, fontWeight:750, fontSize:11}}>v2.0</Tag>
              </div>
            </div>

            <div className="header-actions" style={{display:'flex', alignItems:'center', gap:8, flexShrink:0}}>
              <Input className="header-search" prefix={<SearchOutlined style={{color:'#9e9e9e'}} />} placeholder="Search records, khasra, owner…" style={{width:260, background:'#1a1a1a', borderRadius:10, border:'1px solid #333333', height:36, color:'#ffffff'}} allowClear />
              <div className="header-help-btn">
                <Tooltip title="View Landing Showcase"><Button type="text" onClick={() => navigate('/landing')} icon={<HomeOutlined style={{fontSize:16, color:'#d9f203'}} />} style={{width:34, height:34, border:'1px solid #333333', background:'#1a1a1a', borderRadius:8}} /></Tooltip>
              </div>
              <Badge count={3} size="small" offset={[-2,2]} color="#d9f203"><Button type="text" icon={<BellOutlined style={{fontSize:16, color:'#ffffff'}} />} style={{width:34, height:34, background:'#1a1a1a', border:'1px solid #333333', borderRadius:8}} /></Badge>
              <div className="header-divider" style={{width:1, height:20, background:'#333333', margin:'0 2px'}} />
              <Dropdown menu={userMenu} placement="bottomRight" arrow>
                <div onClick={() => setProfileOpen(true)} className="header-profile-pill" style={{cursor:'pointer', display:'flex', alignItems:'center', gap:10, padding:'3px 8px 3px 3px', borderRadius:999, background:'#1a1a1a', border:'1px solid #333333'}}>
                  <Avatar size={30} style={{background:'#d9f203', fontWeight:800, fontSize:12, flexShrink:0, color:'#111111'}}>AD</Avatar>
                  <div className="header-profile-text" style={{lineHeight:1.15, paddingRight:2}}><div style={{fontWeight:750, fontSize:13, color:'#ffffff'}}>Admin • Revenue Dept.</div><div style={{fontSize:11, color:'#9e9e9e'}}>admin@lrds.gov.in</div></div>
                </div>
              </Dropdown>
            </div>
          </Header>

          <Content className="app-content" style={{margin:0, padding:'24px 28px', maxWidth:1440, width:'100%', marginInline:'auto', minHeight:280}}>
            <ConfigProvider theme={{
              algorithm: theme.defaultAlgorithm,
              token: { 
                colorPrimary: '#d9f203', 
                colorBgContainer: '#ffffff', 
                fontFamily: 'Inter, system-ui, sans-serif', 
                colorText: '#000000', 
                colorTextSecondary: '#000000', 
                borderRadius: 10, 
                colorBorderSecondary: '#000000' 
              },
            }}>
            <Routes>
              <Route path="/" element={<Navigate to="/landing" replace />} />
              <Route path="/landing" element={<Landing onLaunch={() => navigate(isAuthenticated ? '/dashboard' : '/login')} />} />
              <Route path="/login" element={<Login onLogin={() => { setIsAuthenticated(true); navigate('/dashboard'); }} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<UploadDocument />} />
              <Route path="/verification" element={<VerificationQueue />} />
              <Route path="/documents" element={<DocumentDetails />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            </ConfigProvider>

            <div style={{marginTop:30, padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, color:'#000000', fontSize:12.5, background:'#ffffff', borderRadius:12, border:'1px solid #000000'}}>
              <span>© 2026 Bhoomi AI — Land Record Digitization System</span>
              <span style={{display:'flex', gap:12, alignItems:'center'}}>
                <span style={{display:'inline-flex', alignItems:'center', gap:6}}>
                  <span style={{width:8, height:8, borderRadius:999, background:'#d9f203', border:'1px solid #000000', display:'inline-block'}} /> 
                  Neural Engine Online
                </span>
                <span>•</span>
                <span>Accuracy 98.4%</span>
              </span>
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* User Profile Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <span style={{ fontWeight: 850, letterSpacing: '-0.02em', color: '#ffffff', wordBreak: 'break-word', flex: 1, minWidth: 200 }}>My Profile • Revenue Administrator</span>
            <Button onClick={() => { setProfileOpen(false); navigate('/profile'); }} style={{ borderRadius: 8, fontWeight: 700, background: '#d9f203', color: '#111111', border: 'none', padding: '4px 10px', height: 'auto', flexShrink: 0 }}>Full Profile →</Button>
          </div>
        }
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        width={640}
        destroyOnClose={false}
        styles={{ body: { padding: 16, background: '#000000' }, header: { borderBottom: '1px solid #333333', background: '#111111', padding: '12px 16px' } }}
      >
        <Profile compact />
      </Drawer>

      {/* Mobile Navigation Drawer */}
      <Drawer
        placement="left"
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        width={280}
        styles={{ body: { padding: 0, background: '#111111' }, header: { borderBottom: '1px solid #333333', padding: '14px 16px', background: '#111111' } }}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#d9f203', color: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900 }}>◈</div>
            <div>
              <div style={{ fontWeight: 850, fontSize: 14, color: '#ffffff', lineHeight: 1.1 }}>Bhoomi AI Nav</div>
              <div style={{ fontSize: 10.5, color: '#9e9e9e', fontWeight: 700 }}>SIH 2026 • Revenue Dept</div>
            </div>
          </div>
        }
      >
        <Menu
          mode="inline"
          selectedKeys={[currentPath]}
          items={menuItems}
          onClick={({ key }) => {
            navigate(`/${key}`);
            setMobileNavOpen(false);
          }}
          style={{ borderRight: 0, background: 'transparent', marginTop: 12 }}
        />
      </Drawer>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation" style={{ background: '#111111', borderTop: '1px solid #333333' }}>
        <button className={currentPath === 'dashboard' ? 'active' : ''} onClick={() => navigate('/dashboard')} aria-label="Overview" style={{ color: currentPath === 'dashboard' ? '#d9f203' : '#9e9e9e' }}>
          <DashboardOutlined />
          <span>Overview</span>
        </button>
        <button className={currentPath === 'upload' ? 'active' : ''} onClick={() => navigate('/upload')} aria-label="Intake" style={{ color: currentPath === 'upload' ? '#d9f203' : '#9e9e9e' }}>
          <CloudUploadOutlined />
          <span>Intake</span>
        </button>
        <div className="fab-wrap" onClick={() => navigate('/upload')} aria-label="Quick Intake">
          <div className="mobile-fab" style={{ background: '#d9f203', color: '#111111' }}>
            <CloudUploadOutlined />
          </div>
        </div>
        <button className={currentPath === 'verification' ? 'active' : ''} onClick={() => navigate('/verification')} aria-label="Verify" style={{ color: currentPath === 'verification' ? '#d9f203' : '#9e9e9e' }}>
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <AuditOutlined />
            {currentPath !== 'verification' && (
              <span style={{ position: 'absolute', top: -2, right: -4, width: 6, height: 6, borderRadius: 999, background: '#d9f203', border: '1px solid #111111' }} />
            )}
          </div>
          <span>Verify</span>
        </button>
        <button className={currentPath === 'analytics' ? 'active' : ''} onClick={() => navigate('/analytics')} aria-label="Reports" style={{ color: currentPath === 'analytics' ? '#d9f203' : '#9e9e9e' }}>
          <BarChartOutlined />
          <span>Reports</span>
        </button>
      </nav>
    </ConfigProvider>
  );
}

export default App;
