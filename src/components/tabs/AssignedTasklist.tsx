import { useState } from "react";
import { AssignedTask } from "../../model/AssignedTask";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";

interface props {
  setProfiles: any;
  profiles: Profile[];
  tasklistName: any;
}

function AssignedTasklist({
  setProfiles,
  profiles,
}: props) {
  const [assignedTasks, setAssignedTasks] = useState<any[]>([]);

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
