import { Button } from "antd";
import "../../../src/styles/schema/Schedule.css";
import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import React, { useState } from 'react';
import AddSchedule from "./AddSchedule";
import { Schedule as scheduleType } from "../../model/Schedule";
interface props {
  schedule:scheduleType;
  removeTask:()=>void;
  tasklists:any;
}

 /* ---------------------------------------------------------------------
    Component: Schedule
    Purpose: Displays a Schedule entity from the backend
    --------------------------------------------------------------------- */
function Schedule({ schedule, removeTask, tasklists }:props) {
    const [expanded, setExpanded] = useState(false);

    const toggleCollapse = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="note_box">
            <h2 className="note_title">
                {schedule.title}
                <AddSchedule className={"add_schema_button"} tasklists={tasklists}></AddSchedule>
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
                        {schedule.tasks.map((item, index) => (
                            <li className="task_item" key={index}>
                            <span className="task_number">{index + 1}.</span> {item.title} <Button onClick={removeTask} className="button_remove_task" danger>Fjern</Button>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}

export default Schedule;
