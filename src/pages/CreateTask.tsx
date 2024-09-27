import React, { useState, FormEvent } from "react";
import { Task } from "../model/Task";
import { useCreateTask } from "../services/mutations";

function CreateTask() {
    const createTaskMutation = useCreateTask();
    const [task, setTask] = useState<Task>({
        title: '',
        description: '',
        points: 0
    });
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: name === 'points' ? Number(value) : value
        } as Task));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (task) {
           createTaskMutation.mutate(task)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Task name:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={task?.title || ''}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Task description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={task?.description || ''}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="points">Task points:</label>
                <input
                    type="number"
                    id="points"
                    name="points"
                    value={task?.points || ''}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Create Task</button>
            </form>
        </div>
    );
}

export default CreateTask;