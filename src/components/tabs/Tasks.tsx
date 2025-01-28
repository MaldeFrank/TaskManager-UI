import { useEffect, useState } from "react";
import { useGetAllTasks } from "../../services/queries";
import { Button, Space, Table, Form, Input, InputNumber } from "antd";
import { Task, TaskDto } from "../../model/Task";
import { useDeleteTask, usePutTask } from "../../services/mutations";
import { Profile } from "../../model/Profile";
import { postAssignTask } from "../../services/apiAssignedTasks";
import { AssignedTaskDto } from "../../model/AssignedTask";
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
  const { data, isLoading, isError, error } = useGetAllTasks();
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
    const newTask: any = {
      title: "Edit",
      description: "Edit",
      points: 0,
    };
  
    const createdTask = await postTask(newTask);
  
    setTasks((prev: Task[]) => {
      return [...prev, createdTask];
    });
  };

  const deleteTaskFunction = (id: number) => {
    deleteTask(id);
    setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.id !== id));
  };

  const postAssignedTaskFunction = async (task: Task) => {

    const assignedTaskDto: AssignedTaskDto = {
      assignedTo: 0,
      completed: false,
      task: task,
      userId: localStorage.getItem("user_id")
    };

    const response = await postAssignTask(assignedTaskDto);
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
                <Button type="primary" onClick={() => postAssignedTaskFunction(record)}>
                  Tilføj til ugen
                </Button>
                <AddTask tasklists={tasklists} task={record}/>
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