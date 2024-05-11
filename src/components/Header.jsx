import { useContext } from "react";
import rocket from "../assets/rocket.svg";
import { Auth } from "../context/Auth";

const Header = ({userData, users}) => {
    const {handleLogOut} = useContext(Auth);

    const findDirectorName = () => {
        if (userData.directorId && users.length > 0) {
            const director = users.find(user => user.id === userData.directorId);
            if (director) {
                return "Руководитель: " + director.fullname; 
            }
        }
        return "Руководитель";
    };

    return (
        <header className="bg-white">
            <div className="shadow-lg p-3 flex items-center">
                <img className="w-12" src={rocket} alt="Лого" />
                <div className="px-5">
                    <p className="text-xl font-semibold leading-6 text-gray-900">{userData.lastName} {userData.firstName} {userData.patronymic}</p>
                    <p className="text-sm font-semibold leading-6 text-gray-900">{findDirectorName()}</p>
                </div>
                <div className="lg:flex lg:flex-1 lg:justify-end">
                    <button href="#" onClick={handleLogOut} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <p className="text-xl font-semibold leading-6">Выйти <span aria-hidden="true">&rarr;</span></p>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;