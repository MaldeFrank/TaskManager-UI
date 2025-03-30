import { Tabs, TabsProps } from "antd";
import StickyBox from "react-sticky-box";
import { useEffect, useRef, useState } from "react";
import { Task } from "../model/Task";
import Tasks from "../components/tabs/Tasks";
import UsersList from "../components/tabs/UserList";
import AssignedTasklist from "../components/tabs/AssignedTasklist";
import { createTasklist, deleteTasklist } from "../services/apiTasklist";
import { useGetAllAccTasklist } from "../services/queries";
import mapUserCreatedTabs from "../components/mapUserCreatedTabs";
import MyTasks from "../components/tabs/MyTasks";
import { useAppDispatch } from "../hooks/app/storeHook";
import {removeTasklist } from "../redux/slicers/tasklistSlicer";
import { removeAssignedTasks } from "../redux/slicers/myTasksSlicer";

{/* ---------------------------------------------------------------------
    Component: TabView
    Purpose: Shows tab components using ANTD Tabs component.
    --------------------------------------------------------------------- */}
function TabView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [activeKey, setActiveKey] = useState("1");
  const newTabIndex = useRef(0);
  const {data:fetchedTasklists, refetch: refetchTasklists} = useGetAllAccTasklist(localStorage.getItem("user_id") as string); //Passed to Tasks component to assing tasks to Tasklists.
  const dispatch = useAppDispatch()
  
  const userCreatedTabs = fetchedTasklists ? mapUserCreatedTabs({
    allTasklists: fetchedTasklists,
    setProfiles,
    profiles,
  }) : [];
  
  const generateTabs = () => [
    {
      key: "static1",
      label: "1. Mine opgaver",
      closable: false,
      children: (
        <MyTasks
        
          setProfiles={setProfiles}
          profiles={profiles}/>
      ),
    },
    {
      key: "static2",
      label: "2. Opret opgaver",
      closable: false,
      children: (
        <Tasks
          tasklists={fetchedTasklists}
          setTasks={setTasks}
          tasks={tasks}
        />
      ),
    },
    {
      key: "static3",
      label: "3. Brugere",
      closable: false,
      children: <UsersList/>,
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
    
      //Add the new tab with the correct tasklistId
      const newPanes = [...items];
      newPanes.push({
        key: response.taskId,
        label: newTabName,
        closable: true,
        children: (
          <AssignedTasklist
            setProfiles={setProfiles}
            profiles={profiles}
            tasklistId={response.taskId} // Pass the newly created tasklistId
          />
        ),
      });
      setItems(newPanes);
      setActiveKey(newActiveKey);
  
      refetchTasklists(); //Refetch tasklists to update the list of tasklists
    } catch (error) {
      console.error("Failed to create tasklist:", error);
    }
  };

  const remove = (targetKey: string) => {
    const newItems = items.filter((item) => item.key !== targetKey);
    dispatch(removeTasklist({ id: Number(targetKey) })); //Removes tasklist from state
    dispatch(removeAssignedTasks(targetKey)) //Removes all assignedtasks from users own list
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
}, [tasks, profiles, fetchedTasklists]);

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
