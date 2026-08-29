import { useState } from 'react';
import { Upload, Button, message, Card, Typography, Select, Form, Space, Tag, Divider, Row, Col } from 'antd';
import { FileImageOutlined, FilePdfOutlined, CheckCircleOutlined, LoadingOutlined, ThunderboltOutlined, GlobalOutlined, ClockCircleOutlined, CloudUploadOutlined, AimOutlined, ExperimentOutlined, SafetyCertificateOutlined, FileTextOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const { Text } = Typography;

function UploadDocument() {
  const [uploading, setUploading] = useState(false); const [progress, setProgress] = useState(0); const [currentStep, setCurrentStep] = useState(0);
  const simulateProcessing = () => {
    setUploading(true); setProgress(0); setCurrentStep(0);
    setTimeout(() => { setProgress(28); setCurrentStep(1); }, 800);
    setTimeout(() => { setProgress(58); setCurrentStep(2); }, 1900);
    setTimeout(() => { setProgress(86); setCurrentStep(3); }, 3200);
    setTimeout(() => { setProgress(100); setCurrentStep(4); message.success('Document ingested — queued for extraction'); setTimeout(() => setUploading(false), 1400); }, 4600);
  };
  const uploadProps = { name: 'file', multiple: false, accept: '.pdf,.jpg,.jpeg,.png', showUploadList: false, customRequest: () => simulateProcessing(), beforeUpload: (file) => { const isLt10M = file.size / 1024 / 1024 < 10; if (!isLt10M) message.error('File must be smaller than 10MB'); return isLt10M || Upload.LIST_IGNORE; } };
  const steps = [{ title: 'Checksum', desc:'SHA-256' }, { title: 'OCR Layout', desc:'PaddleOCR' }, { title: 'NLP Extract', desc:'11 scripts' }, { title: 'Confidence Gate', desc:'<80% → queue' }];

  return (
    <div className="animate-fade-in-up intake-section" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* NEW: Light paper header with stepper preview */}
      <Card bordered={false} className="saffron-card" style={{borderRadius:16, background: '#ffffff', border: '1px solid #E2E8F0'}} bodyStyle={{padding:'16px 18px'}}>
        <div style={{display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap', alignItems:'center'}}>
          <div>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <Tag style={{margin:0, background:'#d9f203', color:'#111111', border:'none', borderRadius:999, fontWeight:800, fontSize:11}}>● INTAKE LIVE</Tag>
              <span style={{fontFamily:'JetBrains Mono,monospace', fontSize:11, letterSpacing:'0.08em', color:'#64748B', fontWeight:700}}>OCR 2.7 • 300 DPI • 10MB</span>
            </div>
            <div style={{fontFamily:'Host Grotesk, sans-serif', fontSize:24, fontWeight:900, letterSpacing:'-0.03em', color:'#0F172A', marginTop:6}}>Document Intake Workspace</div>
            <div style={{color:'#475569', fontSize:13, marginTop:4}}>Configure classification & language, then drop files — watch live extraction terminal.</div>
          </div>
          <Space><Tag style={{borderRadius:999, background:'#F1F5F9', border:'1px solid #E2E8F0', color:'#0F172A', fontWeight:800, padding:'4px 12px'}}>256-bit encrypted</Tag><Tag style={{borderRadius:999, background:'rgba(217, 242, 3, 0.15)', border:'none', color:'#6b7a00', fontWeight:800}}>~6s / doc</Tag></Space>
        </div>
        {/* mini stepper */}
        <div style={{display:'flex', gap:16, marginTop:14}}>
          {steps.map((s,i)=>(
            <div key={s.title} style={{display:'flex', alignItems:'center', gap:8, opacity: currentStep>=i ? 1 : 0.4}}>
              <div style={{fontSize:12, fontWeight:800, color:'#0F172A', fontFamily:'JetBrains Mono, monospace'}}>
                [{currentStep>i ? 'OK' : currentStep===i ? 'RUN' : 'WAIT'}] {s.title}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 4 KPIs */}
      <Row gutter={[12,12]}>
        {[
          { title: 'Todays Quota', value: '413 / 500', delta: '82 percent full', color:'#0F172A' },
          { title: 'Latency P95', value: '4.2s', delta: '0.3s fast', color:'#854D0E' },
          { title: 'Accuracy F1', value: '94.8 percent', delta: '2.1 percent', color:'#0F172A' },
          { title: 'Error Rate', value: '0.4 percent', delta: 'nominal', color:'#0F172A' },
        ].map(k=>(
          <Col xs={12} lg={6} key={k.title}>
            <Card bordered={false} className="saffron-card" bodyStyle={{padding:16}} style={{ background: '#ffffff', border: '1px solid #E2E8F0' }}>
              <div style={{fontSize:11, fontWeight:800, letterSpacing:'0.06em', color:'#64748B'}}>{k.title.toUpperCase()}</div>
              <div style={{fontSize:26, fontWeight:900, color:'#0F172A', marginTop:4, fontFamily:'Host Grotesk, sans-serif'}}>{k.value}</div>
              <div style={{marginTop:8, fontSize:12, fontWeight:700, color:k.color}}>{k.delta} <span style={{color:'#64748B', fontWeight:600}}>average</span></div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[12,12]} style={{display: 'flex', alignItems: 'stretch'}}>
        {/* LEFT: Intake */}
        <Col xs={24} lg={12}>
          <Card bordered={false} className="saffron-card" bodyStyle={{ padding: 16 }} style={{borderRadius:16, background: '#ffffff', border: '1px solid #E2E8F0', height: '100%'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12, flexWrap:'wrap', gap:8}}>
              <div style={{fontWeight:850, color:'#0F172A', fontSize:15}}>1 — Configure & Drop</div>
              <Tag style={{margin:0, background:'#F1F5F9', border:'1px solid #E2E8F0', color:'#0F172A', borderRadius:999, fontWeight:700}}><GlobalOutlined/> 11 scripts</Tag>
            </div>
            <Form layout="vertical" style={{marginBottom:8}}>
              <div className="intake-form-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                <Form.Item label={<Text strong style={{color:'#475569', fontSize:11, letterSpacing:'0.06em'}}>DOCUMENT TYPE</Text>} style={{marginBottom:10}}>
                  <Select defaultValue="register" size="large">
                    <Select.Option value="register">Khatauni Register</Select.Option>
                    <Select.Option value="map">Bhu-Naksha Map</Select.Option>
                    <Select.Option value="registry">Sale Deed PDF</Select.Option>
                    <Select.Option value="mutation">Mutation Record</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<Text strong style={{color:'#475569', fontSize:11, letterSpacing:'0.06em'}}>SCRIPT</Text>} style={{marginBottom:10}}>
                  <Select defaultValue="hi" size="large">
                    <Select.Option value="hi">Hindi — Devanagari</Select.Option>
                    <Select.Option value="en">English — Latin</Select.Option>
                    <Select.Option value="mr">Marathi</Select.Option>
                    <Select.Option value="ta">Tamil</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </Form>

            <Dragger {...uploadProps} disabled={uploading} style={{padding:18, background:'#F8FAFC', border:'1.5px dashed #CBD5E1', borderRadius:14}}>
              <p style={{marginBottom:8}}><span style={{width:56, height:56, borderRadius:999, background:'#d9f203', display:'inline-flex', alignItems:'center', justifyContent:'center', color:'#111111', fontSize:26, boxShadow:'0 8px 20px rgba(217, 242, 3, 0.22)'}}><CloudUploadOutlined /></span></p>
              <p style={{fontSize:15, fontWeight:850, color:'#0F172A', margin:0}}>Drop file here or <span style={{color:'#6b7a00', textDecoration:'underline'}}>browse</span></p>
              <p style={{color:'#475569', fontSize:12.5, marginTop:4}}>PDF / JPG / PNG • 10MB max • 300 DPI for handwriting</p>
              <Space style={{marginTop:10}} wrap>
                <Tag style={{borderRadius:999, background:'#FEF2F2', color:'#DC2626', border:'1px solid #FECACA', fontWeight:700}}><FilePdfOutlined/> PDF</Tag>
                <Tag style={{borderRadius:999, background:'#EEF2FF', border:'1px solid #C7D2FE', color:'#4F46E5', fontWeight:700}}><FileImageOutlined/> Image</Tag>
                <Tag style={{borderRadius:999, background:'#F1F5F9', border:'1px solid #E2E8F0', color:'#475569', fontWeight:700}}><ClockCircleOutlined/> Batch 50</Tag>
              </Space>
            </Dragger>

            <div className="quick-demo-grid" style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8}}>
              {[
                {n:'khatauni_agra.pdf', t:'Khatauni • 2.4 MB', c:'#d9f203'},
                {n:'bhu_naksha_045.jpg', t:'Map • 4.1 MB', c:'#4F46E5'},
                {n:'sale_deed_2025.pdf', t:'Deed • 1.8 MB', c:'#94A3B8'},
              ].map(s=>(
                <div key={s.n} className="mobile-black-card" onClick={simulateProcessing} style={{background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:10, padding:'8px 10px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div><div style={{fontSize:12, fontWeight:800, color:'#0F172A'}}>{s.n}</div><div style={{fontSize:11, color:'#64748B'}}>{s.t}</div></div>
                  <span style={{width:8, height:8, borderRadius:999, background:s.c}} />
                </div>
              ))}
            </div>
            <div style={{marginTop:10, background:'#FFFBEB', border:'1px solid #FDE68A', borderRadius:10, padding:'8px 12px', fontSize:12, color:'#92400E', display:'flex', gap:8}}><AimOutlined/> Tip: Flat, deskewed scans improve accuracy by ~14%.</div>
          </Card>
        </Col>

        {/* RIGHT: Live terminal */}
        <Col xs={24} lg={12}>
          <Card bordered={false} className="saffron-card" bodyStyle={{padding:16, display:'flex', flexDirection:'column'}} style={{borderRadius:16, background: '#ffffff', border: '1px solid #E2E8F0', height: '100%'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flex:'0 0 auto'}}>
              <div style={{fontWeight:850, color:'#0F172A', display:'flex', alignItems:'center', gap:8}}><span style={{width:8, height:8, borderRadius:999, background: uploading?'#d9f203':'#94A3B8', boxShadow: uploading?'0 0 8px rgba(217,242,3,0.5)': 'none'}}/>2 Live Extraction Terminal</div>
              <Tag style={{margin:0, background: uploading?'#d9f203':'#F1F5F9', color: uploading?'#111111':'#64748B', border: uploading?'none':'1px solid #E2E8F0', borderRadius:999, fontWeight:800, fontSize:11}}>{uploading? 'RUNNING' : 'IDLE READY'}</Tag>
            </div>
            {!uploading ? (
              <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:12, flex:1, minHeight:0}}>
                <div style={{background:'#0B0B0B', color:'#c2c2c2', borderRadius:12, padding:14, fontFamily:'JetBrains Mono,monospace', fontSize:11, lineHeight:1.7, border:'1px solid #1E293B'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8, paddingBottom:8, borderBottom:'1px solid #1E293B'}}>
                    <span style={{color:'#d9f203', fontWeight:800}}>bhoomi-ocr watch intake</span>
                    <span style={{fontSize:10, color:'#64748B', background:'#1E293B', padding:'2px 6px', borderRadius:4}}>PID 2847</span>
                  </div>
                  <div>PaddleOCR 2.7 <span style={{color:'#475569'}}>weights loaded</span> <span style={{color:'#64748B', float:'right'}}>342ms</span></div>
                  <div>IndicBERT <span style={{color:'#475569'}}>11 scripts</span> <span style={{color:'#64748B', float:'right'}}>prep 18ms</span></div>
                  <div>layout parser <span style={{color:'#475569'}}>18 boxes</span> <span style={{color:'#64748B', float:'right'}}>ready</span></div>
                  <div style={{marginTop:8, paddingTop:8, borderTop:'1px dashed #1E293B', color:'#94A3B8'}}>awaiting file <span style={{color:'#475569'}}>drop PDF JPG to start stream</span></div>
                  <div style={{color:'#6b6b6b', fontSize:10, marginTop:4}}>queue 0 pending confidence gate less than 80 percent to verification</div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
                  <div className="mobile-black-card" style={{background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:10, padding:'10px 12px', textAlign:'center'}}>
                    <div style={{fontSize:11, fontWeight:700, color:'#64748B', letterSpacing:'0.05em'}}>TODAY</div>
                    <div style={{fontSize:16, fontWeight:900, color:'#0F172A', marginTop:2}}>413</div>
                    <div style={{fontSize:10, color:'#94A3B8'}}>files ingested</div>
                  </div>
                  <div className="mobile-black-card" style={{background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:10, padding:'10px 12px', textAlign:'center'}}>
                    <div style={{fontSize:11, fontWeight:700, color:'#64748B', letterSpacing:'0.05em'}}>AVG</div>
                    <div style={{fontSize:16, fontWeight:900, color:'#854D0E'}}>4.2s</div>
                    <div style={{fontSize:10, color:'#94A3B8'}}>per document</div>
                  </div>
                  <div className="mobile-black-card" style={{background:'#FEF9C3', border:'1px solid #FDE68A', borderRadius:10, padding:'10px 12px', textAlign:'center'}}>
                    <div style={{fontSize:11, fontWeight:700, color:'#92400E', letterSpacing:'0.05em'}}>SUCCESS</div>
                    <div style={{fontSize:16, fontWeight:900, color:'#854D0E', marginTop:2}}>98.2%</div>
                    <div style={{fontSize:10, color:'#92400E'}}>auto pass</div>
                  </div>
                </div>
                <div className="mobile-black-card" style={{background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:10, padding:12}}>
                  <div style={{fontSize:11, fontWeight:800, color:'#0F172A', letterSpacing:'0.06em', marginBottom:8, display:'flex', alignItems:'center', gap:6}}><ExperimentOutlined style={{color:'#854D0E', fontSize:11}}/> PIPELINE PREVIEW</div>
                  <div style={{display:'flex', gap:6, alignItems:'center'}}>
                    {steps.map((s,i)=>(
                      <div key={s.title} className="mobile-black-card" style={{flex:1, background: i===0 ? '#0B0B0B' : '#F8FAFC', border:`1px solid ${i===0 ? '#1E293B' : '#E2E8F0'}`, borderRadius:8, padding:'8px 6px', textAlign:'center'}}>
                        <div style={{fontSize:10, fontWeight:800, color: i===0 ? '#d9f203' : '#0F172A'}}>{s.title}</div>
                        <div style={{fontSize:10, color: i===0 ? '#94A3B8' : '#64748B', marginTop:2}}>{s.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:11, color:'#475569', marginTop:8, display:'flex', alignItems:'center', gap:6}}><ClockCircleOutlined style={{color:'#94A3B8'}}/> 6s total 256 bit encrypted SHA256 verified</div>
                </div>
              </div>
            ) : (
              <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:10, flex:1, minHeight:0}}>
                <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, color: progress===100 ? '#059669' : '#854D0E', fontWeight:800, display:'flex', alignItems:'center', gap:8, background: progress===100 ? '#ECFDF5' : '#FFFBEB', border:`1px solid ${progress===100 ? '#A7F3D0' : '#FDE68A'}`, borderRadius:8, padding:'6px 10px'}}>
                  <span style={{width:8, height:8, borderRadius:999, background: progress===100 ? '#10B981' : '#d9f203', display:'inline-block', flexShrink:0}}/>
                  {progress===100 ? 'COMPLETE 100 percent' : `PROCESSING ${progress} percent`} <span style={{marginLeft:'auto', fontWeight:700, fontSize:10}}>{steps[currentStep]?.title || 'Finalizing'}</span>
                </div>
                <div style={{background:'#0B0B0B', color:'#c2c2c2', borderRadius:12, padding:12, fontFamily:'JetBrains Mono,monospace', fontSize:11, lineHeight:1.7, border:'1px solid #1E293B', flex:'0 0 auto'}}>
                  <div style={{color:'#d9f203', fontWeight:800, marginBottom:6, display:'flex', justifyContent:'space-between'}}><span>{progress} percent {steps[currentStep]?.title || 'Finalizing'}</span><span style={{color:'#64748B', fontSize:10}}>{new Date().toLocaleTimeString()}</span></div>
                  <div style={{opacity: currentStep>=0 ? 1 : 0.4}}>checksum SHA256 <span style={{color:'#475569'}}>2.4 MB verified</span> <span style={{color:'#64748B', float:'right'}}>12ms</span></div>
                  <div style={{opacity: currentStep>=1 ? 1 : 0.4}}>layout boxes 18 detected deskew 1.2 degree <span style={{color:'#64748B', float:'right'}}>{currentStep>=1 ? '342ms' : 'pending'}</span></div>
                  <div style={{opacity: currentStep>=2 ? 1 : 0.4}}>OCR tokens 342 script Devanagari hi <span style={{color:'#64748B', float:'right'}}>{currentStep>=2 ? '1.8s' : 'pending'}</span></div>
                  <div style={{opacity: currentStep>=3 ? 1 : 0.4}}>confidence gate <span style={{color: progress===100 ? '#10B981' : '#d9f203'}}>analyzing 7 fields</span> {progress===100 && <span style={{color:'#FFFFFF'}}>queued</span>}</div>
                </div>
                <div style={{background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:10, padding:12, flex:1, minHeight:0, overflow:'auto'}}>
                  <div style={{fontSize:11, fontWeight:800, color:'#0F172A', letterSpacing:'0.06em', marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span><AimOutlined style={{color:'#854D0E'}}/> EXTRACTED FIELDS</span>
                    <Tag style={{margin:0, fontSize:10, borderRadius:999, background: progress===100 ? '#ECFDF5' : '#F1F5F9', color: progress===100 ? '#047857' : '#64748B', border: progress===100 ? '1px solid #A7F3D0' : '1px solid #E2E8F0'}}>{progress===100 ? '7 fields 94.8 percent avg' : 'extracting'}</Tag>
                  </div>
                  {[
                    {f:'Landowner', v:'राजेश कुमार शर्मा', c:96, ok:true},
                    {f:'Khasra No.', v:'123/4A', c:98, ok:true},
                    {f:'Area', v:'2.45 ha', c:92, ok:true},
                    {f:'Village', v:'रामपुर सदर', c:88, ok: currentStep>=2},
                    {f:'Father Name', v:'राम कुमार शर्मा', c:78, ok: progress===100},
                  ].map(r=>(
                    <div key={r.f} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 8px', borderRadius:8, background: r.ok ? '#F8FAFC' : '#FFFFFF', border:'1px solid #E2E8F0', marginBottom:6, opacity: r.ok ? 1 : 0.45}}>
                      <div><span style={{fontSize:11, fontWeight:700, color:'#64748B'}}>{r.f}</span><span style={{fontSize:12, fontWeight:800, color:'#0F172A', marginLeft:8, fontFamily:'JetBrains Mono,monospace'}}>{r.v}</span></div>
                      <span style={{fontSize:10, fontWeight:800, color: r.c>=90 ? '#047857' : r.c>=80 ? '#854D0E' : '#DC2626', background: r.c>=90 ? '#ECFDF5' : r.c>=80 ? '#FFFBEB' : '#FEF2F2', border:`1px solid ${r.c>=90 ? '#A7F3D0' : r.c>=80 ? '#FDE68A' : '#FECACA'}`, padding:'2px 6px', borderRadius:999}}>{r.c} percent</span>
                    </div>
                  ))}
                  <div style={{fontSize:10, color:'#94A3B8', textAlign:'center', marginTop:6}}>{progress===100 ? 'All fields routed 2 need review less than 80 percent' : 'Streaming live low confidence to verification queue'}</div>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default UploadDocument;
