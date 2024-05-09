import { useContext, useEffect, useState } from "react";
import { Auth } from "../context/Auth";

const TasksList = () => {
    const { handleProtectTasks } = useContext(Auth);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = () => {
            handleProtectTasks()
                .then((tasksList) => {
                    console.log(tasksList);
                    setTasks(tasksList);
                })
                .catch((error) => {
                    console.error("Error fetching tasks:", error);
                });
        };

        fetchTasks();
    }, [handleProtectTasks]);
    

    return (
        <div className="flex min-h-full flex-1 flex-col content-center justify-center px-6 py-12 lg:px-8 ">
            <div className="w-3/4 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Задачи
                    </h2>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="bg-white shadow-lg rounded-2xl">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>{task.due_date ? task.due_date : "Не окончена"}</p>
                            <p>{task.priority}</p>
                            <p>{task.status_name}</p>
                            <p>{task.creator_name}</p>
                            <p>{task.assignee_name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TasksList;