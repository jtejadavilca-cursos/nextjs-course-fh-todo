import { getUserFromSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";

export const getTodo = async (id: string) => {
    const userSession = await getUserFromSession();
    return await prisma.todo.findFirst({ where: { id, userId: userSession?.id } });
};
