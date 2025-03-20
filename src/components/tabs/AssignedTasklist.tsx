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
import { useTaskData } from "../../hooks/tabs/AssignedTasklist/useTaskData";

interface props {
  setProfiles: any;
  profiles: Profile[];
  tasklistId: number;
  setAssignedTasks: any;
  assignedTasks: any;
}
{/* ---------------------------------------------------------------------
    Component: AssignedTasklist
    Purpose: To show a tasklist and all its AssignedTask.
    --------------------------------------------------------------------- */}
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
    };
    fetchTasklist();
  }, [tasklistId]);

  const [shownData, setShownData] = useTaskData(tasklistId, taskFilter, setAssignedTasks, assignedTasks); //Added setAssignedTasks and assignedTasks to update showData when new is added
  const [email, setEmail] = useState("");
  const [shareVisible, setShareVisible] = useState(false);


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
        assignedTasks={Array.isArray(shownData) ? shownData : []}
        setProfiles={setProfiles}
        profiles={profiles}
        tasklistId={tasklistId}
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
