import { useContext } from "react";
import { Auth } from "../context/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInYup } from "../context/validation";

const defaultValues = {
    login: "",
    password: ""
}

const SignIn = () => {
    const {handleSignIn, error} = useContext(Auth);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues,
        resolver: yupResolver(signInYup),
    });

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Kosmos
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
                        <div>
                            <label
                                htmlFor="login"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Логин
                            </label>
                            <div className="mt-2">
                                <input
                                    id="login"
                                    name="login"
                                    type="text"
                                    {...register("login")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {(errors?.login) && (
                                    <p className="errors">{errors?.login?.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Пароль
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    {...register("password")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {(errors?.password) && (
                                    <p className="errors">{errors?.password?.message}</p>
                                )}
                            </div>
                        </div>

                        {(error) && (
                            <p className="error">{error?.error}</p>
                        )}
                            

                        <div>
                            <button
                                id="submit"
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignIn;
