import { useEffect, useState } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import { useGetAssignedTasksByProfileId } from "../../services/queries";

interface props {
  setProfiles: any;
  profiles: Profile[];
  setAssignedTasks: any;
  assignedTasks: any;
}

{/* ---------------------------------------------------------------------
    Component: MyTasks
    Purpose: Shows the logged in user's assigned tasks.
    --------------------------------------------------------------------- */}
function MyTasks({
  setProfiles,
  profiles,
  setAssignedTasks,
  assignedTasks
}: props) {
  const { data, refetch} = useGetAssignedTasksByProfileId(Number(localStorage.getItem("profile_id")));
  const [filteredAssignedTasks, setFilteredAssignedTasks] = useState<any[]>([]); 
  
  useEffect(() => { 
    if (data) { 
      refetch();
      setFilteredAssignedTasks(data);
    } else {
      setFilteredAssignedTasks([]); 
    }
  }, [data,setAssignedTasks,assignedTasks]); 


  return (
    <>
      <AssignedTasks
        setAssignedTasks={setFilteredAssignedTasks}
        assignedTasks={filteredAssignedTasks != null ? filteredAssignedTasks : []}
        setProfiles={setProfiles}
        profiles={profiles}
      />
    </>
  );
}

export default MyTasks;
