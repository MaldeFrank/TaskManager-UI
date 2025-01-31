import { useEffect, useState } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import { useGetAccAssignedTasks } from "../../services/queries";
import { addAccToTasklist } from "../../services/apiTasklist";

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
  const { data, refetch} = useGetAccAssignedTasks(localStorage.getItem("user_id") as string);
  const [filteredAssignedTasks, setFilteredAssignedTasks] = useState<any[]>([]); 
  const [email, setEmail] = useState("");
  
  useEffect(() => { 
    if (data) { 
      refetch();
      setFilteredAssignedTasks(data.filter((task: any) => task.tasklistId === tasklistId));
    } else {
      setFilteredAssignedTasks([]); 
    }
  }, [data,setAssignedTasks,assignedTasks]); 

  const addUserToTasklist = async () => {
    addAccToTasklist(email, tasklistId);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <input onChange={(e)=>handleEmailChange(e)} type="text" placeholder="Email.." />
      <button onClick={()=>addUserToTasklist()}>Del</button>
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
