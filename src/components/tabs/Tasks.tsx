import { useEffect } from "react";
import { useGetAllTasks } from "../../services/queries";
import { Button, Space, Table } from "antd";
import { AssignedTask, AssignedTaskDto, Task } from "../../model/Task";
import { useCreateAssignTask, useDeleteTask } from "../../services/mutations";
import AssignedTasks from "./AssignedTasks";
import { User } from "../../model/Profile";
import { postAssignTask } from "../../services/apiAssignedTasks";

interface props {
  setTasks: any;
  tasks: Task[];
  setAssignedTasks: any
}

function Tasks({ setTasks, tasks, setAssignedTasks }: props) {
  const { data, isLoading, isError, error } = useGetAllTasks();
  const { mutate: deleteTask } = useDeleteTask();

  const deleteTaskFunction = (id: number) => {
    deleteTask(id);
    setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.id !== id));
  };

  const postAssignedTaskFunction = async (task:Task) =>{
    const emptyUser:User = {
      id:0,
      name:"",
      points:0
    }
   const assingedTaskDto:AssignedTaskDto = {
    assignedTo:emptyUser,
    completed:false,
    task: task
   }

   const response = await postAssignTask(assingedTaskDto)
   setAssignedTasks((prevAssignedTask:any)=> [...prevAssignedTask,response.data])
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
      render: (record: Task) => (
        <div>
          <Space>
            <Button danger onClick={() => deleteTaskFunction(record.id)}>
              Slet
            </Button>
            <Button type="primary" onClick={()=> postAssignedTaskFunction(record)}>Tilføj til ugen</Button>
          </Space>
        </div>
      ),
    },
  ];

  return <Table dataSource={tasks} columns={columns} />;
}

export default Tasks;
