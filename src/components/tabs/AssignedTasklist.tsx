import { useEffect, useState } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import { useGetAccAssignedTasks } from "../../services/queries";

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
  assignedTasks
}: props) {
  const { data} = useGetAccAssignedTasks(localStorage.getItem("user_id") as string);
  const [filteredAssignedTasks, setFilteredAssignedTasks] = useState<any[]>([]); 
  
  useEffect(() => {
    if (data) { 
      setFilteredAssignedTasks(data.filter((task: any) => task.tasklistId === tasklistId));
    } else {
      setFilteredAssignedTasks([]); 
    }
  }, [data,setAssignedTasks,assignedTasks]); 


  return (
    <>
      <button>Press here</button>
      <AssignedTasks
        setAssignedTasks={setFilteredAssignedTasks}
        assignedTasks={filteredAssignedTasks != null ? filteredAssignedTasks : []}
        setProfiles={setProfiles}
        profiles={profiles}
      />
    </>
  );
}

export default AssignedTasklist;
