import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Friendlist from './Friendlist';

interface props{

}

const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Friendlist></Friendlist>,
    },
  ];

function AccountDropdown({}:props){

return(
<Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Account
        <DownOutlined />
      </Space>
    </a>
</Dropdown>
)
}

export default AccountDropdown;