"use client";

import { Todo } from "@prisma/client";
//import { useRouter } from "next/navigation";
//import * as todosApi from "@/todos/helpers";
import { toggleTodo } from "../actions/todo-actions";
import { TodoItem } from "./TodoItem";

interface TodosGridProps {
    todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: TodosGridProps) => {
    // const router = useRouter();

    // Client action:
    // const toggleTodo = async (id: string) => {
    //     const toggledTodo = await todosApi.toggleTodo(id);
    //     router.refresh();
    // };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))}
        </div>
    );
};
