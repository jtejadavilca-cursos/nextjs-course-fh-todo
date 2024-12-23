import { getUserFromSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        const userSession = await getUserFromSession();
        const todos = await prisma.todo.deleteMany({
            where: {
                completed: true,
                userId: userSession?.id,
            },
        });

        return NextResponse.json(`Rows affected: ${todos.count}`, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: `Error: ${error.message}`, error }, { status: 400 });
    }
}
