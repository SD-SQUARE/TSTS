import { useEffect } from 'react'
import './App.css'
import {  ConfigProvider, message } from 'antd'
import { useTranslation } from 'react-i18next'
import en from 'antd/locale/en_US';
import ar from 'antd/locale/ar_EG';
// import ForgotPasswordForm from './Components/ForgotPasswordForm/ForgotPasswordForm';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './Components/Layout/MainLayout';
import Profile from './Pages/Profile';
import RecycleBin from './Pages/RecycleBin';


function App() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    message.config({
      rtl: isArabic,  
      top: isArabic ? 20 : 20, 
      duration: 2, 
    });
  }, [isArabic]);

  return (
    <ConfigProvider direction={isArabic ? 'rtl' : 'ltr'} locale={isArabic ? ar : en} theme={{
      token: {
        colorPrimary: '#023373', 
        colorLink: '#023373', 
      },
    }}>
      <Routes>
      <Route element={<MainLayout name="Habiba" />}>
        <Route path="/" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recyclebin" element={<RecycleBin />} />
      </Route>
    </Routes>

        {/* <ForgotPasswordForm /> */}
      
    </ConfigProvider>
  )
}

export default App
