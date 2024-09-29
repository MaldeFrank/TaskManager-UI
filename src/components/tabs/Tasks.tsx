import { useEffect } from "react";
import { useGetAllTasks } from "../../services/queries";
import { Button, Space, Table } from "antd";
import { Task } from "../../model/Task";
import { useDeleteTask } from "../../services/mutations";

interface props {
  setTasks: any;
  tasks: Task[];
}

function Tasks({ setTasks, tasks }: props) {
  const { data, isLoading, isError, error } = useGetAllTasks();
  const {mutate:deleteTask} = useDeleteTask();

  const deleteTaskFunction = (id: number) =>{
   deleteTask(id)
   setTasks((prevTasks:Task[]) => prevTasks.filter((task) => task.id !== id));
  }

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const columns = [
    {
      title: "Titel",
      dataIndex: "title",
    },
    {
      title: "Beskrivelse",
      dataIndex: "description",
    },
    {
      title: "Points",
      dataIndex: "points",
    },
    {
      title: "Handlinger",
      render: (record:Task) => (
        <div>
          <Space>
            <Button danger onClick={()=>deleteTaskFunction(record.id)}>Slet</Button>
            <Button type="primary">Tilføj til ugen</Button>
          </Space>
        </div>
      ),
    },
  ];

  return <Table dataSource={tasks} columns={columns} />;
}

export default Tasks;
