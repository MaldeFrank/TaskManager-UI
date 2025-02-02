import { useEffect, useState } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import { useGetAccAssignedTasks } from "../../services/queries";

interface props {
  setProfiles: any;
  profiles: Profile[];
  setAssignedTasks: any;
  assignedTasks: any;
}

function MyTasks({
  setProfiles,
  profiles,
  setAssignedTasks,
  assignedTasks
}: props) {
  const { data, refetch} = useGetAccAssignedTasks(localStorage.getItem("user_id") as string);
  const [filteredAssignedTasks, setFilteredAssignedTasks] = useState<any[]>([]); 
  
  useEffect(() => { 
    if (data) { 
      const profileId = Number(localStorage.getItem("profile_id"))
      refetch();
      if(profileId !== null && profileId !== 0){
        setFilteredAssignedTasks(data.filter((task: any) => task.assignedTo.id === profileId));
      }
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
