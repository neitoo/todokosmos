import { useContext, useEffect, useState } from "react";
import { Auth } from "../context/Auth";

const ModalTask = ({onClose, taskId}) => {
    const { handleProtectUpdateTask, handleProtectTaskById } = useContext(Auth);

    const [updatedTask, setUpdatedTask] = useState({});

    useEffect(() => {
        if (taskId) {
            const fetchTaskData = async () => {
                try {
                    const taskData = await handleProtectTaskById(taskId);
                    setUpdatedTask({
                        id: taskData.id,
                        title:taskData.title,
                        description: taskData.description,
                        created_at: new Date(taskData.created_at).toISOString().slice(0, 16),
                        due_date: new Date(taskData.due_date).toISOString().slice(0, 16),
                        updated_at: new Date(taskData.updated_at).toISOString().slice(0, 16),
                        priority: taskData.priority,
                        status: taskData.status,
                        creator: taskData.creator,
                        assignee: taskData.assignee,
                    });
                } catch (error) {
                    console.error("Ошибка:", error);
                }
            };
            fetchTaskData();
        }
    }, [taskId, handleProtectTaskById]);

    const handleInputChange = (e) => {
        setUpdatedTask({
            ...updatedTask,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleProtectUpdateTask({
            id: taskId,
            description: updatedTask.description,
            due_date: new Date(updatedTask.due_date).toISOString(),
            updated_at: new Date().toISOString(),
            priority: updatedTask.priority,
            status: updatedTask.status,
            assignee: updatedTask.assignee,
        })
        onClose();
    };

    return (
        <div className="flex justify-center items-center fixed inset-0 h-screen w-full bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-10/12 p-6 md:w-1/3 space-y-2">
            {taskId ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">{updatedTask.title}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                                    Описание:
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={updatedTask.description}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="due_date" className="block text-gray-700 font-bold mb-2">
                                    Дата окончания:
                                </label>
                                <input
                                    id="due_date"
                                    name="due_date"
                                    type="datetime-local"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={updatedTask.due_date}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    Сохранить
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                                    onClick={onClose}
                                >
                                    Закрыть
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Новая задача</h2>
                        {/* Форма для создания новой задачи */}
                    </>
                )}
            </div>
        </div>
    );
}

export default ModalTask;