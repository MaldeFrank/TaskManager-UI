import { message } from "antd";
import { updateAssignTask } from "../../services/apiAssignedTasks";
import { addPoints, deletePointScoreByName } from "../../services/apiPointScore";
import { addAssTask } from "../../redux/slicers/tasklistSlicer";
import { addTask } from "../../redux/slicers/myTasksSlicer";
import { addProfile } from "../../redux/slicers/profilelistSlicer";
import { AssignedTask } from "../../model/AssignedTask";
import { Profile } from "../../model/Profile";

// Switches the completion state of a task and updates related state
export const switchTaskState = (
  task: AssignedTask,
  dispatch: any,
  profiles: Profile[]
) => {
  // Ensure task has an assigned profile
  if (!task.assignedTo) {
    message.warning("Opgave er ikke tildelt");
    return;
  }

  // Find the assigned profile
  const assignedProfile = profiles.find((profile) => profile.id === task.assignedTo.id);
  if (!assignedProfile) {
    console.error("Assigned profile not found");
    return;
  }

  // Toggle task completion state
  const updatedTask: AssignedTask = {
    ...task,
    completed: !task.completed,
  };

  // Update user's personal task list if the task is assigned to them
  const currentProfileId = Number(localStorage.getItem("profile_id"));
  if (updatedTask.assignedTo.id === currentProfileId) {
    dispatch(addTask(updatedTask));
  }

  // Calculate new points based on completion state
  const taskPoints = task.task.points;
  const newPoints = updatedTask.completed
    ? assignedProfile.points + taskPoints
    : assignedProfile.points - taskPoints;

  // Update points in the backend
  if (updatedTask.completed) {
    addPoints(
      assignedProfile.id,
      taskPoints,
      task.task.title,
      task.tasklistId
    );
  } else {
    deletePointScoreByName(task.task.title, task.tasklistId, assignedProfile.id);
  }

  // Dispatch state updates
  dispatch(addAssTask(updatedTask));
  dispatch(
    addProfile({
      ...assignedProfile,
      points: newPoints,
    })
  );

  // Update task in the backend
  updateAssignTask(updatedTask);
};