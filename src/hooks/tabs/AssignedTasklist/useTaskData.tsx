import { useEffect, useState } from "react";
import {
  useGetAssignedTasksByTasklistMonthly,
  useGetAssignedTasksByTasklistWeekly,
} from "../../../services/queries";
import { useAppDispatch } from "../../app/storeHook";
import { setTasklist } from "../../../redux/slicers/tasklistSlicer";
import {
  getAssignedTaskMonthly,
  getAssignedTasks,
  getAssignedTaskWeekly,
} from "../../../services/apiTasklist";

export const useTaskData = (tasklistId: number, taskFilter: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTasks = await getAssignedTasks(tasklistId);
        switch (taskFilter) {
          case "All":
            if (allTasks)
              dispatch(
                setTasklist({
                  id: tasklistId,
                  tasklist: allTasks,
                })
              );
            break;
          case "Weekly":
            const weeklyTasks = await getAssignedTaskWeekly(tasklistId);
            if (weeklyTasks) dispatch(setTasklist(weeklyTasks));
            break;
          case "Monthly":
            const monthlyTasks = await getAssignedTaskMonthly(tasklistId);
            if (monthlyTasks) dispatch(setTasklist(monthlyTasks));
            break;
          default:
            if (allTasks) dispatch(setTasklist(allTasks));
            break;
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [tasklistId, taskFilter, dispatch]);
};
