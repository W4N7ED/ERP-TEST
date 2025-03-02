
import React from "react";

interface MemoryIconProps {
  size: number;
}

const Memory: React.FC<MemoryIconProps> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 19v2"></path>
      <path d="M10 19v2"></path>
      <path d="M14 19v2"></path>
      <path d="M18 19v2"></path>
      <path d="M8 13v-2"></path>
      <path d="M16 13v-2"></path>
      <path d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5z"></path>
      <path d="M7 9h10"></path>
      <path d="M7 17h10"></path>
    </svg>
  );
};

export default Memory;
