import { useEffect } from "react";
import { useGetAllAssignedTasks } from "../../services/queries";
import { Switch, Table } from "antd";
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
      dataIndex: ['task', 'title'],
      key: 'title',
    },
    {
      title: 'Beskrivelse',
      dataIndex: ['task', 'description'],
    },
    {
      title: 'Points',
      dataIndex: ['task', 'points']
    },
    {
      title: 'Tildelt',
      dataIndex: 'assignedTo',
    },
    {
      title: 'Oprettet',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Udført',
      dataIndex: 'completed',
      key: 'completed',
      render: (record:AssignedTask) => (
        <Switch 
        style={{backgroundColor:record.completed?"green":"red"}}
        onClick={}
        />
      )
    },
  ];

  return (
    <Table  dataSource={assignedTasks} columns={columns}/>
  );
}

export default AssignedTasks;