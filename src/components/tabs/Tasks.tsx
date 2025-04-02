import { useEffect, useState } from "react";
import { Button, Space, Table, Form, List } from "antd";
import { Task } from "../../model/Task";
import { useDeleteTask } from "../../services/mutations";
import AddTask from "../AddTask";
import EditableCell from "../EditableCell";
import { save } from "../../util/tasks/save";
import { createNewTask } from "../../util/tasks/createNewTask";
import { useAppDispatch, useAppSelector } from "../../hooks/app/storeHook";
import { getAllAccTasks } from "../../services/apiGoogleAccount";
import { removeTask, setTasklist } from "../../redux/slicers/taskSlicer";
import Schedule from "../Schedule/Schedule";
import ScheduleList from "../Schedule/ScheduleList";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tasks: Task[];
  tasklists: any[];
}
{
  /* ---------------------------------------------------------------------
    Component: Tasks
    Purpose: Show all tasks in a table, and allow the user to edit, delete and create new tasks
    --------------------------------------------------------------------- */
}
function Tasks({ tasklists }: Props) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number>(-1);
  const { mutate: deleteTask } = useDeleteTask();

  const tasklistState = useAppSelector((state) => state.tasklist.list);
  const dispatch = useAppDispatch();

  const isEditing = (record: Task) => record.id === editingKey;

  const edit = (record: Task) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(-1);
  };

  async function setList() {
    //Function to set tasklist
    const response = await getAllAccTasks(localStorage.getItem("user_id"));
    dispatch(setTasklist(response));
  }

  const deleteTaskFunction = (id: number) => {
    deleteTask(id);
    dispatch(removeTask(id));
  };

  useEffect(() => {
    setList();
  }, []);

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
      inputType: "number",
    },
    {
      title: "Handlinger",
      render: (_: any, record: Task) => {
        const editable = isEditing(record);
        return (
          <Space>
            {editable ? (
              <>
                <Button
                  onClick={() => save(record, dispatch, setEditingKey, form)}
                  type="primary"
                >
                  Gem
                </Button>
                <Button onClick={cancel}>Annuller</Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => edit(record)}
                  disabled={editingKey !== -1}
                >
                  Rediger
                </Button>
                <Button danger onClick={() => deleteTaskFunction(record.id)}>
                  Slet
                </Button>
                <AddTask
                  tasklists={tasklists}
                  task={record}
                  dispatch={dispatch}
                />
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
        inputType: col.dataIndex === "points" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="tasks-container"> {/* Flex container */}
      <div className="table-container"> {/* Table and button container */}
        <h1>Opgaver</h1>
        <Form form={form} component={false}>
          <>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              dataSource={tasklistState}
              columns={mergedColumns}
              rowClassName="editable-row"
              scroll={{ y: 400, x:1000}}
              pagination={false}
            />
            <Button
              type="primary"
              onClick={() => createNewTask(dispatch, setEditingKey, form)}
            >
              Tilføj opgave
            </Button>
          </>
        </Form>
      </div>
      <div className="schedule-list-container"> {/* ScheduleList container */}
        <h1>Skemaer</h1>
        <ScheduleList
          tasklists={[]}
          removeTask={() => console.log("Remove task")}
          schedulelist={[
            {
              id: 1,
              title: "Rengøring",
              tasks: [{ title: "Støvsuge" }, { title: "Støvsuge" }, { title: "Støvsuge" }],
            },
            {
              id: 1,
              title: "Rengøring",
              tasks: [{ title: "Støvsuge" }, { title: "Støvsuge" }, { title: "Støvsuge" }],
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Tasks;
