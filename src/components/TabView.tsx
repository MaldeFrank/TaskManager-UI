import { Tabs, TabsProps } from "antd";
import StickyBox from "react-sticky-box";
import AssignedTasks from "./tabs/Tasks";
import AddTaskForm from "./tabs/AddTaskForm";
import { useState } from "react";
import { AssignedTask, Task } from "../model/Task";

function TabView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);

  
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
      label: '1. Ugens opgaver',
      children: <AssignedTasks />,
    },
    {
      key: '2',
      label: '2. Opgave liste',
      children: "Hello"
    },
    {
      key: '3',
      label: '3. Opret opgave',
      children: <AddTaskForm/>,
    },
  ];

  return (
    <Tabs size="large" renderTabBar={renderTabBar} type="card" defaultActiveKey="1" items={items}></Tabs>
  );
}

export default TabView;