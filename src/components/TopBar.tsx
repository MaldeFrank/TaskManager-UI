import React from 'react';
import { Layout, Menu, theme } from 'antd';
import AccountDropdown from './account/AccountDropdown';

const { Header, Content } = Layout;

interface Props {
  logout: any;
  userName: String|undefined;
}

 function TopBar({ logout, userName }: Props) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: 1,
      label: <button onClick={logout}>Logout</button>,  
    },
    { key: 2,
      label: <AccountDropdown></AccountDropdown>},
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <span className="font-medium" style={{ color: 'white' }}>{userName}</span>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          selectedKeys={[]}
        />
      </Header>
      
    </Layout>
  );
}

export default TopBar;

