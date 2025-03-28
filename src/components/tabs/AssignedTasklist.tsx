import { useEffect, useState } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import { getTasklist } from "../../services/apiTasklist";
import { Button} from "antd";
import TaskFetchOptions from "../TaskFetchOptions";
import ShareSection from "../ShareSection";
import { AntDesignOutlined } from "@ant-design/icons";
import { useTaskData } from "../../hooks/tabs/AssignedTasklist/useTaskData";
import { useShareTasklist } from "../../hooks/tabs/AssignedTasklist/useShareTasklist";
import { useAppSelector } from "../../hooks/app/storeHook";

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
}: props) {
  const [taskFilter, setTaskFilter] = useState<any>("All"); // Default value for taskFilter

  useEffect(() => {
    const fetchTasklist = async () => {
      const task = await getTasklist(tasklistId);
      setTaskFilter(task.periodFilter);
    };
    fetchTasklist();
  }, [tasklistId]);

  useTaskData(tasklistId, taskFilter); 
  const {shareVisible, setShareVisible, addUserToTasklist, handleEmailChange } = useShareTasklist(tasklistId); //Handles share functionality.
  const tasklistState:any = useAppSelector((state)=>state.assignedTasklist.list.find((tasklistObject) => tasklistObject.id === tasklistId));

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
        assignedTasks={Array.isArray(tasklistState?.tasklist) ? tasklistState.tasklist : []}
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
