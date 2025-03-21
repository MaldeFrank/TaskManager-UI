import { useEffect, useState } from "react";
import { useGetAllAccTasks } from "../../services/queries";
import { Button, Space, Table, Form} from "antd";
import { Task } from "../../model/Task";
import { useDeleteTask, usePutTask } from "../../services/mutations";
import { postTask } from "../../services/apiTasks";
import AddTask from "../AddTask";
import EditableCell from "../EditableCell";
import { save } from "../../util/tasks/save";
import { createNewTask } from "../../util/tasks/createNewTask";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tasks: Task[];
  setAssignedTasksWeekly: any;
  tasklists:any[];
}
{/* ---------------------------------------------------------------------
    Component: Tasks
    Purpose: Show all tasks in a table, and allow the user to edit, delete and create new tasks
    --------------------------------------------------------------------- */}
function Tasks({ setTasks, tasks, setAssignedTasksWeekly, tasklists }: Props) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number>(-1);
  const { data, isLoading, isError, error } = useGetAllAccTasks(localStorage.getItem("user_id"));
  const { mutate: deleteTask } = useDeleteTask();

  const isEditing = (record: Task) => record.id === editingKey;

  const edit = (record: Task) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(-1);
  };


  const deleteTaskFunction = (id: number) => {
    deleteTask(id);
    setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.id !== id));
  };

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
      editable: true,
    },
    {
      title: "Beskrivelse",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "Points",
      dataIndex: "points",
      editable: true,
      inputType: 'number',
    },
    {
      title: "Handlinger",
      render: (_: any, record: Task) => {
        const editable = isEditing(record);
        return (
          <Space>
            {editable ? (
              <>
                <Button onClick={() => save(record,setTasks,setEditingKey,form)} type="primary">
                  Gem
                </Button>
                <Button onClick={cancel}>Annuller</Button>
              </>
            ) : (
              <>
                <Button onClick={() => edit(record)} disabled={editingKey !== -1}>
                  Rediger
                </Button>
                <Button danger onClick={() => deleteTaskFunction(record.id)}>
                  Slet
                </Button>
                <AddTask setAssignedTasks={setAssignedTasksWeekly} tasklists={tasklists} task={record}/>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Task) => ({
        record,
        inputType: col.dataIndex === 'points' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={tasks}
        columns={mergedColumns}
        rowClassName="editable-row"
      />
      <Button type="primary" onClick={()=>createNewTask(setTasks,setEditingKey,form)}>Tilføj opgave</Button>
    </Form>
  );
}

export default Tasks;