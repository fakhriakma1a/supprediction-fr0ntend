import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RangeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const rangeOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

export default function RangeDropdown({ value, onChange }: RangeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-sup-gray border-sup-gray text-black font-poppins font-semibold text-xl h-10 px-6 rounded-xl flex items-center gap-3 hover:bg-gray-300"
        >
          {value}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M1.33337 4.66666L8.00004 11.3333L14.6667 4.66666"
              stroke="currentColor"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36 bg-white border border-sup-gray rounded-xl p-0 font-poppins"
      >
        {rangeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              onChange(option.label);
              setIsOpen(false);
            }}
            className="px-6 py-3 text-black font-semibold text-lg hover:bg-sup-light-gray cursor-pointer first:rounded-t-xl last:rounded-b-xl"
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
