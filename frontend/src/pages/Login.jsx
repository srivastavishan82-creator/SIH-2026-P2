import React, { useState } from 'react';
import { Button, Input, Form, Typography, Divider, Card } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
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
      overflow: 'hidden'
    }}>
      {/* Background Decor */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(217,242,3,0.15) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(217,242,3,0.08) 0%, transparent 60%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ zIndex: 1, width: '100%', maxWidth: 420, padding: 20 }}
        className="login-container"
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#d9f203', color: '#111111', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, marginBottom: 16 }}>
            ◈
          </div>
          <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'Host Grotesk, sans-serif' }}>
            Bhoomi AI Console
          </Title>
          <Text style={{ color: '#9e9e9e', fontSize: 15 }}>
            Secure access to the digitization platform
          </Text>
        </div>

        <Card 
          bordered={false} 
          style={{ 
            background: '#111111', 
            borderRadius: 16, 
            border: '1px solid #333333',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          <Form
            layout="vertical"
            onFinish={handleFinish}
            requiredMark={false}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input 
                size="large"
                prefix={<UserOutlined style={{ color: '#6b6b6b' }} />} 
                placeholder="Work Email (e.g. admin@lrds.gov.in)" 
                style={{ background: '#1a1a1a', borderColor: '#333333', color: '#ffffff', borderRadius: 10, height: 48 }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
              style={{ marginBottom: 12 }}
            >
              <Input.Password 
                size="large"
                prefix={<LockOutlined style={{ color: '#6b6b6b' }} />} 
                placeholder="Password" 
                style={{ background: '#1a1a1a', borderColor: '#333333', color: '#ffffff', borderRadius: 10, height: 48 }}
              />
            </Form.Item>

            <div style={{ textAlign: 'right', marginBottom: 24 }}>
              <a href="#" style={{ color: '#d9f203', fontSize: 13, fontWeight: 600 }}>Forgot password?</a>
            </div>

            <Form.Item style={{ margin: 0 }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large"
                loading={loading}
                style={{ 
                  height: 48, 
                  borderRadius: 10, 
                  background: '#d9f203', 
                  color: '#111111', 
                  fontWeight: 800,
                  fontSize: 15,
                  border: 'none'
                }}
              >
                Log In <ArrowRightOutlined />
              </Button>
            </Form.Item>
          </Form>

          <Divider style={{ borderColor: '#333333', color: '#6b6b6b', fontSize: 12, margin: '24px 0' }}>OR</Divider>

          <Button 
            block 
            size="large" 
            style={{ 
              height: 48, 
              borderRadius: 10, 
              background: 'transparent', 
              borderColor: '#333333', 
              color: '#ffffff',
              fontWeight: 700
            }}
          >
            Get Started (SSO)
          </Button>
        </Card>
        
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Button type="link" onClick={() => navigate('/landing')} style={{ color: '#6b6b6b', fontWeight: 600 }}>
            ← Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
