import { Button } from "antd";
import "../../../src/styles/schema/note.css";
import Icon from "@ant-design/icons";
import React, { useState } from 'react';
interface props {
  title: any;
  list: any[];
}



function TaskNote({ title, list }:props) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="note_box">
            <h2 className="note_title">
                {title}
                <Button className="expand_button"
                    shape="circle"
                    icon={<Icon type={isCollapsed ? "up-square" : "down-square"} style={{ color: '#1890ff' }} />} 
                    onClick={toggleCollapse}
                />
            </h2>
            {!isCollapsed && (
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
