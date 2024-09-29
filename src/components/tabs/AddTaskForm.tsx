import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { postTask } from "../../services/api";
import { Task, TaskDto } from "../../model/Task";

interface props{
setTasks:any
}

export default function AddTaskForm({setTasks}:props) {
  type FieldType = {
    title: string;
    description: string;
    points: number;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    const task: TaskDto = {
      title: values.title,
      description: values.description,
      points: values.points,
    };

    const response = await postTask(task);
    setTasks((prevTasks:any) => [...prevTasks, response.data]);
};

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Titel"
        name="title"
        rules={[{ required: true, message: "Giv en titel til opgaven" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Beskrivelse"
        name="description"
        rules={[{ required: true, message: "Beskriv opgaven" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Points"
        name="points"
        rules={[{ required: true, message: "Tildel opgaven points"}]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
