import prisma from "@/lib/prisma";

export const getTodo = async (id: string) => {
    return await prisma.todo.findFirst({ where: { id } });
};
