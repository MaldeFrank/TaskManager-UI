import { useGetAllAssignedTasks } from "../../services/queries";
import { Table } from "antd";

function AssignedTasks() {
  const { data, isLoading, isError, error } = useGetAllAssignedTasks();

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
    <Table  dataSource={data} columns={columns}/>
  );
}

export default AssignedTasks;