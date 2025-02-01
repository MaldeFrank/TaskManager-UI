import { useEffect, useState } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import { useGetAccAssignedTasks } from "../../services/queries";
import { addAccToTasklist } from "../../services/apiTasklist";
import { message, notification } from "antd";
import { addGoogleAccByEmail } from "../../services/apiProfile";

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
    const response = await  addAccToTasklist(email, tasklistId);
    if(response === false){
      message.error("Bruger med mail ikke fundet");
    }else{
      message.success("Bruger tilføjet til tasklist");
    }

    const response2 = await addGoogleAccByEmail(localStorage.getItem("profile_id"), email);
    if(response2 === false){
      message.error("Kunne ikke tilføje din profil til dem");
    }
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
