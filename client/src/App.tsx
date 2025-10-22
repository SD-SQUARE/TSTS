import { useEffect } from 'react'
import './App.css'
import {  ConfigProvider, message } from 'antd'
import { useTranslation } from 'react-i18next'
import en from 'antd/locale/en_US';
import ar from 'antd/locale/ar_EG';
import ForgotPasswordForm from './Components/ForgotPasswordForm/ForgotPasswordForm';


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
      <div style={{ padding: 20, textAlign: 'center' }}>
        {/* for testing localization */}
        {/* <Button onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}>
          {isArabic ? 'en' : 'ع'}
        </Button> */}

        <ForgotPasswordForm />
      </div>
    </ConfigProvider>
  )
}

export default App
