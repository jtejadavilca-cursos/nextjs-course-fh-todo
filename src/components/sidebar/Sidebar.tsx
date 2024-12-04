import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiViewBoard, CiBoxList, CiBookmarkCheck, CiLogout, CiUser } from "react-icons/ci";
import { LiaCookieSolid } from "react-icons/lia";
import { LogoutButton, SidebarItem } from "..";
import { IoBasketOutline } from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const menuItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <CiViewBoard size={30} />,
    },
    {
        title: "Profile",
        path: "/dashboard/profile",
        icon: <CiUser size={30} />,
    },
    {
        title: "Rest TODOS",
        path: "/dashboard/rest-todos",
        icon: <CiBookmarkCheck size={30} />,
    },
    {
        title: "Server Actions",
        path: "/dashboard/server-todos",
        icon: <CiBoxList size={30} />,
    },
    {
        title: "Cookies",
        path: "/dashboard/cookies",
        icon: <LiaCookieSolid size={30} />,
    },
    {
        title: "Products",
        path: "/dashboard/products",
        icon: <IoBasketOutline size={30} />,
    },
];

export const Sidebar = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const userAvatar = session.user?.image
        ? session.user?.image
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgkz_uaSVvag22Ob_fxwRAIMZNPVkZcVF6g&s";

    const userName = session.user?.name ?? "Unknown";
    const useRoles = session.user?.roles ?? [];

    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="-mx-6 px-6 py-4">
                    {/* TODO: Next/Link hacia dashboard */}
                    <Link href="#" title="home">
                        {/* Next/Image */}
                        <Image
                            width={200}
                            height={200}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RDEtPGvqNOxsei62fAUnKqBZkR5tyrOilA&s"
                            className="w-24"
                            alt="tailus logo"
                        />
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    {/* Next/Image */}
                    <Image
                        width={200}
                        height={200}
                        src={userAvatar}
                        alt="User image"
                        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                    />
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
                    <span className="hidden text-gray-400 lg:block">
                        {useRoles.length > 0
                            ? useRoles.map((r) => r.at(0)?.toLocaleUpperCase() + r.slice(1)).join(", ")
                            : "No roles"}
                    </span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {menuItems.map((item, index) => (
                        <SidebarItem key={index} {...item} />
                    ))}
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <LogoutButton />
            </div>
        </aside>
    );
};
