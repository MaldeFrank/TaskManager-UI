import { useEffect, useState } from "react";
import {
  useGetAllAssignedTasks,
  useGetAllProfiles
} from "../../services/queries";
import { Dropdown, MenuProps, message, Switch, Table } from "antd";
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

  const { data, isLoading, isError, error } = useGetAllAssignedTasks();
  const [thisWeeksTasks,setThisWeeksTasks] = useState<AssignedTask[]>([]);

  const today: Date = new Date();// Todays date
  const nextWeek: Date = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); //A week from today

  const formattedTodayDate = new Date(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`);
  const formattedNextWeekDate = new Date(`${nextWeek.getFullYear()}/${nextWeek.getMonth() + 1}/${nextWeek.getDate()}`);

  const {
    data: profilesData,
    isLoading: isProfilesLoading,
    isError: isProfilesError,
  } = useGetAllProfiles();

  //Function to filter tasks based on the date
  const filterTasksForThisWeek = () => {
    const filteredTasks = assignedTasks.filter((task) => {
      if (!task.dateTime) return false; // Skip tasks without a date

      // Convert task date to a Date object
      const taskDate = new Date(task.dateTime);

      // Check if task date is between today and next week
      return (
        taskDate >= formattedTodayDate && taskDate < formattedNextWeekDate
      );
    });
    setThisWeeksTasks(filteredTasks);
  };

  //Function to switch state to done and back
  const switchTaskState = (record: AssignedTask) => {
    setAssignedTasks((prev: AssignedTask[]) =>
      prev.map((task) => {
        if (task.id === record.id) {
          task.completed = !task.completed;
          return task;
        } else {
          return task;
        }
      })
    );
    updateAssignTask(record);
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
    if (data) {
      setAssignedTasks(data);
      filterTasksForThisWeek();
    }
  }, [data, setAssignedTasks]);

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
    },
    {
      title: "Beskrivelse",
      dataIndex: ["task", "description"],
    },
    {
      title: "Points",
      dataIndex: ["task", "points"],
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
    },
    {
      title: "Oprettet",
      dataIndex: "dateTime",
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
    },
  ];

  return <Table dataSource={thisWeeksTasks} columns={columns} />;
}

export default AssignedTasks;
