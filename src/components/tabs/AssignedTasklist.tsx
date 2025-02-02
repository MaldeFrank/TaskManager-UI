import { useEffect, useState } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import { useGetAccAssignedTasks, useGetAssingedTasks } from "../../services/queries";
import { addAccToTasklist } from "../../services/apiTasklist";
import { message, notification } from "antd";
import { addGoogleAccByEmail, getProfileByGoogleEmail } from "../../services/apiProfile";

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
  const { data, refetch} = useGetAssingedTasks(tasklistId);
  const [filteredAssignedTasks, setFilteredAssignedTasks] = useState<any[]>([]); 
  const [email, setEmail] = useState("");
  
  useEffect(() => { 
    if (data) { 
      refetch();
      setFilteredAssignedTasks(data);
    } else {
      setFilteredAssignedTasks([]); 
    }
  }, [data,setAssignedTasks,assignedTasks]); 

  const addProfiles = async () => {
    await addGoogleAccByEmail(localStorage.getItem("profile_id"), email); //Adds profile to receiver google acc
    const response = await getProfileByGoogleEmail(email)
    console.log("Profile found with email: ",response)
    console.log("Id of the profile found: ",response.id)
    await addGoogleAccByEmail(response.id, localStorage.getItem("Email")); //Adds reciever profile to sender
  }

  const addUserToTasklist = async () => {
    const response = await  addAccToTasklist(email, tasklistId);
    if(response === false){
      message.error("Bruger med mail ikke fundet");
    }else{
      message.success("Bruger tilføjet til tasklist");
    }
    addProfiles();
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
