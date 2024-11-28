import { NextResponse, NextRequest } from "next/server";
import { getTodo } from "../../helper";
import prisma from "@/lib/prisma";

interface Segments {
    params: {
        id: string;
    };
}
export async function PATCH(_: Request, segment: Segments) {
    const { id } = await segment.params;
    const todo = await getTodo(id);

    if (!todo) {
        return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { completed: !todo.completed },
    });

    const { description, completed } = updatedTodo;

    return NextResponse.json({ id, description, completed });
}
