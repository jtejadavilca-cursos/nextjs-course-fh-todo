"use server";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (id: string): Promise<Todo> => {
    const todo = await prisma.todo.findUnique({
        where: {
            id,
        },
    });

    if (!todo) {
        throw new Error("Todo not found");
    }

    const updatedTodo = prisma.todo.update({
        where: { id },
        data: { completed: !todo.completed },
    });

    revalidatePath("/dashboard/server-todos");

    return updatedTodo;
};

export const addTodo = async (description: string): Promise<Todo> => {
    const todo = await prisma.todo.create({
        data: {
            description,
        },
    });

    revalidatePath("/dashboard/server-todos");

    return todo;
};

export const deleteCompletedTodos = async (): Promise<void> => {
    if (!(await hasCompletedTodos())) {
        return;
    }
    await prisma.todo.deleteMany({
        where: {
            completed: true,
        },
    });

    revalidatePath("/dashboard/server-todos");
};

export const hasCompletedTodos = async (): Promise<boolean> => {
    const completed = await prisma.todo.findFirst({
        where: {
            completed: true,
        },
    });

    return !!completed;
};
