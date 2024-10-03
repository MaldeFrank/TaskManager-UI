import { Tabs, TabsProps } from "antd";
import StickyBox from "react-sticky-box";
import AssignedTasks from "./tabs/AssignedTasks";
import AddTaskForm from "./tabs/AddTaskForm";
import { useState } from "react";
import { AssignedTask, Task } from "../model/Task";
import Tasks from "./tabs/Tasks";
import { Profile } from "../model/Profile";

function TabView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);
  const [profiles,setProfiles] = useState<Profile[]>([])
  
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
      children: <AssignedTasks
      setAssignedTasks={setAssignedTasks}
      assignedTasks={assignedTasks}
      setProfiles={setProfiles}
      profiles={profiles}
       />,
    },
    {
      key: '2',
      label: '2. Opgave liste',
      children: <Tasks setTasks={setTasks} tasks={tasks} setAssignedTasks={setAssignedTasks}/>
    },
    {
      key: '3',
      label: '3. Opret opgave',
      children: <AddTaskForm setTasks={setTasks}/>,
    },
  ];

  return (
    <Tabs size="large" renderTabBar={renderTabBar} type="card" defaultActiveKey="1" items={items}></Tabs>
  );
}

export default TabView;