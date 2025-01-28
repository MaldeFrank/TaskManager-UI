import type { FC } from 'react';
import AssignedTasklist from "./tabs/AssignedTasklist"

interface Props {
  allTasklists: any[],
  setProfiles: any,
  profiles: any,
}

function mapUserCreatedTabs({ allTasklists, setProfiles, profiles}: Props) {
  const generateSavedTabs = () => {
    const tabs = allTasklists.map((tasklist) => ({
      key: "4",
      label: tasklist.listName,
      closable: true,
      children: (
        <AssignedTasklist
          setProfiles={setProfiles}
          profiles={profiles}
          tasklistId={tasklist.id}
        />
      ),
    }));
    return tabs;
  };

  return generateSavedTabs(); 
}

export default mapUserCreatedTabs;