export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/components";

//import { useEffect } from "react";

export default async function ServerTodosPage() {
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
        <>
            <span className="text-3xl mb-10">Server Actions</span>
            <NewTodo />
            <TodosGrid todos={todos} />
        </>
    );
}
