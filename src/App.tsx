import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Form, Input, Layout, Menu, Popconfirm, theme } from 'antd';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import logo from './assets/logo.jpeg';
import CardsMap from './pages/cards-map';


const { Header, Content, Footer } = Layout;

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true')

  useEffect(() => {
    localStorage.setItem('isAuth', isAuth.toString())
  }, [isAuth])

  const {
    token: { colorPrimary },
  } = theme.useToken();

  if (!isAuth) return <LoginComponent setIsAuth={setIsAuth} />

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: colorPrimary }}>
        <div className="logo-primary" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[]}
          style={{ flex: 1, minWidth: 0 }}
        />
        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <span style={{ marginRight: 10, color: '#fff' }}>Hola Admin</span>

          <Popconfirm title="Cerrar sesión" onConfirm={() => setIsAuth(false)}>
            <Avatar style={{ backgroundColor: '#fff', color: '#000', cursor: 'pointer' }} icon={<UserOutlined />} />
          </Popconfirm>
        </div>
      </Header>
      <Content >
        {/* <div> */}
        <CardsMap />
        {/* </div> */}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        CorAll D&R ©{new Date().getFullYear()} Created by MaxterJ.asm
      </Footer>
    </Layout>
  )
}

export default App


const LoginComponent = ({ setIsAuth }: { setIsAuth: Function }) => {

  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsAuth(true)
    }, 1000)
  }

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={logo} alt="avatar" style={{ width: 128, height: 128 }} />
      <h1 style={{ marginTop: 10 }}>Iniciar sesión</h1>
      <span>¿Estás listo para explorar el turismo?</span>
    </div>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        username: 'admin',
        password: '123456',
        remember: true
      }}
      onFinish={handleLogin}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Recordarme</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  </div>
}