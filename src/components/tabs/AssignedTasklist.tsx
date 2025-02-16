import { useEffect, useState } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import {
  useGetAssignedTasksByTasklistMonthly,
  useGetAssignedTasksByTasklistWeekly,
  useGetAssingedTasks,
} from "../../services/queries";
import { addAccToTasklist, getTasklist } from "../../services/apiTasklist";
import { message } from "antd";
import {
  addGoogleAccByEmail,
  getProfileByGoogleEmail,
} from "../../services/apiProfile";
import TaskFetchOptions from "../TaskFetchOptions";

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
  
  const [taskFilter, setTaskFilter] = useState<any>("All"); // Default value for taskFilter

  useEffect(() => {
    getTasklist(tasklistId).then((task) => {
      setTaskFilter(task.periodFilter);
      console.log("Tasklist fetched with given id: ",task)
    });
  }, [tasklistId]); // Fetch the periodFilter when the component mounts
  
  const { data, refetch } = useGetAssingedTasks(tasklistId);

  const { data: weeklyTasks, refetch: refecthWeekly } =
    useGetAssignedTasksByTasklistWeekly(tasklistId);

  const { data: monthlyTasks, refetch: refecthMonthly } =
    useGetAssignedTasksByTasklistMonthly(tasklistId);

  const [shownData, setShownData] = useState<any[]>([]); //Shows assignedTasks based on taskfilter

  const [email, setEmail] = useState("");

  useEffect(() => {
    switch (taskFilter) {
      case "All":
        refetch();
        console.log("All")
        setShownData(data)
        break;
      case "Weekly":
        refecthWeekly();
        console.log("Weekly")
        setShownData(weeklyTasks);
        break;
      case "Monthly":
        refecthMonthly();
        console.log("Monthly")
        setShownData(monthlyTasks);
        break;
      default:
        setShownData([]);
        break;
    }
  }, [data,weeklyTasks,monthlyTasks, setAssignedTasks, assignedTasks, taskFilter]);

  const addProfiles = async () => {
    await addGoogleAccByEmail(localStorage.getItem("profile_id"), email); //Adds profile to receiver google acc
    const response = await getProfileByGoogleEmail(email);
    console.log("Profile found with email: ", response);
    console.log("Id of the profile found: ", response.id);
    await addGoogleAccByEmail(response.id, localStorage.getItem("Email")); //Adds reciever profile to sender
  };

  const addUserToTasklist = async () => {
    const response = await addAccToTasklist(email, tasklistId);
    if (response === false) {
      message.error("Bruger med mail ikke fundet");
    } else {
      message.success("Bruger tilføjet til tasklist");
    }
    addProfiles();
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div>
        <TaskFetchOptions 
        tasklistId={tasklistId}
        setTaskFilter={setTaskFilter} 
        taskFilter={taskFilter} />
      </div>

      <AssignedTasks
        setAssignedTasks={setShownData}
        assignedTasks={shownData != null ? shownData : []}
        setProfiles={setProfiles}
        profiles={profiles}
      />
       <input
          onChange={(e) => handleEmailChange(e)}
          type="text"
          placeholder="Email.."
        />
        <button onClick={() => addUserToTasklist()}>Del</button>
    </>
  );
}

export default AssignedTasklist;
