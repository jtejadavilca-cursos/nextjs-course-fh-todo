import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

export const getUserFromSession = async () => {
    const session = await getServerSession(authOptions);

    return session?.user;
};

export const signInEmailPassword = async (email?: string, password?: string) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    console.log("signInEmailPassword", email, password);

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        const dbUser = await createUser(email, password);
        return dbUser;
    }

    const valid = bcrypt.compareSync(password, user.password!);

    if (!valid) {
        throw new Error("Invalid password");
    }

    return user;
};

const createUser = async (email: string, password: string) => {
    const user = await prisma.user.create({
        data: {
            email,
            password: bcrypt.hashSync(password, 10),
            name: email.split("@")[0],
        },
    });

    return user;
};
