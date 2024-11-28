"use client";
import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";
import { ToggledTodo } from "../helpers";

interface TodoProps {
    todo: Todo;
    toggleTodo: (id: string) => Promise<ToggledTodo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: TodoProps) => {
    return (
        <div className={todo.completed ? styles.todoDone : styles.todoPending}>
            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                <div
                    onClick={() => toggleTodo(todo.id)}
                    className={`
                    flex p-2 rounded-md cursor-pointer
                    hover:bg-opacity-60
                    ${todo.completed ? "bg-blue-100" : "bg-red-100"}
                `}
                >
                    {todo.completed ? <IoCheckbox size={24} /> : <IoSquareOutline size={24} />}
                </div>

                <div className="text-center sm:text-left">{todo.description}</div>
            </div>
        </div>
    );
};
