import { useContext, useEffect, useState } from "react";
import { Auth } from "../context/Auth";
import ModalTask from "./ModalTask";

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // Приводим к UTC
    return utcDate.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const TasksList = ({ users }) => {
    const { handleProtectTasks, userData } = useContext(Auth);
    const [tasks, setTasks] = useState([]);
    const [selectedDueDate, setSelectedDueDate] = useState("all");
    const [selectedAssignee, setSelectedAssignee] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const fetchTasks = () => {
        handleProtectTasks()
            .then((tasksList) => {
                setTasks(tasksList);
            })
            .catch((error) => {
                console.error("Ошибка:", error);
            });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskUpdate = async () => {
        try {
            fetchTasks();
        } catch (error) {
            console.error("Ошибка при обновлении задач:", error);
        }
    };

    const getTitleColor = (task) => {
        const currentDate = new Date();
        const dueDate = new Date(task.due_date);

        if (task.status_name === "Выполнена") {
            return "text-green-500";
        } else if (dueDate < currentDate) {
            return "text-red-500";
        } else {
            return "text-gray-600";
        }
    };

    const handleDueDateChange = (event) => {
        setSelectedDueDate(event.target.value);
    };

    const handleAssigneeChange = (event) => {
        setSelectedAssignee(event.target.value);
    };

    const handleResetFilters = () => {
        setSelectedDueDate("all");
        setSelectedAssignee("all");
    };

    const handleNewTask = () => {
        setSelectedTask({
            id: null,
            title: "",
            due_date: null,
            description: "",
            priority: 3,
            status: 1,
            assignee: null,
            creator: userData.id,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const filteredTasks = tasks
        ? tasks
              .filter((task) => {
                  if (selectedDueDate === "all") {
                      return true;
                  } else if (selectedDueDate === "today") {
                      const dueDate = new Date(task.due_date);
                      const today = new Date();
                      return dueDate.toDateString() === today.toDateString();
                  } else if (selectedDueDate === "week") {
                      const dueDate = new Date(task.due_date);
                      const today = new Date();
                      const weekFromToday = new Date(
                          today.getTime() + 7 * 24 * 60 * 60 * 1000
                      );
                      return dueDate >= today && dueDate <= weekFromToday;
                  } else {
                      const dueDate = new Date(task.due_date);
                      const today = new Date();
                      const weekFromToday = new Date(
                          today.getTime() + 7 * 24 * 60 * 60 * 1000
                      );
                      return dueDate > weekFromToday;
                  }
              })
              .filter((task) => {
                  if (selectedAssignee === "all") {
                      return true;
                  } else {
                      return task.assignee_name === selectedAssignee;
                  }
              })
              .sort((a, b) => {
                  const dateA = new Date(a.updated_at);
                  const dateB = new Date(b.updated_at);
                  return dateB - dateA;
              })
        : [];

    return (
        <div className="flex justify-center">
            {isModalOpen && (
                <ModalTask
                    key={isModalOpen}
                    onClose={handleCloseModal}
                    task={selectedTask}
                    users={users}
                    onTaskUpdate={handleTaskUpdate}
                />
            )}
            <div className="w-3/4 py-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Задачи
                    </h2>
                </div>
                <div className="flex pt-6 flex-col justify-center items-center mb-4 gap-6 container sm:flex-col md:flex-row">
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        value={selectedDueDate}
                        onChange={handleDueDateChange}
                    >
                        <option value="all">Все задачи</option>
                        <option value="today">Задачи на сегодня</option>
                        <option value="week">Задачи на неделю</option>
                        <option value="future">Задачи на будущее</option>
                    </select>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        value={selectedAssignee}
                        onChange={handleAssigneeChange}
                    >
                        <option value="all">Все пользователи</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.fullname}>
                                {user.fullname}
                            </option>
                        ))}
                    </select>
                    <button
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        onClick={handleResetFilters}
                    >
                        Сбросить фильтры
                    </button>
                    <button
                        className="px-4 py-2 bg-indigo-600 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onClick={handleNewTask}
                    >
                        Новая задача
                    </button>
                </div>
                <div className={`container grid gap-4 my-6 ${filteredTasks.length === 0 ? "sm:grid-cols-1 md:grid-cols-1 lg:grid.cols-1" : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white p-3 shadow-lg rounded-xl border-2 border-solid border-gray-100"
                                onClick={() => handleTaskClick(task)}
                            >
                                <h3
                                    className={`${getTitleColor(
                                        task
                                    )} text-lg font-semibold`}
                                >
                                    {task.title}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Приоритет:{" "}
                                    <span className="text-black text-base">
                                        {task.priority_name}
                                    </span>
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Статус:{" "}
                                    <span className="text-black text-base">
                                        {task.status_name}
                                    </span>
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Дата окончания:{" "}
                                    <span className="text-black text-base">
                                        {formatDate(task.due_date)}
                                    </span>
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Ответственный:{" "}
                                    <span className="text-black text-base">
                                        {task.assignee_name}
                                    </span>
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-800 text-xl">
                            Задачи отсутствуют.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TasksList;
