import { Radio, RadioChangeEvent } from "antd";
import { setPeriodFilter } from "../services/apiTasklist";

interface props {
  setTaskFilter: any;
  taskFilter:any;
  tasklistId:any;
}

function TaskFetchOptions({ setTaskFilter,taskFilter,tasklistId }: props) {

  const onClick = (e: RadioChangeEvent) => {
    setTaskFilter(e.target.value);
    setPeriodFilter(tasklistId,e.target.value)
  };

  return (
    <>
      <Radio.Group value={taskFilter} onChange={(e) => onClick(e)}>
        <Radio.Button value="Weekly">Ugentligt</Radio.Button>
        <Radio.Button value="Monthly">Månedligt</Radio.Button>
        <Radio.Button value="All">Alle</Radio.Button>
      </Radio.Group>
    </>
  );
}

export default TaskFetchOptions;
