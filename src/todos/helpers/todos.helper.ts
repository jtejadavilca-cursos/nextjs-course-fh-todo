import { Todo } from "@prisma/client";

export interface ToggledTodo {
    id: string;
    description: string;
    completed: boolean;
}

export const toggleTodo = async (id: string): Promise<ToggledTodo> => {
    const todo = await fetch(`/api/todos/${id}/toggle`, {
        method: "PATCH",
    }).then((response) => response.json());

    return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
    const todo = await fetch(`/api/todos`, {
        method: "POST",
        body: JSON.stringify({ description }),
    }).then((response) => response.json());

    return todo;
};
