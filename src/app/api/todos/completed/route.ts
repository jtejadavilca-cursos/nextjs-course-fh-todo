import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        const todos = await prisma.todo.deleteMany({
            where: {
                completed: true,
            },
        });

        return NextResponse.json(`Rows affected: ${todos.count}`, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: `Error: ${error.message}`, error }, { status: 400 });
    }
}
