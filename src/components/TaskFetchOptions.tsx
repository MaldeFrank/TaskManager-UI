import { Radio } from "antd";

interface props {
setTaskFilter: any
}

function TaskFetchOptions({setTaskFilter}: props) {

    const onClick=(value:any)=>{
    setTaskFilter(value)
    console.log(value)
    }

  return (
    <Radio.Group value={2} onChange={(e)=>onClick(e.target.value)}>
      <Radio.Button value="Weekly">Ugentligt</Radio.Button>
      <Radio.Button value="Monthly">Månedligt</Radio.Button>
      <Radio.Button value="All">Alle</Radio.Button>
    </Radio.Group>
  );
}

export default TaskFetchOptions;
