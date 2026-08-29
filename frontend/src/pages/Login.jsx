import React, { useState } from 'react';
import { Button, Input, Form, Typography, Divider, Card } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFinish = (values) => {
    setLoading(true);
    // Mock authentication delay
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="login-page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px 16px',
      boxSizing: 'border-box'
    }}>
      {/* Background Decor */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(217,242,3,0.12) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(217,242,3,0.08) 0%, transparent 60%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ zIndex: 1, width: '100%', maxWidth: 420, margin: '0 auto', boxSizing: 'border-box' }}
        className="login-container"
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#d9f203', color: '#000000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, marginBottom: 12, border: '1px solid #d9f203', boxShadow: '0 4px 16px rgba(217,242,3,0.25)' }}>
            ◈
          </div>
          <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'Host Grotesk, sans-serif', fontSize: 'clamp(22px, 5vw, 26px)' }}>
            Bhoomi AI Console
          </Title>
          <Text style={{ color: '#ffffff', opacity: 0.75, fontSize: 13.5, display: 'block', marginTop: 4 }}>
            Secure access to land record digitization
          </Text>
        </div>

        <Card 
          bordered={false} 
          style={{ 
            background: '#111111', 
            borderRadius: 16, 
            border: '1px solid #333333',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            width: '100%',
            boxSizing: 'border-box'
          }}
          bodyStyle={{ padding: '24px 20px' }}
        >
          <Form
            layout="vertical"
            onFinish={handleFinish}
            requiredMark={false}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
              style={{ marginBottom: 16 }}
            >
              <Input 
                className="login-input-field"
                prefix={<UserOutlined className="login-input-icon" />} 
                placeholder="Work Email (admin@lrds.gov.in)" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
              style={{ marginBottom: 10 }}
            >
              <Input.Password 
                className="login-input-field"
                prefix={<LockOutlined className="login-input-icon" />} 
                placeholder="Password" 
              />
            </Form.Item>

            <div style={{ textAlign: 'right', marginBottom: 20 }}>
              <a href="#" style={{ color: '#d9f203', fontSize: 12.5, fontWeight: 700 }}>Forgot password?</a>
            </div>

            <Form.Item style={{ margin: 0 }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large"
                loading={loading}
                style={{ 
                  height: 46, 
                  borderRadius: 10, 
                  background: '#d9f203', 
                  color: '#000000', 
                  fontWeight: 800,
                  fontSize: 14.5,
                  border: 'none',
                  boxShadow: '0 6px 20px rgba(217,242,3,0.25)'
                }}
              >
                Log In <ArrowRightOutlined />
              </Button>
            </Form.Item>
          </Form>

          <Divider style={{ borderColor: '#222222', color: '#ffffff', opacity: 0.6, fontSize: 11, margin: '20px 0' }}>OR</Divider>

          <Button 
            block 
            size="large" 
            onClick={onLogin}
            style={{ 
              height: 46, 
              borderRadius: 10, 
              background: 'transparent', 
              borderColor: '#333333', 
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 13.5
            }}
          >
            Get Started (SSO)
          </Button>
        </Card>
        
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button type="link" onClick={() => navigate('/landing')} style={{ color: '#d9f203', fontWeight: 700, fontSize: 13 }}>
            ← Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
