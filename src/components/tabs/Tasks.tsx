import { useGetAllTasks } from "../../services/queries";
import { Task } from "../../model/Task";
import TaskItem from "../TaskItem";

function Tasks() {
  const { data, isLoading, isError, error } = useGetAllTasks();

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.map((task: Task) => (
        <TaskItem {...task} />
      ))}
    </div>
  );
}

export default Tasks;