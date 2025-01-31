import { useEffect, useState } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";

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
