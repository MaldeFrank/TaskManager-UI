import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { postTask } from "../../services/api";
import { Task } from "../../model/Task";
export default function AddTaskForm() {
  type FieldType = {
    title: string;
    description: string;
    points: number;
    assignedTo: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);

    const task: Task = {
      title: values.title,
      description: values.description,
      points: values.points,
      id: 0,
    };

    postTask(task);

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
        label="Tildelt"
        name="assignedTo"
        rules={[{ required: true, message: "Tildel opgaven til en person" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Points"
        name="points"
        rules={[{ required: true, message: "Tildel opgaven points" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
