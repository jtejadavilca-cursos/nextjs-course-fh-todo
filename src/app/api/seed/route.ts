import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client/extension";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
    await prisma.user.deleteMany({});
    await prisma.user.create({
        data: {
            email: "default@gmail.com",
            name: "Default User",
            password: bcrypt.hashSync("123456", 10),
            roles: ["admin", "user"],
            todos: {
                create: [
                    { description: "Piedra del alma", completed: true },
                    { description: "Piedra del poder" },
                    { description: "Piedra del tiempo" },
                    { description: "Piedra del espacio" },
                    { description: "Piedra del realidad" },
                ],
            },
        },
    });

    return NextResponse.json({ message: "Seed executed successfully!!!" });
}
