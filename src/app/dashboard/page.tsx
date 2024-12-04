import { getServerSession } from "next-auth";
import { WidgetItem } from "@/components";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";

export const metadata = {
    title: "Dashboard Page",
    description: "Dashboard",
};

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }
    const userAvatar = session.user?.image
        ? session.user?.image
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgkz_uaSVvag22Ob_fxwRAIMZNPVkZcVF6g&s";

    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* TODO: src/components <WidgetItem /> */}
            <WidgetItem title="Usuario conectado">
                <div className="mt-2 flex flex-col items-center gap-4">
                    <h4 className="text-3xl font-bold text-gray-700">{session.user?.name}</h4>
                    <Image alt="User image" src={userAvatar} width={200} height={200} className="rounded-full" />
                </div>
                <span className="font-bold text-center text-gray-500">{session.user?.email}</span>
                <span>{JSON.stringify(session, null, 3)}</span>
            </WidgetItem>
            {/* TODO: Fin <WidgetItem /> */}
        </div>
    );
}
