import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import { useAuthStatus } from './components/LoginForm/hooks/useAuthStatus.ts';
import { Layout, Typography } from 'antd';
import './App.css'; 

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const ProfilePage= () => {

  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <Title level={1}>Welcome Back! 🎉</Title>
      <p>This is your secure profile page.</p>
      <p>Authentication was successful.</p>
    </div>
  );
};

const App = () => {
  const { isAuthenticated } = useAuthStatus();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 50px' }}>
        <Title level={3} style={{ color: 'white', margin: 0, lineHeight: '64px' }}>
         Login Page
        </Title>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/profile" replace /> : <LoginForm />
            } />
            <Route path="/profile" element={
              isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />
            } />

            <Route path="/" element={<Navigate to="/login" replace />} />
            
            <Route path="*" element={<Title level={4} style={{ textAlign: 'center', marginTop: 100 }}>404 - Page Not Found</Title>} />
          </Routes>
        </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>
        Ant Design Login Form ©2025 Created for Development Task
      </Footer> */}
    </Layout>
  );
};

export default App;
