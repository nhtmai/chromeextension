import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

function Task(props) {
    const [task, setTask] = useLocalStorage(props.id, {"check": false, "name": ""});

    const handleCheck = e => {
        setTask(prevState => ({
            ...prevState,
            "check": e.target.checked,
        }));
    };

    const handleText = e => {
        setTask(prevState => ({
            ...prevState,
            "name": e.target.value,
        }));
    };

    return (
        <div className="Task">
            <input
            type="checkbox"
            checked={task.check}
            onChange={handleCheck}
            name="check"></input>
            <input
            type="text"
            value={task.name}
            onChange={handleText}
            name="name"></input>
        </div>
    );
}

export default Task;