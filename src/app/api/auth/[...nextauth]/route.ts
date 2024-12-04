import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions";

const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        // ...add more providers here
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // const user = await prisma.user.findUnique({
                //     where: { email: credentials?.email },
                // });
                const user = await signInEmailPassword(credentials?.email, credentials?.password);

                return user ?? null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },

        async jwt({ token, user, account, profile }) {
            const dbUser = await prisma.user.findUnique({
                where: { email: token.email! },
            });

            // Here we could validate if user is active
            // if don't, we should return null or thorw an error
            // if (!dbUser?.active) {
            //     return null;
            // }

            token.roles = dbUser?.roles ?? [];
            token.id = dbUser?.id ?? "";

            return token;
        },

        async session({ session, token, user }) {
            if (session && session.user) {
                session.user.roles = token.roles;
                session.user.id = token.id;
            }
            return session;
        },

        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
