"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as todosApi from "@/todos/helpers";
import { useRouter } from "next/navigation";

export const NewTodo = () => {
    const [description, setDescription] = useState("");

    const router = useRouter();
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const todo = await todosApi.createTodo(description);

        if (todo) {
            router.refresh();
            setDescription("");
        }
    };

    return (
        <div className="w-full px-3 mx-5 mb-5">
            <form className="flex w-full" onSubmit={onSubmit}>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
                    placeholder="¿Qué necesita ser hecho?"
                />

                <button
                    type="submit"
                    disabled={description.trim() === ""}
                    className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all disabled:opacity-50"
                >
                    Crear
                </button>

                <span className="flex flex-1"></span>

                <button
                    //TODO: onClick={ () => deleteCompleted() }
                    type="button"
                    className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
                >
                    <IoTrashOutline />
                    Delete
                </button>
            </form>
        </div>
    );
};