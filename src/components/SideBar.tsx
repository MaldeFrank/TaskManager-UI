import { Tabs,TabsProps } from "antd";
import "./styles/SideBar.css"

function TabView() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '1. Opgaver',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: '2. Tilføj',
      children: 'Content of Tab Pane 2',
    },
  ];
  return (
    <Tabs centered type="card" defaultActiveKey="1" items={items}></Tabs>
  );
}

export default TabView;