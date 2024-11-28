"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
    icon: React.ReactNode;
    path: string;
    title: string;
}

export const SidebarItem = (props: SidebarItemProps) => {
    const { icon, path, title } = props;

    const pathName = usePathname();
    const isCurrentPath = pathName === path;

    //Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400
    return (
        <li>
            <Link
                href={path}
                className={`
                px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
                ${isCurrentPath ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400" : "hover:bg-slate-100"}
            `}
            >
                {icon}
                <span className={`${isCurrentPath ? "" : "group-hover:text-gray-700"}`}>{title}</span>
            </Link>
        </li>
    );
};
