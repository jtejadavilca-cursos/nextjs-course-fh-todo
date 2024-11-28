import { Todo } from "@prisma/client";

const sleep = (seconds: number = 0) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export interface ToggledTodo {
    id: string;
    description: string;
    completed: boolean;
}

export const toggleTodo = async (id: string): Promise<ToggledTodo> => {
    await sleep(2);
    const todo = await fetch(`/api/todos/${id}/toggle`, {
        method: "PATCH",
    }).then((response) => response.json());

    return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
    await sleep(2);
    const todo = await fetch(`/api/todos`, {
        method: "POST",
        body: JSON.stringify({ description }),
    }).then((response) => response.json());

    return todo;
};

export const deleteCompleted = async (): Promise<void> => {
    await sleep(2);
    await fetch(`/api/todos/completed`, {
        method: "DELETE",
    });
};
