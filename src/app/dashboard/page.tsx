import { WidgetItem } from "@/components";

export const metadata = {
    title: "Dashboard Page",
    description: "Dashboard",
};

export default function DashboardPage() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* TODO: src/components <WidgetItem /> */}
            <WidgetItem />
            {/* TODO: Fin <WidgetItem /> */}
        </div>
    );
}
