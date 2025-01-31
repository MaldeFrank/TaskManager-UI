import { Tabs, TabsProps } from "antd";
import StickyBox from "react-sticky-box";
import AssignedTasks from "./tabs/AssignedTasks";
import { useEffect, useRef, useState } from "react";
import { Task } from "../model/Task";
import Tasks from "./tabs/Tasks";
import { Profile } from "../model/Profile";
import UsersList from "./tabs/UserList";
import AssignedTasklist from "./tabs/AssignedTasklist";
import { createTasklist, deleteTasklist } from "../services/apiTasklist";
import { useGetAllAccTasklist, useGetAllTasklist } from "../services/queries";
import mapUserCreatedTabs from "./mapUserCreatedTabs";

function TabView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<any[]>([]); //Right now it is always empty and is just used to make child components rerender
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeKey, setActiveKey] = useState("1");
  const newTabIndex = useRef(0);
  const [tasklistId, setTasklisId] = useState(0) // For setting the id of a created tasklist in add function
  const {data:fetchedTasklists, refetch: refetchTasklists} = useGetAllAccTasklist(localStorage.getItem("user_id") as string);

  const userCreatedTabs = fetchedTasklists ? mapUserCreatedTabs({
    allTasklists: fetchedTasklists,
    setProfiles,
    profiles,
    setAssignedTasks: setAssignedTasks,
    assignedTasks: assignedTasks,
  }) : [];

  const generateTabs = () => [
    {
      key: "1",
      label: "1. Ugens opgaver",
      closable: false,
      children: (
        <AssignedTasks
          setAssignedTasks={setAssignedTasks}
          assignedTasks={assignedTasks}
          setProfiles={setProfiles}
          profiles={profiles}
        />
      ),
    },
    {
      key: "2",
      label: "2. Opgave liste",
      closable: false,
      children: (
        <Tasks
          tasklists={fetchedTasklists}
          setTasks={setTasks}
          tasks={tasks}
          setAssignedTasksWeekly={setAssignedTasks}
        />
      ),
    },
    {
      key: "3",
      label: "3. Brugere",
      closable: false,
      children: <UsersList setProfiles={setProfiles} profiles={profiles} />,
    },
    ...userCreatedTabs
  ];

  const [items, setItems] = useState(generateTabs());



  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
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

  const add = async () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newTabName = `Delt liste ${items.length + 1}`;
   
    const newPanes = [...items];
    newPanes.push({
      key: newActiveKey,
      label: newTabName,
      closable: true, 
      children: (
        <AssignedTasklist
          setAssignedTasks={setAssignedTasks}
          assignedTasks={assignedTasks}
          setProfiles={setProfiles}
          profiles={profiles}
          tasklistId={tasklistId}
        />
      ),
      
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);

    const tasklist = {
      listName: newTabName,
    };

    try {
      const response = await createTasklist(tasklist);
      console.log("Here is tasklist: ",response)
      setTasklisId(response.taskId)
    } catch (error) {
      console.error("Failed to create tasklist:", error);
    }
  };

  const remove = (targetKey: string) => {
    const newItems = items.filter((item) => item.key !== targetKey);
    setItems(newItems);

    // If the active tab is being removed, switch to the first tab
    if (activeKey === targetKey) {
      setActiveKey(newItems[0]?.key || "1");
    }
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey as string);
      deleteTasklist(Number(targetKey))
    }
  };

   // Update items when dependencies change
 useEffect(() => {
  refetchTasklists();
  setItems(generateTabs());
}, [tasks, assignedTasks, profiles, fetchedTasklists]);

  return (
    <Tabs
      size="large"
      renderTabBar={renderTabBar}
      type="editable-card"
      activeKey={activeKey}
      onChange={setActiveKey}
      onEdit={onEdit}
      items={items}
    />
  );
}

export default TabView;
