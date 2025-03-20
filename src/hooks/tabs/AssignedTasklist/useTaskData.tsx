import { useState, useEffect } from 'react';
import { useGetAssignedTasksByTasklistMonthly, useGetAssignedTasksByTasklistWeekly, useGetAssingedTasks } from '../../../services/queries';
{/* ---------------------------------------------------------------------
    Hook: AssignedTasklist
    Purpose: Fetches AssignedTasks based on taskfilter.
    --------------------------------------------------------------------- */}
export const useTaskData = (tasklistId: number, taskFilter: string, setAssignedTasks:any, assignedTasks:any) => {
  const { data: allTasks, refetch: refetchAll } = useGetAssingedTasks(tasklistId);
  const { data: weeklyTasks, refetch: refetchWeekly } = useGetAssignedTasksByTasklistWeekly(tasklistId);
  const { data: monthlyTasks, refetch: refetchMonthly } = useGetAssignedTasksByTasklistMonthly(tasklistId);
  const [shownData, setShownData] = useState<any[]>([]);

  useEffect(() => {
    switch (taskFilter) {
      case 'All':
        refetchAll();
        setShownData(allTasks || []);
        break;
      case 'Weekly':
        refetchWeekly();
        setShownData(weeklyTasks || []);
        break;
      case 'Monthly':
        refetchMonthly();
        setShownData(monthlyTasks || []);
        break;
      default:
        refetchAll();
        setShownData(allTasks || []);
        break;
    }
  }, [taskFilter, allTasks, weeklyTasks, monthlyTasks, refetchAll, refetchWeekly, refetchMonthly,setAssignedTasks,assignedTasks]);

  return [shownData, setShownData];
};