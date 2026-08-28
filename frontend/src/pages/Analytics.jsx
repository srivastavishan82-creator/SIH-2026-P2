import { Card, Row, Col, Tag, Space, Divider } from 'antd';

function Analytics() {
  const districtData = [
    { name: 'Agra', processed: 120, pending: 20, total:140 },
    { name: 'Lucknow', processed: 98, pending: 15, total:113 },
    { name: 'Varanasi', processed: 76, pending: 10, total:86 },
    { name: 'Kanpur', processed: 65, pending: 25, total:90 },
    { name: 'Prayagraj', processed: 54, pending: 8, total:62 },
  ];
  const accuracyData = [
    { name: 'High Greater than 90 percent', value: 65, fill:'#d9f203' },
    { name: 'Medium 70 to 90 percent', value: 25, fill:'#ffffff' },
    { name: 'Low Less than 70 percent', value: 10, fill:'#6b6b6b' },
  ];
  const trendData = [
    { date: 'Mon', volume: 45 },
    { date: 'Tue', volume: 52 },
    { date: 'Wed', volume: 38 },
    { date: 'Thu', volume: 65 },
    { date: 'Fri', volume: 88 },
    { date: 'Sat', volume: 110 },
    { date: 'Sun', volume: 85 },
  ];

  const totalProcessed = districtData.reduce((a,c)=>a+c.processed,0);
  const totalPending = districtData.reduce((a,c)=>a+c.pending,0);

  const kpis = [
    { title: 'Total Pages', value: 413, delta: '12.4 percent', color:'#0F172A', deltaBg:'#F1F5F9' },
    { title: 'Verified', value: 367, delta: '8.1 percent', color:'#854D0E', deltaBg:'#FEF9C3' },
    { title: 'Pending Review', value: 46, delta: '4 urgent', color:'#0F172A', deltaBg:'#F1F5F9' },
    { title: 'Accuracy F1', value: '94.8 percent', delta: '2.1 percent', color:'#0F172A', deltaBg:'#F1F5F9' },
  ];

  return (
    <div className="animate-fade-in-up analytics-section" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Card bordered={false} className="saffron-card" style={{borderRadius:16, background: '#ffffff', border: '1px solid #E2E8F0'}} bodyStyle={{padding:'18px 20px'}}>
        <div style={{display:'flex', justifyContent:'space-between', gap:16, flexWrap:'wrap', alignItems:'center'}}>
          <div style={{flex:'1 1 320px', minWidth:280}}>
            <div style={{display:'flex', alignItems:'center', gap:10, flexWrap:'wrap'}}>
              <Tag style={{margin:0, background:'#d9f203', color:'#111111', border:'none', borderRadius:999, fontWeight:800, fontSize:11, padding:'4px 10px', lineHeight:1}}>ANALYTICS LIVE</Tag>
              <span style={{fontFamily:'JetBrains Mono,monospace', fontSize:11, letterSpacing:'0.08em', color:'#64748B', fontWeight:700, lineHeight:1}}>Q3 2026 5 DISTRICTS</span>
            </div>
            <div style={{fontFamily:'Host Grotesk, sans-serif', fontSize:24, fontWeight:900, letterSpacing:'-0.03em', color:'#0F172A', marginTop:10, lineHeight:1.1}}>District Intelligence and Throughput</div>
            <div style={{color:'#475569', fontSize:13, marginTop:6, lineHeight:1.5}}>Bar donut and ledger one operational atlas for collectors.</div>
          </div>
          <div style={{display:'flex', gap:8, flexWrap:'wrap', alignItems:'center', flexShrink:0}}>
            <Tag style={{margin:0, borderRadius:999, background:'#F1F5F9', color:'#0F172A', border:'1px solid #E2E8F0', fontWeight:800, padding:'5px 12px', fontSize:11, lineHeight:1}}>Peak Sat 110</Tag>
            <Tag style={{margin:0, borderRadius:999, background:'#ECFDF5', color:'#047857', border:'1px solid #A7F3D0', fontWeight:800, padding:'5px 12px', fontSize:11, lineHeight:1}}>F1 94.8 percent</Tag>
          </div>
        </div>
      </Card>

      <Row gutter={[12,12]} style={{alignItems:'stretch'}}>
        {kpis.map(k=>(
          <Col xs={12} lg={6} key={k.title} style={{display:'flex'}}>
            <Card bordered={false} className="saffron-card" bodyStyle={{padding:'16px 18px', display:'flex', flexDirection:'column', justifyContent:'center', gap:6}} style={{ background: '#ffffff', border: '1px solid #E2E8F0', flex:1, display:'flex', flexDirection:'column' }}>
              <div style={{fontSize:11, fontWeight:800, letterSpacing:'0.06em', color:'#64748B', lineHeight:1}}> {k.title.toUpperCase()} </div>
              <div style={{fontSize:28, fontWeight:900, color:'#0F172A', lineHeight:1, fontFamily:'Host Grotesk, sans-serif'}}>{k.value}</div>
              <div style={{marginTop:4, display:'inline-flex', alignItems:'center', gap:6, background:k.deltaBg, border:'1px solid #E2E8F0', borderRadius:999, padding:'4px 10px', alignSelf:'flex-start'}}>
                <span style={{fontSize:12, fontWeight:800, color:k.color, lineHeight:1}}>{k.delta}</span>
                <span style={{fontSize:11, color:'#64748B', fontWeight:600, lineHeight:1}}>this week</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[12,12]} style={{display: 'flex', alignItems: 'stretch'}}>
        <Col xs={24} lg={12} style={{display:'flex'}}>
          <Card title={<span style={{fontWeight:850, color:'#0F172A', fontSize:15}}>Throughput and Accuracy</span>} extra={<Tag style={{margin:0, borderRadius:999, background:'#F1F5F9', border:'1px solid #E2E8F0', color:'#0F172A', fontWeight:700, fontSize:11, padding:'4px 10px'}}>docs per day</Tag>} bordered={false} className="saffron-card" bodyStyle={{padding:'16px', display: 'flex', flexDirection: 'column', gap: 14}} style={{ background: '#ffffff', border: '1px solid #E2E8F0', flex:1, display:'flex', flexDirection:'column' }}>
            
            <div style={{display:'flex', flexDirection:'column', gap: 10}}>
              <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap: 8, textAlign:'center', background:'#F8FAFC', padding:'14px 10px', borderRadius:10, border:'1px solid #E2E8F0', alignItems:'end'}}>
                {trendData.map(t => (
                  <div key={t.date} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:6, justifyContent:'flex-end'}}>
                    <div style={{fontSize:11, color:'#64748B', fontWeight:700, letterSpacing:'0.04em', lineHeight:1}}>{t.date}</div>
                    <div style={{fontSize:17, fontWeight:900, color: t.volume >= 80 ? '#854D0E' : '#0F172A', fontFamily:'JetBrains Mono, monospace', lineHeight:1, background: t.volume >= 80 ? '#FEF9C3' : '#FFFFFF', border:'1px solid #E2E8F0', borderRadius:6, padding:'4px 0', width:'100%'}}>{t.volume}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap', fontSize:12, color:'#475569', background:'#FFFFFF', padding:'10px 14px', borderRadius:8, border:'1px solid #E2E8F0'}}>
                <span style={{fontWeight: 700, color:'#0F172A'}}>Mon to Sun continuous intake recorded</span>
                <span style={{color:'#FFFFFF', fontWeight:800, background:'#0F172A', borderRadius:999, padding:'3px 8px', fontSize:11}}>Peak Surge Sat 110</span>
              </div>
            </div>

            <Divider style={{ borderColor: '#F1F5F9', margin: '2px 0' }} />

            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {accuracyData.map(a=>(
                <div key={a.name} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, background:'#FFFFFF', border:'1px solid #E2E8F0', borderLeft:`4px solid ${a.fill === '#d9f203' ? '#d9f203' : a.fill === '#ffffff' ? '#0F172A' : '#64748B'}`, borderRadius:10, padding:'14px 16px'}}>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:11, fontWeight:800, letterSpacing:'0.05em', color:'#64748B', lineHeight:1}}>{a.name.toUpperCase()}</div>
                    <div style={{fontSize:13, fontWeight:800, color:'#0F172A', marginTop:6, lineHeight:1.2}}>{a.value} percent <span style={{fontWeight:600, color:'#475569', fontSize:11}}>coverage</span></div>
                  </div>
                  <div style={{textAlign:'right', flexShrink:0}}>
                    <div style={{fontSize:18, fontWeight:900, color: a.fill === '#d9f203' ? '#854D0E' : a.fill === '#ffffff' ? '#0F172A' : '#475569', fontFamily:'JetBrains Mono, monospace', lineHeight:1}}>{a.value} percent</div>
                    <div style={{fontSize:11, color:'#94A3B8', marginTop:2, lineHeight:1}}>{a.value===65 ? '268 auto verified' : a.value===25 ? '103 routed to audit' : '42 retry'}</div>
                  </div>
                </div>
              ))}
            </div>

          </Card>
        </Col>

        <Col xs={24} lg={12} style={{display:'flex'}}>
          <Card title={<div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap'}}><span style={{fontWeight:850, color:'#0F172A', fontSize:15}}>District Ledger</span><span style={{fontSize:11, fontWeight:700, color:'#FFFFFF', background:'#0F172A', borderRadius:999, padding:'4px 8px', lineHeight:1}}>{totalProcessed} verified {totalPending} pending</span></div>} bordered={false} className="saffron-card" bodyStyle={{padding:'16px', display:'flex', flexDirection:'column', gap:12}} style={{ background: '#ffffff', border: '1px solid #E2E8F0', flex:1, display:'flex', flexDirection:'column' }}>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {districtData.map(d=>{
                const pct = Math.round(d.processed/d.total*100);
                const isHigh = pct >= 85;
                return (
                  <div key={d.name} style={{display:'grid', gridTemplateColumns:'1fr auto', gap:12, alignItems:'center', background: isHigh ? '#FFFBEB' : '#F8FAFC', border:`1px solid ${isHigh ? '#FDE68A' : '#E2E8F0'}`, borderRadius:10, padding:'12px 14px'}}>
                    <div style={{minWidth:0}}>
                      <div style={{display:'flex', alignItems:'center', gap:8, flexWrap:'wrap'}}>
                        <span style={{fontWeight:800, color:'#0F172A', fontSize: 13, lineHeight:1}}>{d.name}</span>
                        <Tag style={{margin:0, borderRadius:6, fontSize:10, background:'#FFFFFF', border:'1px solid #E2E8F0', color: isHigh ? '#854D0E' : '#475569', fontWeight: 800, lineHeight:1, padding:'3px 6px'}}>VOL {d.total}</Tag>
                        <span style={{fontSize:11, fontWeight:800, color: isHigh ? '#854D0E' : '#0F172A', background: isHigh ? '#FEF9C3' : '#FFFFFF', border:'1px solid #E2E8F0', borderRadius:999, padding:'2px 6px', lineHeight:1}}>{pct} percent</span>
                      </div>
                      <div style={{fontSize:11, color:'#94A3B8', marginTop:6, lineHeight:1}}>VERIFIED</div>
                    </div>
                    <div style={{textAlign:'right', flexShrink:0}}>
                      <div style={{fontSize:14, fontWeight:800, color:'#0F172A', lineHeight:1}}>{d.processed} <span style={{fontWeight:600, color:'#64748B', fontSize: 11}}>of {d.total}</span></div>
                      <div style={{fontSize:11, color: pct >= 85 ? '#854D0E' : '#475569', fontWeight: 700, marginTop: 4, lineHeight:1, background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:999, padding:'2px 6px', display:'inline-block'}}>{d.pending} PENDING</div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{marginTop:'auto', background:'#0F172A', border:'1px solid #0F172A', borderRadius:12, padding:'14px 16px', color:'#FFFFFF', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap'}}>
              <div>
                <div style={{fontWeight:800, fontSize:13, lineHeight:1, color:'#FFFFFF'}}>Uttar Pradesh Pilot Atlas</div>
                <div style={{fontSize:11, color:'#94A3B8', marginTop:6, lineHeight:1}}>5 districts live Tiles cached 12.4k Latency p95 42ms</div>
              </div>
              <Tag style={{margin:0, background:'#d9f203', color:'#111111', border:'none', borderRadius:999, fontWeight:800, fontSize:10, padding:'4px 8px', lineHeight:1}}>MAP PREVIEW</Tag>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Analytics;
