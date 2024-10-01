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
  const switchTaskState = (record: AssignedTask) => {
    setAssignedTasks((prev: AssignedTask[]) =>
      prev.map((task) => {
        if (task.id === record.id) {
          task.completed = !task.completed;
          return task;
        } else {
          return task;
        }
      })
    );
  };

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
    },
    {
      title: 'Udført',
      dataIndex: 'completed',
      render: (_:any, record:AssignedTask) => (
         <Switch 
         style={{backgroundColor:record.completed?"green":"red"}}
         onClick={()=>switchTaskState(record)}
         />
      ),
    },
  ];

  return (
    <Table  dataSource={assignedTasks} columns={columns}/>
  );
}

export default AssignedTasks;