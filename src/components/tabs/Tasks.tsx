import { useEffect } from "react";
import { useGetAllAssignedTasks, useGetAllTasks } from "../../services/queries";
import { Table } from "antd";
import { Task } from "../../model/Task";

interface props{
  setTasks:any,
  tasks:Task[]
}

function Tasks({
  setTasks,
  tasks
}:props) {
  const { data, isLoading, isError, error } = useGetAllTasks();

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
      title: 'Titel',
      dataIndex: 'title',
    },
    {
      title: 'Beskrivelse',
      dataIndex: 'description',
    },
    {
      title: 'Points',
      dataIndex: 'points',
    }, 
  ];

  return (
    <Table  dataSource={tasks} columns={columns}/>
  );
}

export default Tasks;