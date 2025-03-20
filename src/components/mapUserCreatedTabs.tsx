
import AssignedTasklist from "./tabs/AssignedTasklist"
import EditableTabLabel from "./EditableTabLabel";
import { updateTaskListName } from "../services/apiTasklist";

interface Props {
  allTasklists: any[],
  setProfiles: any,
  profiles: any,
  setAssignedTasks:any,
  assignedTasks:any,
}
{/* ---------------------------------------------------------------------
    Component: mapUserCreatedTabs
    Purpose: Maps the user created tasklists to tabs
    --------------------------------------------------------------------- */}
function mapUserCreatedTabs({ allTasklists, setProfiles, profiles,setAssignedTasks,assignedTasks }: Props) {

  const onNameChange = (id:string, name:string)=>{
    updateTaskListName(id,name)
  }

  const generateSavedTabs = () => {
    if (!allTasklists) {
      return [];
    }
    const tabs = allTasklists.map((tasklist) => ({
      key: tasklist.taskId,
      label: (
        <EditableTabLabel initialName={tasklist.listName} taskId={tasklist.taskId} onNameChange={onNameChange}></EditableTabLabel> //So user can change name
      ),
      closable: true,
      children: (
        <AssignedTasklist
          setAssignedTasks={setAssignedTasks}
          assignedTasks={assignedTasks}
          setProfiles={setProfiles}
          profiles={profiles}
          tasklistId={tasklist.taskId} 
        />
      ),
    }));
    return tabs;
  };

  return generateSavedTabs();
}

export default mapUserCreatedTabs;