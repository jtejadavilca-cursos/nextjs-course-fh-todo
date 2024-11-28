"use client";

import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { TodoItem } from "./TodoItem";
import * as todosApi from "@/todos/helpers";

interface TodosGridProps {
    todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: TodosGridProps) => {
    const router = useRouter();

    const toggleTodo = async (id: string) => {
        const toggledTodo = await todosApi.toggleTodo(id);
        router.refresh();
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))}
        </div>
    );
};
