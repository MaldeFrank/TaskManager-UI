import { Button } from "antd";
import "../../../src/styles/schema/Schedule.css";
import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import React, { useState } from 'react';
import AddSchedule from "./AddSchedule";
interface props {
  title: any;
  list: any[];
  tasklist:any[];
  removeTask:()=>void;
}

function TaskNote({ title, list, tasklist,removeTask }:props) {
    const [expanded, setExpanded] = useState(false);

    const toggleCollapse = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="note_box">
            <h2 className="note_title">
                {title}
                <AddSchedule className={"add_schema_button"} tasklists={tasklist}></AddSchedule>
                <Button className="expand_button"
                    type="primary"
                    shape="circle"
                    icon={expanded?<UpCircleOutlined/>:<DownCircleOutlined/>} 
                    onClick={toggleCollapse}
                />
            </h2>
            {expanded && (
                <div className="note_tasks">
                    <ol>
                        {list.map((item, index) => (
                            <li className="task_item" key={index}>
                            <span className="task_number">{index + 1}.</span> {item.name} <Button onClick={removeTask} className="button_remove_task" danger>Fjern</Button>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}

export default TaskNote;
