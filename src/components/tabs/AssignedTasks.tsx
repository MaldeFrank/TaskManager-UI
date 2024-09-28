import { useEffect } from "react";
import { useGetAllAssignedTasks } from "../../services/queries";
import { Table } from "antd";
import { AssignedTask } from "../../model/Task";

interface props{
  setAssignedTasks:any,
  assignedTasks:AssignedTask[]
}

function AssignedTasks({
  setAssignedTasks,
  assignedTasks
}:props) {
  const { data, isLoading, isError, error } = useGetAllAssignedTasks();

  useEffect(() => {
    if (data) {
      setAssignedTasks(data);
    }
  }, [data, setAssignedTasks]);

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
    {
      title: 'Tildelt',
      dataIndex: 'assignedTo',
    },
    {
      title: 'Oprettet',
      dataIndex: 'date',
    },
    {
      title: 'Udført',
      dataIndex: 'completed',
    },
    
  ];

  return (
    <Table  dataSource={assignedTasks} columns={columns}/>
  );
}

export default AssignedTasks;