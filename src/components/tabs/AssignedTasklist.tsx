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
}

function AssignedTasklist({
  setProfiles,
  profiles,
  tasklistName
}: props) {
  const { data: assignedTasksFetch, isLoading, error } = useGetAssingedTasks(123);
  const [assignedTasks,setAssignedTasks] = useState<any[]>(assignedTasksFetch)
 

  return (
    <>
      <button>Press here</button>
      <AssignedTasks
        setAssignedTasksWeekly={setAssignedTasks}
        assignedTasksWeekly={assignedTasks}
        setProfiles={setProfiles}
        profiles={profiles}
      />
    </>
  );
}

export default AssignedTasklist;
