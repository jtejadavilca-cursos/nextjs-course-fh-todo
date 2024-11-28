//"use client";

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/components";

//import { useEffect } from "react";

export default async function RestTodosPage() {
    const todos = await prisma.todo.findMany({
        orderBy: {
            description: "desc",
        },
    });

    // useEffect(() => {
    //     fetch("/api/todos")
    //         .then((response) => response.json())
    //         .then(console.log);
    // }, []);

    return (
        <div>
            <NewTodo />
            <TodosGrid todos={todos} />
        </div>
    );
}
