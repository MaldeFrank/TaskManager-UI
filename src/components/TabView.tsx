import { Tabs, TabsProps } from "antd";
import StickyBox from "react-sticky-box";
import Tasks from "./tabs/Tasks";

function TabView() {

  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar
        {...props}
        tabPosition="top"
        tabBarGutter={10}
        style={{ backgroundColor: "white" }}
        onTabScroll={(event) => {
          const scrollAmount = 100;
          window.scrollTo(0, window.scrollY + scrollAmount);
        }}
      />
    </StickyBox>
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '1. Opgaver',
      children: <Tasks />,
    },
    {
      key: '2',
      label: '2. Tilføj',
      children: 'Content of Tab Pane 2',
    },
  ];

  return (
    <Tabs size="large" renderTabBar={renderTabBar} type="card" defaultActiveKey="1" items={items}></Tabs>
  );
}

export default TabView;