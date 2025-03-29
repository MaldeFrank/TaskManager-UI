import { useEffect } from "react";
import { Profile } from "../../model/Profile";
import AssignedTasks from "./AssignedTasks";
import { useGetAssignedTasksByProfileId } from "../../services/queries";
import { useAppDispatch, useAppSelector } from "../../hooks/app/storeHook";
import { setMyTasks } from "../../redux/slicers/myTasksSlicer";
import { AssignedTask } from "../../model/AssignedTask";

interface props {
  setProfiles: any;
  profiles: Profile[];
}

{/* ---------------------------------------------------------------------
    Component: MyTasks
    Purpose: Shows the logged in user's assigned tasks.
    --------------------------------------------------------------------- */}
function MyTasks({
  setProfiles,
  profiles,
}: props) {
  const { data, refetch } = useGetAssignedTasksByProfileId(Number(localStorage.getItem("profile_id"))) as { data: AssignedTask[], refetch: () => void };
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
  }, [data]); 


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
