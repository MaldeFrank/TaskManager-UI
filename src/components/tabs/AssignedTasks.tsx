import { useEffect, useState } from "react";
import {
  useGetAccAssignedTasks,
  useGetAllAssignedTasks,
  useGetAllAssignedTasksWeekly,
  useGetAllProfiles
} from "../../services/queries";
import { Dropdown, MenuProps, message, Switch, Table, Tag } from "antd";
import { Profile } from "../../model/Profile";
import { UserOutlined } from "@ant-design/icons";
import { updateAssignTask } from "../../services/apiAssignedTasks";
import { AssignedTask } from "../../model/AssignedTask";

interface props {
  setAssignedTasks: any;
  assignedTasks: AssignedTask[];
  setProfiles: any;
  profiles: Profile[];
}

function AssignedTasks({
  setAssignedTasks,
  assignedTasks,
  setProfiles,
  profiles,
}: props) {

  const { data, isLoading, isError, error } = useGetAccAssignedTasks(localStorage.getItem("user_id") as string);

  const {
    data: profilesData,
    isLoading: isProfilesLoading,
    isError: isProfilesError,
  } = useGetAllProfiles();


  //Function to switch state to done and back
  const switchTaskState = (record: any) => {
    
    if(record.assignedTo){
      setAssignedTasks((prev: any[]) =>
        prev.map((task) => {
          if (task.id === record.id) {
            task.completed = !task.completed;
            return task;
          } else {
            return task;
          }
        })
      );

      record.completed?record.assignedTo.points += record.task.points:record.assignedTo.points -= record.task.points // On completion of task points goes up and opposite
      updateAssignTask(record);
    }else{
      message.warning("Opgave er ikke tildelt")
    }
  };

// Handles clicks on dropdown items
const handleMenuClick = (record: AssignedTask) => (e: any) => {
  const selectedProfile = profiles.find(profile => profile.id === parseInt(e.key));
  if (selectedProfile) {
    setAssignedTasks((prev: AssignedTask[]) =>
      prev.map((task) =>
        task.id === record.id ? { ...task, assignedTo: selectedProfile } : task
      ),
      record.assignedTo=selectedProfile
    );
    message.info("User assigned successfully");
    updateAssignTask(record);
  }
};

  const items: MenuProps["items"] = profiles.map((profile) => ({
    key: profile.id,
    label: profile.name,
  }));


  useEffect(() => {
    if (profilesData) {
      setProfiles(profilesData);
    }
  }, [profilesData, setProfiles]);

  if (isLoading || isProfilesLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isProfilesError) {
    return <div>Error loading profiles</div>;
  }

  const columns = [
    {
      title: "Titel",
      dataIndex: ["task", "title"],
      width:100,
    },
    {
      title: "Beskrivelse",
      dataIndex: ["task", "description"],
      width:100,
    },
    {
      title: "Points",
      dataIndex: ["task", "points"],
      width:100,
    },
    {
      title: "Tildelt",
      dataIndex: "assignedTo",
      render: (_: any, record: AssignedTask) => (
        <Dropdown.Button
          menu={{
            items,
            onClick: (e) => handleMenuClick(record)(e),
          }}
          placement="bottom"
          icon={<UserOutlined />}
        >
           {record.assignedTo?.name ? record.assignedTo.name : "Ikke sat"} 
        </Dropdown.Button>
      ),
      width:100,
    },
    {
      title: "Oprettet",
      dataIndex: "dateTime",
      width:100,
    },
    {
      title: "Udført",
      dataIndex: "completed",
      render: (_: any, record: AssignedTask) => (
        <Switch
          checked={record.completed}
          style={{ backgroundColor: record.completed ? "green" : "red" }}
          onClick={() => switchTaskState(record)}
        />
      ),
      width:100,
    },
  ];

  return(
  <div>
    
    <h2 style={{textAlign:"center", color:"red"}}><Tag color="red">Ikke udført</Tag></h2>
  <Table dataSource={assignedTasks.filter((task)=>task.completed===false)} columns={columns}/>
    <h2 style={{textAlign:"center", color:"green"}}><Tag color="green">Udført</Tag></h2>
  <Table dataSource={assignedTasks.filter((task)=>task.completed===true)} columns={columns}/>
  </div>
) 
}

export default AssignedTasks;
