"use client";
import { Todo } from "@prisma/client";
import { startTransition, useOptimistic } from "react";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";
import { ToggledTodo } from "../helpers";
import styles from "./TodoItem.module.css";

interface TodoProps {
    todo: Todo;
    toggleTodo: (id: string) => Promise<ToggledTodo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: TodoProps) => {
    const [optimisticTodo, toggleOptimisticTodo] = useOptimistic(todo, (state) => ({
        ...state,
        completed: !state.completed,
    }));

    const onToggleTodo = async () => {
        startTransition(() => toggleOptimisticTodo(optimisticTodo));
        await toggleTodo(optimisticTodo.id);
    };

    return (
        <div className={optimisticTodo.completed ? styles.todoDone : styles.todoPending}>
            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                <div
                    onClick={onToggleTodo}
                    className={`
                    flex p-2 rounded-md cursor-pointer
                    hover:bg-opacity-60
                    ${optimisticTodo.completed ? "bg-blue-100" : "bg-red-100"}
                `}
                >
                    {optimisticTodo.completed ? <IoCheckbox size={24} /> : <IoSquareOutline size={24} />}
                </div>

                <div className="text-center sm:text-left">{optimisticTodo.description}</div>
            </div>
        </div>
    );
};
