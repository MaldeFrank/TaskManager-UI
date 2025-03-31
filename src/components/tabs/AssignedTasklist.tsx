import { useEffect, useState } from "react";
import AssignedTasks from "./AssignedTasks";
import { getTasklist } from "../../services/apiTasklist";
import { Button} from "antd";
import TaskFetchOptions from "../TaskFetchOptions";
import ShareSection from "../ShareSection";
import { AntDesignOutlined } from "@ant-design/icons";
import { useTaskData } from "../../hooks/tabs/AssignedTasklist/useTaskData";
import { useShareTasklist } from "../../hooks/tabs/AssignedTasklist/useShareTasklist";
import {useAppSelector } from "../../hooks/app/storeHook";
import { Tasklist } from "../../model/Tasklist";

interface props {
  tasklistId: number;
}
{/* ---------------------------------------------------------------------
    Component: AssignedTasklist
    Purpose: To show a tasklist and all its AssignedTask.
    --------------------------------------------------------------------- */}
function AssignedTasklist({
  tasklistId,
}: props) {
  const [taskFilter, setTaskFilter] = useState<any>("All"); // Default value for taskFilter
  useEffect(() => {
    const fetchTasklist = async () => {
      const tasklist:Tasklist = await getTasklist(tasklistId);
       setTaskFilter(tasklist.periodFilter);
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
