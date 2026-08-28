import { useState } from 'react';
import { Card, Row, Col, Table, Tag, Typography, Space, Button, Divider, Steps } from 'antd';
import { 
  FileTextOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  EyeOutlined, 
  CloudUploadOutlined, 
  SafetyCertificateOutlined, 
  ArrowUpOutlined,
  ThunderboltOutlined, 
  ExperimentOutlined,
  RightOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;

function Dashboard() {
  const navigate = useNavigate();
  const [stats] = useState({ total: 413, processed: 367, pending: 46, accuracy: 94.8 });
  
  const recentDocuments = [
    { key: '1', name: 'land_record_001.pdf', type: 'Handwritten Register', district: 'Agra', status: 'Completed', confidence: 92, date: '26 Aug 14:30' },
    { key: '2', name: 'khasra_map_045.jpg', type: 'Cadastral Map', district: 'Lucknow', status: 'Processing', confidence: null, date: '26 Aug 14:28' },
    { key: '3', name: 'registry_2025.pdf', type: 'Printed PDF', district: 'Varanasi', status: 'Pending Review', confidence: 78, date: '25 Aug 09:15' },
    { key: '4', name: 'handwritten_register.pdf', type: 'Khatauni', district: 'Kanpur', status: 'Completed', confidence: 85, date: '25 Aug 08:45' },
    { key: '5', name: 'mutation_record.png', type: 'Mutation', district: 'Prayagraj', status: 'Completed', confidence: 97, date: '24 Aug 16:20' },
  ];

  const columns = [
    { 
      title: 'Document and Tehsil', 
      dataIndex: 'name', 
      key: 'name', 
      render: (text, rec) => (
        <div style={{lineHeight:1.3}}>
          <div style={{fontWeight:750, color:'#111111', fontSize:13.5}}>{text}</div>
          <div style={{fontSize:12, color:'#64748B'}}>{rec.district} {rec.type}</div>
        </div>
      )
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status', 
      width:150, 
      render: (status) => {
        if (status === 'Completed') return <Tag style={{borderRadius:999, fontWeight:750, padding:'2px 10px', background: 'rgba(217, 242, 3, 0.15)', color: '#d9f203', border: 'none'}}>Verified</Tag>;
        if (status === 'Processing') return <Tag style={{borderRadius:999, fontWeight:750, background: 'transparent', border: '1px solid #d9f203', color: '#d9f203'}}>Processing</Tag>;
        if (status === 'Pending Review') return <Tag style={{borderRadius:999, fontWeight:750, background: '#FFFBEB', border: '1px solid #FDE68A', color: '#D97706'}}>Needs Review</Tag>;
        return <Tag style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#475569' }}>{status}</Tag>;
      }
    },
    { 
      title: 'Confidence', 
      dataIndex: 'confidence', 
      key: 'confidence', 
      width:180, 
      render: (val) => {
        if (val == null) return <Text style={{fontSize:12, color:'#9e9e9e', fontStyle:'italic', fontWeight: 700}}>ANALYZING</Text>;
        const c = val >= 90 ? '#047857' : val >= 80 ? '#0F172A' : '#D97706';
        return (
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <span style={{fontWeight:800, fontSize:12, color:c, fontFamily:'JetBrains Mono,monospace', background: val >= 90 ? '#ECFDF5' : val >= 80 ? '#F1F5F9' : '#FFFBEB', padding: '4px 10px', borderRadius: 6, border: `1px solid ${val >= 90 ? '#A7F3D0' : val >= 80 ? '#E2E8F0' : '#FDE68A'}`}}>
              SCORE {val} percent
            </span>
          </div>
        );
      }
    },
    { title: 'Date', dataIndex: 'date', key: 'date', width:130, render: (d)=> <Text style={{color:'#9e9e9e', fontSize:12.5}}>{d}</Text> },
    { title: '', key: 'action', width:90, render: (_,r)=> <Button size="small" onClick={()=>navigate('/documents')} style={{borderRadius:8, fontWeight:700}}>View</Button> },
  ];

  const kpis = [
    { label: 'Total Ingested', value: 413, delta:'12.4 percent', sub:'vs last week', color:'#0F172A', bar:'#CBD5E1' },
    { label: 'Verified Records', value: 367, delta:'8.1 percent', sub:'auto verified', color:'#854D0E', bar:'#d9f203' },
    { label: 'Pending Review', value: 46, delta:'4 urgent', sub:'needs attention', color:'#0F172A', bar:'#CBD5E1' },
    { label: 'Model Accuracy', value: '94.8 percent', delta:'2.1 percent', sub:'extraction F1', color:'#0F172A', bar:'#CBD5E1' },
  ];

  const pipeline = [
    { step:'01', title:'Ingest & Scan', meta:'413 • checksum ok', pct:100, color:'#d9f203', status:'Done' },
    { step:'02', title:'OCR Layout Engine', meta:'395 • PaddleOCR 2.7', pct:95, color:'#ffffff', status:'Active' },
    { step:'03', title:'Indic NLP Extraction', meta:'382 • 11 scripts', pct:92, color:'#9e9e9e', status:'Active' },
    { step:'04', title:'Human Audit Gate', meta:'367 • 4 pending', pct:88, color:'#333333', status:'Review' },
  ];

  const donut = [
    { name: 'High', range: 'Greater than 90 percent', value: 65, fill: '#111111', bg: '#d9f203', border: '#111111', labelColor: '#111111', valueColor: '#111111', dot: '#111111', pillBg: '#111111', pillColor: '#d9f203', trackBg: '#FFFFFF' },
    { name: 'Medium', range: '70 to 90 percent', value: 25, fill: '#d9f203', bg: '#111111', border: '#111111', labelColor: '#FFFFFF', valueColor: '#d9f203', dot: '#d9f203', pillBg: '#d9f203', pillColor: '#111111', trackBg: '#FFFFFF' },
    { name: 'Low', range: 'Less than 70 percent', value: 10, fill: '#111111', bg: '#FFFFFF', border: '#111111', labelColor: '#111111', valueColor: '#111111', dot: '#d9f203', pillBg: '#111111', pillColor: '#FFFFFF', trackBg: '#FFFFFF' },
  ];

  return (
    <div className="animate-fade-in-up overview-section" style={{display:'flex', flexDirection:'column', gap:18}}>
      {/* NEW REPRESENTATION: Light paper header instead of dark hero */}
      <Card bordered={false} className="saffron-card" style={{borderRadius:16, background: '#ffffff', border: '1px solid #E2E8F0'}} bodyStyle={{padding:'18px 20px'}}>
        <div style={{display:'flex', justifyContent:'space-between', gap:16, flexWrap:'wrap', alignItems:'flex-start'}}>
          <div>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:8}}>
              <Tag style={{margin:0, background:'#d9f203', color:'#111111', border:'none', borderRadius:999, fontWeight:800, padding:'3px 10px', fontSize:11}}>SIH 2026 LIVE</Tag>
              <span style={{fontFamily:'JetBrains Mono,monospace', fontSize:11, letterSpacing:'0.08em', color:'#64748B', fontWeight:700}}>LAND RECORD OS BHHOOMI AI</span>
            </div>
            <div style={{fontFamily:'Host Grotesk, sans-serif', fontSize:26, fontWeight:900, letterSpacing:'-0.03em', color:'#111111', lineHeight:1.05}}>Digitization Command Overview</div>
            <div style={{color:'#475569', fontSize:13.5, marginTop:6, maxWidth:620}}>Monitor intake, OCR extraction, and human verification in one operational view. Lime verified white attention.</div>
          </div>
          <Space wrap>
            <Button type="primary" size="large" onClick={()=>navigate('/upload')} style={{borderRadius:10, fontWeight:800, height:40, background:'#d9f203', color:'#111111'}}>New Intake</Button>
            <Button size="large" onClick={()=>navigate('/verification')} style={{borderRadius:10, fontWeight:700, height:40}}>Queue 4</Button>
          </Space>
        </div>
        <Divider style={{margin:'14px 0 0', borderColor:'#E2E8F0'}} />
        <div style={{display:'flex', gap:18, flexWrap:'wrap', marginTop:12, color:'#6b6b6b', fontSize:12}}>
          <span style={{display:'inline-flex', alignItems:'center', gap:6}}><span style={{width:7, height:7, borderRadius:999, background:'#d9f203'}} /> PaddleOCR 2.7</span>
          <span>11 Indic scripts</span>
          <span>GeoJSON ready</span>
          <span style={{marginLeft:'auto', display:'inline-flex', alignItems:'center', gap:6}}>5 districts Agra to Prayagraj</span>
        </div>
      </Card>

      <Row gutter={[12,12]} className="stagger-container">
        {kpis.map(k=>(
          <Col xs={24} sm={12} lg={6} key={k.label}>
            <Card bordered={false} className="saffron-card kpi-card" bodyStyle={{padding:16, paddingTop:18}} style={{height:'100%', borderTop:`3px solid ${k.bar}`, background: '#ffffff', border: '1px solid #E2E8F0'}}>
              <div style={{display:'flex', flexDirection:'column', gap:2}}>
                <div style={{fontSize:11, fontWeight:800, letterSpacing:'0.06em', color:'#9e9e9e'}}>{k.label.toUpperCase()}</div>
                <div style={{fontSize:28, fontWeight:900, letterSpacing:'-0.04em', color:'#0F172A', marginTop:6, lineHeight:1, fontFamily:'Host Grotesk, sans-serif'}}>{k.value}</div>
                <div style={{marginTop:8, display:'inline-flex', alignItems:'center', gap:6, background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:999, padding:'3px 8px', fontSize:11, fontWeight:800}}>
                  <span style={{color:k.color}}>{k.delta}</span>
                  <span style={{color:'#94A3B8'}}>{k.sub}</span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[12,12]}>
        {/* PIPELINE — vertical timeline representation (was grid) */}
        <Col xs={24} lg={12}>
          <Card title={<span style={{fontWeight:850, color:'#0F172A'}}>Digitization Pipeline Stage Timeline</span>} extra={<Tag style={{borderRadius:999, background:'#d9f203', color:'#111111', border:'none', fontWeight:800}}>88 percent complete</Tag>} bordered={false} className="saffron-card" bodyStyle={{padding:'24px 32px'}} style={{ background: '#ffffff', border: '1px solid #E2E8F0', height: '100%' }}>
            <Steps
              direction="vertical"
              current={1}
              items={[
                {
                  title: <div style={{ color: '#0F172A', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Ingest and Scan <Tag color="success" style={{ marginLeft: 8, border: 'none', background: 'rgba(217, 242, 3, 0.15)', color: '#d9f203' }}>Done</Tag></div>,
                  description: (
                    <div style={{ color: '#9e9e9e', fontSize: 13, marginBottom: 16 }}>
                      413 records digested Checksum verified<br/>
                      <span style={{ display: 'inline-block', marginTop: 8, padding: '2px 8px', background: 'rgba(217, 242, 3, 0.15)', color: '#d9f203', borderRadius: 4, fontWeight: 700, fontSize: 11 }}>STATUS COMPLETED 100 percent</span>
                    </div>
                  ),
                  icon: <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#d9f203', color: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14 }}>1</div>
                },
                {
                  title: <div style={{ color: '#d9f203', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>OCR Layout Engine <Tag style={{ marginLeft: 8, border: '1px solid #d9f203', color: '#d9f203', background: 'transparent' }}>Active</Tag></div>,
                  description: (
                    <div style={{ color: '#9e9e9e', fontSize: 13, marginBottom: 16 }}>
                      395 records passing PaddleOCR 2.7 engine running<br/>
                      <span style={{ display: 'inline-block', marginTop: 8, padding: '2px 8px', background: 'transparent', border: '1px solid #d9f203', color: '#d9f203', borderRadius: 4, fontWeight: 700, fontSize: 11 }}>STATUS PROCESSING 95 percent</span>
                    </div>
                  ),
                  icon: <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'transparent', border: '2px solid #d9f203', color: '#d9f203', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14 }}>2</div>
                },
                {
                  title: <div style={{ color: '#0F172A', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Indic NLP Extraction</div>,
                  description: (
                    <div style={{ color: '#475569', fontSize: 13, marginBottom: 16 }}>
                      382 records waiting 11 regional scripts supported<br/>
                      <span style={{ display: 'inline-block', marginTop: 8, padding: '2px 8px', background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B', borderRadius: 4, fontWeight: 700, fontSize: 11 }}>STATUS IDLE 0 percent</span>
                    </div>
                  ),
                  icon: <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14 }}>3</div>
                },
                {
                  title: <div style={{ color: '#0F172A', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Human Audit Gate</div>,
                  description: <div style={{ color: '#475569', fontSize: 13 }}>Pending completion of extraction stages</div>,
                  icon: <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14 }}>4</div>
                }
              ]}
            />
          </Card>
        </Col>
        {/* CONFIDENCE — black/white/yellow only */}
        <Col xs={24} lg={12}>
          <Card bordered={false} className="saffron-card" bodyStyle={{padding:16}} title={<span style={{fontWeight:850, color:'#111111'}}>AI Confidence Spectrum</span>} extra={<Tag style={{borderRadius:999, fontWeight:800, background: '#d9f203', color: '#111111', border:'1px solid #111111'}}>F1 94.8 percent High Trust</Tag>} style={{ background: '#ffffff', border: '1px solid #E2E8F0', height: '100%' }}>
            <div style={{display:'flex', flexDirection:'column', gap:12, marginTop: 8}}>
              {donut.map(d=>(
                <div key={d.name} style={{background:d.bg, border:`1px solid ${d.border}`, borderLeft:`4px solid ${d.fill}`, borderRadius:10, padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <span style={{fontSize:11, fontWeight:800, color:d.pillColor, textTransform:'uppercase', letterSpacing:'0.06em', background:d.pillBg, border:`1px solid ${d.border}`, padding:'2px 7px', borderRadius:999}}>{d.name}</span>
                      <span style={{fontSize:11, fontWeight:700, color:d.labelColor}}>{d.range}</span>
                    </div>
                    <div style={{fontSize:22, fontWeight:900, color:d.valueColor, fontFamily:'Host Grotesk, sans-serif', marginTop:6, lineHeight:1}}>{d.value} percent <span style={{fontSize:12, fontWeight:700, color:d.labelColor}}>of records</span></div>
                    <div style={{height:6, background:d.trackBg, border:`1px solid ${d.border}`, borderRadius:999, marginTop:10, overflow:'hidden'}}>
                      <div style={{width:`${d.value}%`, height:'100%', background:d.fill, borderRadius:999}} />
                    </div>
                  </div>
                  <div style={{marginLeft:16, display:'flex', flexDirection:'column', alignItems:'center', gap:6, flexShrink:0}}>
                    <div style={{width:16, height:16, borderRadius:999, background:d.dot, border:`2px solid ${d.border}`, boxShadow: d.bg === '#FFFFFF' ? '0 0 0 3px #FFFFFF' : `0 0 0 3px ${d.bg}`}} />
                    <span style={{fontSize:10, fontWeight:800, color:d.labelColor, letterSpacing:'0.04em'}}>{d.value===65?'AUTO':d.value===25?'REVIEW':'RETRY'}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:12, background:'#111111', border:'1px solid #111111', borderRadius:10, padding:'10px 12px', fontSize:12, fontWeight:700, color:'#FFFFFF', display:'flex', alignItems:'center', gap:8}}>
              Threshold less than 80 percent auto routes to human queue <span style={{color:'#d9f203'}}>Low tier queued for manual audit</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Dashboard;
