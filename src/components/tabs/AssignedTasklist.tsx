import { useEffect, useState } from "react";
import { AssignedTask } from "../../model/AssignedTask";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import { getAssignedTasks } from "../../services/apiTasklist";
import { useGetAssingedTasks } from "../../services/queries";

interface props {
  setProfiles: any;
  profiles: Profile[];
  tasklistName: any;
  tasklistId:number;
}

function AssignedTasklist({
  setProfiles,
  profiles,
  tasklistName,
  tasklistId
}: props) {
  const { data: assignedTasksFetch, isLoading, error } = useGetAssingedTasks(tasklistId);
  const [assignedTasks,setAssignedTasks] = useState<any[]>()
 

  return (
    <>
      <button>Press here</button>
      <AssignedTasks
        setAssignedTasksWeekly={setAssignedTasks}
        assignedTasksWeekly={assignedTasks != null ? assignedTasks : []}
        setProfiles={setProfiles}
        profiles={profiles}
      />
    </>
  );
}

export default AssignedTasklist;
