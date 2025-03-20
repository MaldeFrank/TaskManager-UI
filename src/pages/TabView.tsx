import { Tabs, TabsProps } from "antd";
import StickyBox from "react-sticky-box";
import { useEffect, useRef, useState } from "react";
import { Task } from "../model/Task";
import Tasks from "../components/tabs/Tasks";
import UsersList from "../components/tabs/UserList";
import AssignedTasklist from "../components/tabs/AssignedTasklist";
import { createTasklist, deleteTasklist } from "../services/apiTasklist";
import { useGetAllAccTasklist, useGetAllTasklist } from "../services/queries";
import mapUserCreatedTabs from "../components/mapUserCreatedTabs";
import MyTasks from "../components/tabs/MyTasks";

{/* ---------------------------------------------------------------------
    Component: TabView
    Purpose: Shows tab components using ANTD Tabs component.
    --------------------------------------------------------------------- */}
function TabView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<any[]>([]); //Right now it is always empty and is just used to make child components rerender
  const [profiles, setProfiles] = useState<any[]>([]);
  const [activeKey, setActiveKey] = useState("1");
  const newTabIndex = useRef(0);
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
      label: "1. Mine opgaver",
      closable: false,
      children: (
        <MyTasks
          setAssignedTasks={setAssignedTasks}
          assignedTasks={assignedTasks}
          setProfiles={setProfiles}
          profiles={profiles}/>
      ),
    },
    {
      key: "2",
      label: "2. Opret opgaver",
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



  // Custom renderTabBar to style the tab bar and make it sticky
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
    const newTabName = `Opgave liste ${items.length - 2}`;
  
    const tasklist = {
      listName: newTabName,
      periodFilter: "All",
    };
  
    try {
      // Create the tasklist first
      const response = await createTasklist(tasklist);
      console.log("Here is tasklist: ", response);
      console.log("This is the tasklist id:", response.taskId);
    
  
      // Now add the new tab with the correct tasklistId
      const newPanes = [...items];
      newPanes.push({
        key: response.taskId,
        label: newTabName,
        closable: true,
        children: (
          <AssignedTasklist
            setAssignedTasks={setAssignedTasks}
            assignedTasks={assignedTasks}
            setProfiles={setProfiles}
            profiles={profiles}
            tasklistId={response.taskId} // Pass the newly created tasklistId
          />
        ),
      });
      setItems(newPanes);
      setActiveKey(newActiveKey);
  
      refetchTasklists();
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
      onTabClick={()=>console.log("Hello")}
    />
  );
}

export default TabView;
