import { Radio, RadioChangeEvent } from "antd";
import { setPeriodFilter } from "../services/apiTasklist";

interface props {
  setTaskFilter: any;
  taskFilter:any;
  tasklistId:any;
}
{/* ---------------------------------------------------------------------
    Component: TaskFetchOptions
    Purpose: Displays a set of options for the user, that affects fetching of AsignedTasks.
    --------------------------------------------------------------------- */}
function TaskFetchOptions({ setTaskFilter,taskFilter,tasklistId }: props) {

  const onClick = (e: RadioChangeEvent) => {
    setTaskFilter(e.target.value);
    console.log("taskfilter in onClick: ",taskFilter)
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
