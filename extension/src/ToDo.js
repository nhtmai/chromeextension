import { useState, useEffect } from "react";
import Task from "./Task";

function ToDo() {
    const order = localStorage.getItem("taskOrder");
    const orderParse = (order) ? JSON.parse(order) : [];

    const [tasks, setTasks] = useState(() => {
        if (orderParse.length === 0) {
            return Array.from(Array(5).keys()).map((i) => <Task key={i + 1} id={i + 1}/>);
        } else {
            return orderParse.map((i) => <Task key={i} id={i}/>);
        }
    });

    const addTask = () => {
        const takenKeys = Object.keys(localStorage);
        if (takenKeys.length === 101) {
            alert("max");
        }

        let i = 1;
        while (takenKeys.includes(JSON.stringify(i))) {
            i++;
        }

        setTasks(() => { return [...tasks, <Task key={i} id={i}/>]; });
    };

    const removeChecked = () => {
        const newOrder = localStorage.getItem("taskOrder");
        const newParse = (newOrder) ? JSON.parse(newOrder) : [];
        let len = newParse.length;
        let newTasks = [];

        for (let i = 0; i < len; i++) {
            let item = JSON.parse(localStorage.getItem(newParse[i]));
            if(item.check) {
                localStorage.removeItem(newParse[i]);
            } else {
                newTasks = [...newTasks, i];
            }
        }

        setTasks(newTasks.map((i) => {
            let j = newParse[i];
            return <Task key={j} id={j}/>;
        }));
    };

    const removeAll = () => {
        const newOrder = localStorage.getItem("taskOrder");
        const newParse = (newOrder) ? JSON.parse(newOrder) : [];
        let len = newParse.length;

        for (let i = 0; i < len; i++) {
            localStorage.removeItem(newParse[i]);
        }

        setTasks([]);
    };

    useEffect(() => {
        let len = tasks.length;
        for (let i = 0; i < 5 - len; i++) addTask();
        localStorage.setItem(
            "taskOrder",
            JSON.stringify(tasks.map((i) => i.key)));
    }, [tasks]);

    return (
        <div className="ToDo">
            {tasks}
            <button onClick={addTask}>Add a new task</button>
            <button onClick={removeChecked}>Remove checked tasks</button>
            <button onClick={removeAll}>Clear list</button>
        </div>
    );
}

export default ToDo;