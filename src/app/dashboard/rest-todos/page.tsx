export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserFromSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/components";

//import { useEffect } from "react";

export const metadata = {
    title: "Rest TODOS Page",
    description: "Rest TODOS",
};

export default async function RestTodosPage() {
    const userSession = await getUserFromSession();

    const todos = await prisma.todo.findMany({
        where: {
            userId: userSession?.id,
        },
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
