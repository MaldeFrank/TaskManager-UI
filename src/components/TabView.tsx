import { Tabs, TabsProps } from "antd";
import StickyBox from "react-sticky-box";
import AssignedTasks from "./tabs/AssignedTasks";
import { useRef, useState } from "react";
import { Task } from "../model/Task";
import Tasks from "./tabs/Tasks";
import { Profile } from "../model/Profile";
import { AssignedTask } from "../model/AssignedTask";
import UsersList from "./tabs/UserList";
import AssignedTasklist from "./tabs/AssignedTasklist";
import { createTasklist } from "../services/apiTasklist";

function TabView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);
  const [assignedTasksWeekly, setAssignedTasksWeekly] = useState<AssignedTask[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);

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

  const initialTabs = [
    {
      key: '1',
      label: '1. Ugens opgaver',
      children: (
        <AssignedTasks
          setAssignedTasksWeekly={setAssignedTasksWeekly}
          assignedTasksWeekly={assignedTasksWeekly}
          setProfiles={setProfiles}
          profiles={profiles}
        />
      ),
    },
    {
      key: '2',
      label: '2. Opgave liste',
      children: (
        <Tasks
          setTasks={setTasks}
          tasks={tasks}
          setAssignedTasksWeekly={setAssignedTasksWeekly}
        />
      ),
    },
    {
      key: '3',
      label: '3. Brugere',
      children: <UsersList setProfiles={setProfiles} profiles={profiles} />,
    },
  ];

  const [activeKey, setActiveKey] = useState(initialTabs[0].key);
  const [items, setItems] = useState(initialTabs);
  const newTabIndex = useRef(0);

  const add = async () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: `Shared tab ${newPanes.length + 1}`,
      children: (
        <AssignedTasklist
          setAssignedTasksWeekly={setAssignedTasksWeekly}
          assignedTasksWeekly={assignedTasksWeekly}
          setProfiles={setProfiles}
          profiles={profiles}
        />
      ),
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
    const tasklist = {
    listName: `Shared tab ${newPanes.length + 1}`
    }

    const response = await createTasklist(tasklist);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      console.log("Remove"); 
      // Handle tab removal logic here (remove the tab from the 'items' state)
    }
  };

  return (
    <Tabs
      size="large"
      renderTabBar={renderTabBar}
      type="editable-card"
      defaultActiveKey="1"
      onEdit={onEdit}
      items={items} 
    />
  );
}

export default TabView;