import { useEffect, useState } from "react";
import { AssignedTask } from "../../model/AssignedTask";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import { getAssignedTasks } from "../../services/apiTasklist";
import { useGetAssingedTasks } from "../../services/queries";

interface props {
  setProfiles: any;
  profiles: Profile[];
  tasklistId:number;
}

function AssignedTasklist({
  setProfiles,
  profiles,
  tasklistId
}: props) {
  const { data: assignedTasksFetch} = useGetAssingedTasks(tasklistId);
  const [assignedTasks,setAssignedTasks] = useState<any[]>(assignedTasksFetch)
 
  useEffect(() => {
   console.log("AssignedTasks",assignedTasks)
   console.log("Id",tasklistId)
  }, [assignedTasks]);

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
