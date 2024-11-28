import prisma from "@/lib/prisma";
import * as yup from "yup";
import { NextResponse } from "next/server";
import { getTodo } from "../helper";

interface Segments {
    params: {
        id: string;
    };
}

export async function GET(_: Request, segment: Segments) {
    const { id } = await segment.params;

    const todo = await getTodo(id);

    if (!todo) {
        return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
}

const putSchema = yup.object({
    description: yup.string().optional(),
    completed: yup.boolean().optional(),
});
export async function PUT(req: Request, segment: Segments) {
    try {
        const { id } = await segment.params;

        const todo = await getTodo(id);

        if (!todo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        }

        const { description, completed } = await putSchema.validate(await req.json(), { strict: true });

        if (!description && completed === undefined) {
            return NextResponse.json({ message: "No data to update" }, { status: 400 });
        }

        const data: any = {};
        if (description && description.trim().length > 0) {
            data["description"] = description;
        }

        if (completed !== undefined) {
            data["completed"] = completed;
        }

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data,
        });

        return NextResponse.json(updatedTodo, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: `Error: ${error.message}`, error }, { status: 400 });
    }
}
