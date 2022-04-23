import { useState } from "react";
import Task from "./Task";

function ToDo() {
    const [tasks, setTasks] = useState(Array.from(Array(5).keys()).map((i) => <Task key={i} id={i}/>));
    console.log(tasks);

    const addTask = () => {
        const takenKeys = Object.keys(localStorage);
        if (takenKeys.length === 101) {
            alert("max");
        }

        let i = Math.floor(Math.random() * 101);
        while (takenKeys.includes(JSON.stringify(i))) {
            i = Math.floor(Math.random() * 101);
        }

        setTasks(() => {
            return [...tasks, <Task key={i} id={i}/>];
        })
    };

    return (
        <div className="ToDo">
            {tasks}
            <button onClick={addTask}>Add a new task</button>
        </div>
    );
}

export default ToDo;