import { useContext, useEffect, useState } from "react";
import { Auth } from "../context/Auth";
import ModalTaskForm from "./ModalTaskForm";

const ModalTask = ({onClose, task, users, onTaskUpdate}) => {
    const { handleProtectUpdateTask, handleProtectTaskById, userData, handleProtectCreateTask } = useContext(Auth);

    const [updatedTask, setUpdatedTask] = useState({});

    const filteredUsers = users.filter(user => user.director_id === userData.id || user.id === userData.id);

    const priorityOptions = [
        { value: 1, label: 'Высокий' },
        { value: 2, label: 'Средний' },
        { value: 3, label: 'Низкий' },
    ];

    const statusOptions = [
        { value: 1, label: 'К выполнению' },
        { value: 2, label: 'Выполняется' },
        { value: 3, label: 'Выполнена' },
        { value: 4, label: 'Отменена' },
    ];

    useEffect(() => {
        if (task.id) {
            const fetchTaskData = async () => {
                try {
                    const taskData = await handleProtectTaskById(task.id);
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
        } else {
            setUpdatedTask({
                id: null,
                title: "",
                description: "",
                created_at: new Date().toISOString().slice(0, 16),
                due_date: new Date().toISOString().slice(0, 16),
                updated_at: new Date().toISOString().slice(0, 16),
                priority: 1,
                status: 1,
                creator: userData.id,
                assignee: filteredUsers[0].id,
            });
        }
    }, [task.id, handleProtectTaskById, userData.id]);

    const handleInputChange = (e) => {
        if (e.target.name === 'assignee') {
            const selectedUser = users.find(user => user.fullname === e.target.value);
            setUpdatedTask({
                ...updatedTask,
                [e.target.name]: selectedUser.id,
            });
        } else {
            setUpdatedTask({
                ...updatedTask,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.id) {
            handleProtectCreateTask({
                title: updatedTask.title,
                description: updatedTask.description,
                due_date: new Date(updatedTask.due_date).toISOString(),
                priority: updatedTask.priority,
                status: updatedTask.status,
                assignee: updatedTask.assignee,
                creator: userData.id,
            })
            .then(() => {
                return onTaskUpdate();
            })
            .then(() => {
                onClose();
            })
            .catch((error) => {
                console.error("Ошибка:", error);
            });
        } else {
            handleProtectUpdateTask({
                id: task.id,
                description: updatedTask.description,
                due_date: new Date(updatedTask.due_date).toISOString(),
                updated_at: new Date().toISOString(),
                priority: updatedTask.priority,
                status: updatedTask.status,
                assignee: updatedTask.assignee
            })
            .then(() => {
                return onTaskUpdate();
            })
            .then(() => {
                onClose();
            })
            .catch((error) => {
                console.error("Ошибка:", error);
            });
        }
    };

    

    return (
        <div className="flex justify-center items-center fixed inset-0 h-screen w-full bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-10/12 p-6 md:w-1/3 space-y-2">
            {task.id ? (
                    <>
                        <ModalTaskForm 
                            task={task} 
                            onSubmit={handleSubmit} 
                            onCancel={onClose}
                            updatedTask={updatedTask}
                            handleInputChange={handleInputChange}
                            filteredUsers={filteredUsers}
                            priorityOptions={priorityOptions}
                            statusOptions={statusOptions}
                            isUpdateForm={true}
                            userData={userData}/>
                    </> 
                ) : (
                    <>
                        <ModalTaskForm 
                            task={task} 
                            onSubmit={handleSubmit} 
                            onCancel={onClose}
                            updatedTask={updatedTask}
                            handleInputChange={handleInputChange}
                            filteredUsers={filteredUsers}
                            priorityOptions={priorityOptions}
                            statusOptions={statusOptions}
                            isUpdateForm={false}
                            userData={userData}/>
                    </>
                )}
            </div>
        </div>
    );
}

export default ModalTask;