import { useEffect } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import { useGetAssignedTasksByProfileId } from "../../services/queries";
import { useAppDispatch, useAppSelector } from "../../hooks/app/storeHook";
import { setMyTasks } from "../../redux/slicers/myTasksSlicer";

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
  const tasklist = useAppSelector((state)=>state.myTaskList.list);
  const dispatch = useAppDispatch();

  function setList(){
   dispatch(setMyTasks(data))
  }

  useEffect(() => { 
    if (data) { 
      refetch();
      setList() 
    } else {
      
    }
  }, [data,setAssignedTasks,assignedTasks]); 


  return (
    <>
      <AssignedTasks
        assignedTasks={data != null ? tasklist : []} 
        setProfiles={setProfiles}
        profiles={profiles}
      />
    </>
  );
}

export default MyTasks;
