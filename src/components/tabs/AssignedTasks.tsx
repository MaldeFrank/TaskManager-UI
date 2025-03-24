import { useEffect } from "react";
import {
  useGetAllAccProfiles,
} from "../../services/queries";
import { Dropdown, MenuProps, message, Switch, Table, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AssignedTask } from "../../model/AssignedTask";
import { switchTaskState } from "../../util/assignedtasks/switchTaskState";
import { handleMenuClick } from "../../util/assignedtasks/handleMenuClick";
import { useAppDispatch, useAppSelector } from "../../hooks/app/storeHook";

interface props {
  assignedTasks: any[];
  setProfiles: any;
  profiles: any[];
  tasklistId?: any;
}
{/* ---------------------------------------------------------------------
    Component: AssignedTasks
    Purpose: Displays given list of AssignedTasks, and handles the state of the AssignedTasks.
    --------------------------------------------------------------------- */}
function AssignedTasks({
  assignedTasks,
  setProfiles,
  profiles,
}: props) {


  const {data: profilesData,isError: isProfilesError,refetch: refetchProfiles} = useGetAllAccProfiles(localStorage.getItem("user_id") as string);
  const dispatch = useAppDispatch();
  const tasklistState = useAppSelector((state)=>state.tasklist.list);
  

  const items: MenuProps["items"] = profiles.map((profile) => ({
    key: profile.id,
    label: profile.name,
  }));

  useEffect(() => {
    if (profilesData) {
      setProfiles(profilesData);
    }
  }, [profilesData, setProfiles, switchTaskState]);

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
            onClick: (e) => handleMenuClick(record, profiles, dispatch, tasklistState)(e),
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
          onClick={() => switchTaskState(record, dispatch, tasklistState)}
        />
      ),
      width:100,
    },
  ];

  return(
  <div>
    <h2 style={{textAlign:"center", color:"red"}}><Tag color="red">Ikke udført</Tag></h2>
  <Table
   dataSource={assignedTasks.filter((task)=>task.completed===false)} 
   columns={columns}
   rowKey={(record) => record.id}
   />
    <h2 style={{textAlign:"center", color:"green"}}><Tag color="green">Udført</Tag></h2>
  <Table
   dataSource={assignedTasks.filter((task)=>task.completed===true)}
   columns={columns}
   rowKey={(record) => record.id}
   />
  </div>
) 
}

export default AssignedTasks;

