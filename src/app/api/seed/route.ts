import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client/extension";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
    await prisma.todo.deleteMany({});
    const todo = await prisma.todo.createMany({
        data: [
            { description: "Piedra del alma", completed: true },
            { description: "Piedra del poder" },
            { description: "Piedra del tiempo" },
            { description: "Piedra del espacio" },
            { description: "Piedra del realidad" },
        ],
    });

    console.log(todo);

    return NextResponse.json({ message: "Seed executed successfully!!!" });
}
