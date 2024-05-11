import { formatDate } from "./TasksList";

const ModalTaskForm = ({
    task,
    onSubmit,
    onCancel,
    updatedTask,
    handleInputChange,
    filteredUsers,
    priorityOptions,
    statusOptions,
    isUpdateForm,
    userData
}) => {
    const isCreator = userData.id === updatedTask.creator;
    const isAssignee = userData.id === updatedTask.assignee;

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">
                {isUpdateForm ? updatedTask.title : "Новая задача"}
            </h2>
            {isUpdateForm && (
                <>
                    <p className="text-gray-500 text-base">
                        Создана:{" "}
                        <span className="text-black text-base">
                            {formatDate(updatedTask.created_at)}
                        </span>
                    </p>
                    <p className="text-gray-500 text-base">
                        Создатель:{" "}
                        <span className="text-black text-base">
                            {task.creator_name}
                        </span>
                    </p>
                </>
            )}

            <form onSubmit={onSubmit} className="space-y-2">
                {!isUpdateForm && (
                    <div className="">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Заголовок:
                        </label>
                        <textarea
                            id="title"
                            name="title"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={updatedTask.title}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>   
                )}
                
                <div className="">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Описание:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={updatedTask.description}
                        onChange={handleInputChange}
                        required
                        disabled={!isCreator}
                    ></textarea>
                </div>
                <div className="">
                    <label
                        htmlFor="due_date"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Дата окончания:
                    </label>
                    <input
                        id="due_date"
                        name="due_date"
                        type="datetime-local"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={updatedTask.due_date}
                        onChange={handleInputChange}
                        disabled={!isCreator}
                    />
                </div>
                <div className="">
                    <label
                        htmlFor="assignee"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Ответственный: <span className="text-black text-base">{task.assignee_name}</span>
                    </label>
                    <select
                        id="assignee"
                        name="assignee"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={
                            filteredUsers.find(
                                (user) => user.id === updatedTask.assignee
                            )?.fullname || ""
                        }
                        onChange={handleInputChange}
                        disabled={!isCreator}
                    >
                        {filteredUsers.map((user) => (
                            <option key={user.id} value={user.fullname}>
                                {user.fullname}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="">
                    <label
                        htmlFor="priority"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Приоритет:
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={updatedTask.priority}
                        onChange={handleInputChange}
                        disabled={!isCreator}
                    >
                        {priorityOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="">
                    <label
                        htmlFor="status"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Статус:
                    </label>
                    <select
                        id="status"
                        name="status"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={updatedTask.status}
                        onChange={handleInputChange}
                        disabled={!isAssignee && !isCreator}
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"
                        disabled={!isAssignee && !isCreator}
                    >
                        Сохранить
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        onClick={onCancel}
                    >
                        Закрыть
                    </button>
                </div>
            </form>
        </>
    );
};

export default ModalTaskForm;
