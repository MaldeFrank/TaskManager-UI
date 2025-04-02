import { List } from "antd";
import { Schedule as ScheduleType } from "../../model/Schedule";
import Schedule from "./Schedule";
import "../../../src/styles/schema/ScheduleList.css";

interface props {
  schedulelist: ScheduleType[];
  removeTask: () => void;
  tasklists: any[];
}

function ScheduleList({ schedulelist, removeTask, tasklists }: props) {
  return (
    <>
      <List
        className="schedule_list"
        itemLayout="vertical"
        grid={{ gutter: 0, column: 1 }}
        dataSource={schedulelist}
        renderItem={(schedule) => (
          <List.Item key={schedule.id} className="schedule_list_item">
            <Schedule tasklists={tasklists} schedule={schedule} removeTask={removeTask} />
          </List.Item>
        )}
      />
    </>
  );
}

export default ScheduleList;