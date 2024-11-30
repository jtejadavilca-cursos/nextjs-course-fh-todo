export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/components";

//import { useEffect } from "react";

export const metadata = {
    title: "Rest TODOS Page",
    description: "Rest TODOS",
};

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
