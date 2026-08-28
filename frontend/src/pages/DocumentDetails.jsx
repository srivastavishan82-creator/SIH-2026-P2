import { useState } from 'react';
import { Table, Tag, Input, Button, Space, message, Card, Divider, Row, Col } from 'antd';
import { SaveOutlined, ExportOutlined, CheckCircleOutlined, LeftOutlined, ZoomInOutlined, ZoomOutOutlined, FileTextOutlined, WarningOutlined, AimOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function DocumentDetails() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('4');
  const [zoom, setZoom] = useState(100);
  const [data, setData] = useState([
    { key: '1', field: 'Landowner Name', value: 'राजेश कुमार शर्मा', confidence: 92, verified: true },
    { key: '2', field: 'Father Name', value: 'राम कुमार शर्मा', confidence: 88, verified: true },
    { key: '3', field: 'Survey Number', value: '45/2B', confidence: 95, verified: true },
    { key: '4', field: 'Khasra Number', value: '123/4A', confidence: 78, verified: false },
    { key: '5', field: 'Plot Area', value: '2.45 hectares', confidence: 82, verified: true },
    { key: '6', field: 'Village', value: 'रामपुर', confidence: 90, verified: true },
    { key: '7', field: 'Tehsil', value: 'सदर', confidence: 55, verified: false },
  ]);
  const updateValue = (key, newValue) => { setData(data.map(i => i.key === key ? { ...i, value: newValue, verified: true, confidence: 98 } : i)); message.success('Field updated'); };
  const markVerified = (key) => { setData(data.map(i => i.key === key ? { ...i, verified: true, confidence: 98 } : i)); message.success('Field verified'); };
  const verifiedCount = data.filter(d=>d.verified).length;
  const overall = Math.round(data.reduce((a,c)=>a+c.confidence,0)/data.length);
  const active = data.find(d=>d.key===activeKey) || data[0];
  const columns = [
    { title: 'Field', dataIndex: 'field', key: 'field', width:150, render:(t,rec)=><span style={{fontWeight: rec.key===activeKey?800:600, color:'#0F172A', fontSize:13}}>{t}</span> },
    { title: 'Value', dataIndex: 'value', key: 'value', render:(val,rec)=>(
        <Input value={val} onChange={(e)=>setData(data.map(i=> i.key===rec.key? {...i, value:e.target.value}:i))} onPressEnter={(e)=>updateValue(rec.key, e.target.value)} style={{borderRadius:8, fontFamily:'JetBrains Mono,monospace', background: rec.key===activeKey? '#EFF6FF':'#FFFFFF', color: '#0F172A', borderColor: rec.key===activeKey? '#0F172A': '#E2E8F0'}} />
      )},
    { title: 'Conf', dataIndex: 'confidence', key: 'confidence', width:85, align:'center', render:(val)=>{ const isLow=val<80; return <Tag style={{margin:0, borderRadius:999, background: isLow?'#FEF2F2':'#ECFDF5', color: isLow?'#DC2626':'#047857', border:`1px solid ${isLow?'#FECACA':'#A7F3D0'}`, fontWeight:800, fontFamily:'JetBrains Mono,monospace'}}>{val} percent</Tag> }},
    { title: '', key:'action', width:90, align:'center', render:(_,rec)=><Button type={rec.verified?'default':'primary'} size="small" onClick={()=>markVerified(rec.key)} disabled={rec.verified} style={{borderRadius:8, fontWeight:700, fontSize:11, background: rec.verified?'transparent':'#d9f203', color: rec.verified?'#64748B':'#111111', border: rec.verified?'1px solid #E2E8F0':'none'}}>{rec.verified?'Done':'Approve'}</Button> },
  ];

  return (
    <div className="animate-fade-in-up verified-section" style={{display:'flex', flexDirection:'column', gap:16}}>
      <Card bordered={false} className="saffron-card" style={{borderRadius:16, background: '#ffffff', border: '1px solid #E2E8F0'}} bodyStyle={{padding:'14px 16px'}}>
        <div style={{display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap', alignItems:'center'}}>
          <Space size={12}>
            <Button onClick={()=>navigate('/verification')} style={{borderRadius:10, background: '#F1F5F9', color: '#0F172A', border: '1px solid #E2E8F0'}}>Queue</Button>
            <div style={{lineHeight:1.2}}><div style={{fontWeight:850, color:'#0F172A'}}>Khatauni 123/4A Agra</div><div style={{fontSize:12, color:'#64748B'}}>khasra_map_045.jpg 2.4 MB 300 DPI</div></div>
          </Space>
          <Space>
            <Tag style={{margin:0, borderRadius:999, background:'#F1F5F9', color:'#0F172A', border:'1px solid #E2E8F0', fontWeight:800, padding:'4px 12px'}}>SHA256 verified</Tag>
            <Button style={{borderRadius:10, fontWeight:700, background: '#FFFFFF', color: '#0F172A', border: '1px solid #E2E8F0'}}>Export</Button>
            <Button type="primary" onClick={()=>message.success('Committed to GIS')} style={{borderRadius:10, fontWeight:800, background: '#d9f203', color: '#111111', border: 'none'}}>Commit Record</Button>
          </Space>
        </div>
      </Card>

      <Row gutter={[12,12]}>
        {[
          { title: 'Overall Confidence', value: `${overall} percent`, delta: overall >= 85 ? 'High Trust' : 'Review Needed' },
          { title: 'Fields Verified', value: `${verifiedCount} of ${data.length}`, delta: `${data.length-verifiedCount} pending` },
          { title: 'Document Size', value: '2.4 MB', delta: '300 DPI deskewed' },
          { title: 'Security and Audit', value: 'SHA256', delta: '7yr retention' },
        ].map(k=>(
          <Col xs={12} lg={6} key={k.title}>
            <Card bordered={false} className="saffron-card" bodyStyle={{padding:16}} style={{ background: '#ffffff', border: '1px solid #E2E8F0' }}>
              <div style={{fontSize:11, fontWeight:800, letterSpacing:'0.06em', color:'#64748B'}}>{k.title.toUpperCase()}</div>
              <div style={{fontSize:26, fontWeight:900, color:'#0F172A', marginTop:4, fontFamily:'Host Grotesk, sans-serif'}}>{k.value}</div>
              <div style={{marginTop:8, fontSize:12, fontWeight:700, color:'#64748B'}}>{k.delta}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[12,12]} style={{display: 'flex', alignItems: 'stretch'}}>
        {/* Left Column (Viewer) */}
        <Col xs={24} lg={12}>
          <Card bordered={false} className="saffron-card" style={{borderRadius:16, background:'#ffffff', border: '1px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column'}} bodyStyle={{padding:16, display: 'flex', flexDirection: 'column', flex: 1}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span style={{fontWeight:800, color:'#0F172A', fontSize: 15}}>Scanned Paper Preview</span>
              <Space size={6}><Button size="small" onClick={()=>setZoom(z=>Math.max(80,z-10))} style={{background: '#F1F5F9', color: '#0F172A', border: '1px solid #E2E8F0'}} >Zoom Out</Button><span style={{fontSize:12, fontWeight:800, minWidth:36, textAlign:'center', color:'#0F172A'}}>{zoom} percent</span><Button size="small" onClick={()=>setZoom(z=>Math.min(140,z+10))} style={{background: '#F1F5F9', color: '#0F172A', border: '1px solid #E2E8F0'}} >Zoom In</Button></Space>
            </div>
            <div style={{marginTop:16, background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:12, padding:16, transform:`scale(${zoom/100})`, transformOrigin:'top center', transition:'transform 0.18s', flex: 1, overflow: 'auto'}}>
              <div style={{textAlign:'center', marginBottom:12}}>
                <div style={{fontWeight:900, color:'#0F172A'}}>उत्तर प्रदेश शासन खतौनी</div>
                <div style={{fontSize:11, color:'#64748B'}}>परगना सदर तहसील सदर आगरा Fasli 1431</div>
              </div>
              <div style={{border:'1px solid #E2E8F0', borderRadius:8, overflow:'hidden'}}>
                <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
                  <thead><tr style={{background:'#0F172A', color:'#ffffff'}}><th style={{padding:'10px 12px', textAlign:'left'}}>Field</th><th style={{padding:'10px 12px', textAlign:'left'}}>Value</th><th style={{padding:'10px 12px', textAlign:'center'}}>Conf</th></tr></thead>
                  <tbody>
                    {data.map(row=>{
                      const isActive = row.key===activeKey;
                      return (
                        <tr key={row.key} onClick={()=>setActiveKey(row.key)} style={{cursor:'pointer', background: isActive? '#EFF6FF':'#FFFFFF', borderTop:'1px solid #E2E8F0'}}>
                          <td style={{padding:'10px 12px', fontWeight: isActive?800:600, color:'#0F172A'}}>{row.field}</td>
                          <td style={{padding:'10px 12px'}}><span style={{fontFamily:'JetBrains Mono,monospace', background:isActive?'#EFF6FF':'#F8FAFC', border:`1px solid ${isActive?'#0F172A':'#E2E8F0'}`, padding:'4px 8px', borderRadius:8, fontWeight:700, color: '#0F172A'}}>{row.value}</span></td>
                          <td style={{padding:'10px 12px', textAlign:'center'}}><Tag style={{margin:0, borderRadius:999, background: '#F1F5F9', color: row.confidence<80?'#64748B':'#0F766E', border:`1px solid ${row.confidence<80?'#E2E8F0':'#A7F3D0'}`, fontWeight:800}}>{row.confidence} percent</Tag></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Col>

        {/* Right Column (Inspector) */}
        <Col xs={24} lg={12}>
          <Card bordered={false} className="saffron-card" style={{borderRadius:16, background: '#ffffff', border: '1px solid #E2E8F0', height: '100%'}} bodyStyle={{padding:16}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span style={{fontWeight:850, color:'#0F172A', fontSize: 16}}>Field Inspector</span>
              <Tag style={{margin:0, borderRadius:999, background: active.verified ? '#ECFDF5' : '#F1F5F9', color: active.verified?'#047857':'#475569', border:`1px solid ${active.verified?'#A7F3D0':'#E2E8F0'}`, fontWeight:800}}>{active.verified?'Verified':'Needs review'}</Tag>
            </div>
            <div style={{marginTop: 6, fontSize:12, color:'#64748B'}}>Currently Editing: <span style={{fontWeight: 700, color: '#0F172A'}}>{active.field}</span></div>
            
            <Table dataSource={data} columns={columns} pagination={false} size="small" style={{marginTop:16, background: '#ffffff'}} rowClassName={r=> r.key===activeKey?'active-row-highlight':''} onRow={r=>({onClick:()=>setActiveKey(r.key)})} scroll={{y: 300}} />
            
            <div style={{marginTop:16, display:'flex', gap:12}}>
              <Button type="primary" onClick={()=>message.success('Record committed')} style={{flex:1, borderRadius:10, fontWeight:800, background: '#0F172A', color: '#ffffff', border: 'none'}} size="large">Approve and Sync</Button>
              <Button style={{borderRadius:10, fontWeight:700, background: '#FFFFFF', color: '#0F172A', border: '1px solid #E2E8F0'}} size="large">Rescan Selection</Button>
            </div>
            <div style={{marginTop:10, textAlign:'center', fontSize:11, color:'#64748B'}}>Press Enter to save All edits audit logged</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default DocumentDetails;
