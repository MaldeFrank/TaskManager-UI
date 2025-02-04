import { Radio, RadioChangeEvent } from "antd";

interface props {
  setTaskFilter: any;
  taskFilter:any;
}

function TaskFetchOptions({ setTaskFilter,taskFilter }: props) {

  const onClick = (e: RadioChangeEvent) => {
    setTaskFilter(e.target.value);
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
