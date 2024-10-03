import { useEffect, useState } from "react";
import {
  useGetAllAssignedTasks,
  useGetAllProfiles
} from "../../services/queries";
import { Dropdown, MenuProps, message, Switch, Table } from "antd";
import { AssignedTask } from "../../model/Task";
import { Profile } from "../../model/Profile";
import { UserOutlined } from "@ant-design/icons";
import { updateAssignTask } from "../../services/apiAssignedTasks";

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
  // Add state to track selected user for each task
  const [profile, setProfile] = useState<Profile>();

  const { data, isLoading, isError, error } = useGetAllAssignedTasks();
  const {
    data: profilesData,
    isLoading: isProfilesLoading,
    isError: isProfilesError,
  } = useGetAllProfiles();

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

  // Modified handleMenuClick to update the selected user
  const handleMenuClick = (record:AssignedTask) => (e: any) => {
    const selectedProfile = profiles.find(profile => profile.id === e.key);
    if (selectedProfile) {
     setProfile(record.assignedTo)
    }
    message.info("User assigned successfully");
  };

  const items: MenuProps["items"] = profiles.map((profile) => ({
    key: profile.id,
    label: profile.name,
  }));

  useEffect(() => {
    if (data) {
      setAssignedTasks(data);
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
          {profile?.name|| "Ikke sat"}
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

  return <Table dataSource={assignedTasks} columns={columns} />;
}

export default AssignedTasks;
