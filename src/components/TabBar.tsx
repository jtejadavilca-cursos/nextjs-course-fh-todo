"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TabBarProps {
    currentTab?: number;
    tabOptions?: number[];
}

export const TabBar = ({ tabOptions: tabs = [1, 2, 3, 4, 5], currentTab = 1 }: TabBarProps) => {
    const router = useRouter();
    const [selected, setSelected] = useState(currentTab);

    const onTabSelected = (tab: number) => {
        setSelected(tab);
        setCookie("selectedTab", tab.toString());
        router.refresh();
    };

    return (
        <div className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${"grid-cols-" + tabs.length}`}>
            {tabs.map((tab) => (
                <div key={tab}>
                    <input
                        type="radio"
                        id={`${tab}`}
                        checked={selected == tab}
                        onChange={() => {}}
                        className="peer hidden checked"
                    />
                    <label
                        onClick={() => onTabSelected(tab)}
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                    >
                        {tab}
                    </label>
                </div>
            ))}
        </div>
    );
};
