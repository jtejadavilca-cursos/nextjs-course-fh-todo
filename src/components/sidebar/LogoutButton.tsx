"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoHourglassOutline } from "react-icons/io5";

export const LogoutButton = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <IoHourglassOutline />
                <span className="group-hover:text-gray-700">Espere...</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
        >
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
        </button>
    );
};
