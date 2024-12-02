import React from "react";

interface StarProps {
    isFilled: boolean;
}

export const Star = ({ isFilled }: StarProps) => {
    return (
        <svg
            className={`w-5 h-5 fill-current ${isFilled ? "text-yellow-300" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 1l2.6 5.8 6.2.9-4.5 4.2 1.1 6.2-5.4-3-5.4 3 1.1-6.2-4.5-4.2 6.2-.9L10 1z"
            ></path>
        </svg>
    );
};
