import { Button } from "antd";
import "../../../src/styles/schema/note.css";
import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import React, { useState } from 'react';
import AddSchema from "./AddSchema";
interface props {
  title: any;
  list: any[];
  tasklist:any[];
}


function TaskNote({ title, list, tasklist }:props) {
    const [expanded, setExpanded] = useState(false);

    const toggleCollapse = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="note_box">
            <h2 className="note_title">
                {title}
                <AddSchema className={"add_schema_button"} tasklists={tasklist}></AddSchema>
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
                            <span className="task_number">{index + 1}.</span> {item.name} <Button className="button_remove_task" danger>Fjern</Button>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}

export default TaskNote;
