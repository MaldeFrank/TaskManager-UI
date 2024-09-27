import { Task } from "../model/Task";

export default function TaskItem(task: Task) {
    return (
        <ul>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>Points: {task.points}</span>
        </ul>
    )
}