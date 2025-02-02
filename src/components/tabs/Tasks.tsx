import { useEffect, useState } from "react";
import { useGetAllAccTasks, useGetAllTasks } from "../../services/queries";
import { Button, Space, Table, Form, Input, InputNumber } from "antd";
import { Task } from "../../model/Task";
import { useDeleteTask, usePutTask } from "../../services/mutations";
import { postAssignTask, postAssignTaskNoTasklist } from "../../services/apiAssignedTasks";
import { EditableCellProps } from "../../types/Cells";
import { postTask } from "../../services/apiTasks";
import AddTask from "../AddTask";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tasks: Task[];
  setAssignedTasksWeekly: any;
  tasklists:any[];
}


const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function Tasks({ setTasks, tasks, setAssignedTasksWeekly, tasklists }: Props) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number>(-1);
  const { data, isLoading, isError, error } = useGetAllAccTasks(localStorage.getItem("user_id"));
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = usePutTask();

  const isEditing = (record: Task) => record.id === editingKey;

  const edit = (record: Task) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(-1);
  };

  const save = async (id: number) => {
    try {
      const row = await form.validateFields();
      const updatedTask = { ...row, id };
      updateTask(updatedTask);
      setTasks((prevTasks: Task[]) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
      setEditingKey(-1);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const createNewTask = async () => {
    const userId = localStorage.getItem("user_id");

    if(userId === null) {
      console.error("User not logged in");
      return;
    }

    const newTask: any = {
      title: "Edit",
      description: "Edit",
      points: 0,
      googleId: userId,
    };
  
    const createdTask = await postTask(userId,newTask);
    console.log("Created task", createdTask);
    setTasks((prev: Task[]) => {
      return [...prev, createdTask];
    });
  };

  const deleteTaskFunction = (id: number) => {
    deleteTask(id);
    setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.id !== id));
  };

  const postAssignedTaskFunction = async (task:any) => {

    const assignedTask: any = {
      assignedTo: 0,
      completed: false,
      task: task,
      userId: localStorage.getItem("user_id") //Maybe get rid of userId, since there is now google account
    };
    console.log("AssignedTask is now set and state has been updated")
    const response = await postAssignTaskNoTasklist(assignedTask);
    setAssignedTasksWeekly((prevAssignedTask: any) => [...prevAssignedTask, response.data]);
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
                <Button onClick={() => save(record.id)} type="primary">
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
      <Button type="primary" onClick={createNewTask}>Tilføj opgave</Button>
    </Form>
  );
}

export default Tasks;