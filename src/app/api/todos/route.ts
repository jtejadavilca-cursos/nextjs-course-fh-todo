import prisma from "@/lib/prisma";
import * as yup from "yup";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const take = searchParams.get("take") || "10";
    const skip = searchParams.get("skip") || "0";

    if (isNaN(+take)) {
        return NextResponse.json({ message: "The query param 'take' must be a number" }, { status: 400 });
    }

    if (isNaN(+skip)) {
        return NextResponse.json({ message: "The query param 'skip' must be a number" }, { status: 400 });
    }

    const todos = await prisma.todo.findMany({
        take: +take,
        skip: +skip,
    });

    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().required(),
    completed: yup.boolean().optional().default(false), //! TODO: mostrar algo luego...
});
export async function POST(req: Request) {
    try {
        const data = await postSchema.validate(await req.json(), { strict: true });

        const todo = await prisma.todo.create({ data });

        return NextResponse.json(todo, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: `Error: ${error.message}`, error }, { status: 400 });
    }
}

const deleteSchema = yup.object({
    ids: yup.array().of(yup.string()).required(),
});
export async function DELETE(req: Request) {
    try {
        const data = await deleteSchema.validate(await req.json(), { strict: true });
        const ids = data.ids.filter((id: string | undefined) => id != undefined);

        const todos = await prisma.todo.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        return NextResponse.json(`Rows affected: ${todos.count}`, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: `Error: ${error.message}`, error }, { status: 400 });
    }
}
