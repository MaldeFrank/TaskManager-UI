import { useEffect, useState } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import {
  useGetAssignedTasksByTasklistMonthly,
  useGetAssignedTasksByTasklistWeekly,
  useGetAssingedTasks,
} from "../../services/queries";
import { addAccToTasklist, getTasklist } from "../../services/apiTasklist";
import { Button, message } from "antd";
import {
  addGoogleAccByEmail,
  getProfileByGoogleEmail,
} from "../../services/apiProfile";
import TaskFetchOptions from "../TaskFetchOptions";
import ShareSection from "../ShareSection";
import { AntDesignOutlined } from "@ant-design/icons";

interface props {
  setProfiles: any;
  profiles: Profile[];
  tasklistId: number;
  setAssignedTasks: any;
  assignedTasks: any;
}

function AssignedTasklist({
  setProfiles,
  profiles,
  tasklistId,
  setAssignedTasks,
  assignedTasks,
}: props) {
  const [taskFilter, setTaskFilter] = useState<any>("All"); // Default value for taskFilter

  useEffect(() => {
    const fetchTasklist = async () => {
      const task = await getTasklist(tasklistId);
      setTaskFilter(task.periodFilter);
      console.log("Tasklist fetched with given id: ", task);
    };
    fetchTasklist();
  }, [tasklistId]);

  const { data, refetch } = useGetAssingedTasks(tasklistId);

  const { data: weeklyTasks, refetch: refecthWeekly } =
    useGetAssignedTasksByTasklistWeekly(tasklistId);

  const { data: monthlyTasks, refetch: refecthMonthly } =
    useGetAssignedTasksByTasklistMonthly(tasklistId);

  const [shownData, setShownData] = useState<any[]>([]); //Shows assignedTasks based on taskfilter

  const [email, setEmail] = useState("");

  const [shareVisible, setShareVisible] = useState(false);

  useEffect(() => {
    switch (taskFilter) {
      case "All":
        refetch();
        console.log("All");
        setShownData(data);
        break;
      case "Weekly":
        refecthWeekly();
        console.log("Weekly");
        setShownData(weeklyTasks);
        break;
      case "Monthly":
        refecthMonthly();
        console.log("Monthly");
        setShownData(monthlyTasks);
        break;
      default:
        refetch();
        setShownData(data);
        break;
    }
  }, [
    data,
    weeklyTasks,
    monthlyTasks,
    setAssignedTasks,
    assignedTasks,
    taskFilter,
  ]);

  const addProfiles = async () => {
    await addGoogleAccByEmail(localStorage.getItem("profile_id"), email); //Adds profile to receiver google acc
    const response = await getProfileByGoogleEmail(email);
    await addGoogleAccByEmail(response.id, localStorage.getItem("Email")); //Adds reciever profile to sender
  };

  const addUserToTasklist = async () => {
    const response = await addAccToTasklist(email, tasklistId);

    if (response === false||response===undefined) {
      message.error("Bruger med mail ikke fundet");
    } else {
      message.success("Bruger tilføjet til tasklist");
      addProfiles();
    }
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <div>
        <TaskFetchOptions
          tasklistId={tasklistId}
          setTaskFilter={setTaskFilter}
          taskFilter={taskFilter}
        />
      </div>

      <AssignedTasks
        setAssignedTasks={setShownData}
        assignedTasks={shownData != null ? shownData : []}
        setProfiles={setProfiles}
        profiles={profiles}
      />
      <ShareSection
        tasklistId={tasklistId}
        onClickSendEmail={addUserToTasklist}
        onInputChange={handleEmailChange}
        isVisible={shareVisible}
        setIsVisible={setShareVisible}
      />
      <Button type="primary" size="large" icon={<AntDesignOutlined />} onClick={() => setShareVisible(!shareVisible)}>
        Del
      </Button>

    </div>
  );
}

export default AssignedTasklist;
