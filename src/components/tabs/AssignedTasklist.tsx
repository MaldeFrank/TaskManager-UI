import { AssignedTask } from "../../model/AssignedTask";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";

interface props {
  setAssignedTasksWeekly: any;
  assignedTasksWeekly: AssignedTask[];
  setProfiles: any;
  profiles: Profile[];
}

function AssignedTasklist({  
    setAssignedTasksWeekly,
    assignedTasksWeekly,
    setProfiles,
    profiles,}:props){
return(
    <>
     <button>Press here</button>
    <AssignedTasks
          setAssignedTasksWeekly={setAssignedTasksWeekly}
          assignedTasksWeekly={assignedTasksWeekly}
          setProfiles={setProfiles}
          profiles={profiles}
        />
    </>
)
};

export default AssignedTasklist;