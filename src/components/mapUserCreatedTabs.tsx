import type { FC } from 'react';
import AssignedTasklist from "./tabs/AssignedTasklist"

interface Props {
  allTasklists: any[],
  setProfiles: any,
  profiles: any,
  setAssignedTasks:any,
  assignedTasks:any,
}

function mapUserCreatedTabs({ allTasklists, setProfiles, profiles,setAssignedTasks,assignedTasks }: Props) {
  const generateSavedTabs = () => {
    if (!allTasklists) {
      return [];
    }
    const tabs = allTasklists.map((tasklist, index) => ({
      key: tasklist.taskId,
      label: tasklist.listName,
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