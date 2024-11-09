import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { ConfigProvider } from 'antd';
import es from 'antd/es/locale/es_ES';

createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={es}
    theme={{ token: { colorPrimary: '#FF5A5F',colorBgBase: '#fff' } }}
  >
    <App />
  </ConfigProvider>
)
