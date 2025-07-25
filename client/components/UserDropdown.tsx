import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd clear auth tokens here
    navigate("/");
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 p-0 h-auto hover:bg-transparent"
        >
          {/* User Avatar */}
          <div className="w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 15.393C5.225 13.36 7.454 12 10 12C12.546 12 14.775 13.36 16 15.393"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {/* User Info */}
          <div className="text-left">
            <div className="font-poppins font-semibold text-sm text-black">
              John-doe (Admin)
            </div>
            <div className="font-poppins text-xs text-black">
              Settings
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-60 bg-white border border-gray-200 rounded-xl p-0 font-poppins shadow-lg"
      >
        {/* User Info Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 15.393C5.225 13.36 7.454 12 10 12C12.546 12 14.775 13.36 16 15.393"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="font-poppins font-semibold text-sm text-black">
                John-doe
              </div>
              <div className="font-poppins text-xs text-black">
                Johndoe123@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <DropdownMenuItem className="px-6 py-4 hover:bg-sup-light-gray cursor-pointer">
          <div className="flex items-center gap-3 w-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14Z"
                fill="black"
              />
              <path
                d="M10 2V3.5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.6569 4.34302L14.5959 5.40402"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 10H16.5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.6569 15.657L14.5959 14.596"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 18V16.5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.34302 15.657L5.40402 14.596"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 10H3.5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.34302 4.34302L5.40402 5.40402"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-poppins font-semibold text-lg text-black">
              Theme
            </span>
          </div>
        </DropdownMenuItem>

        {/* Logout Section */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="px-6 py-4 bg-sup-gray hover:bg-gray-300 cursor-pointer rounded-b-xl"
        >
          <div className="flex items-center gap-3 w-full">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5 6L22.5 10L18.5 14"
                stroke="black"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M14 14V17H9"
                stroke="black"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M2.722 2.517L9 7.016V22L2 17V2H14V6"
                stroke="black"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M13 10H22.5H22"
                stroke="black"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
            </svg>
            <span className="font-poppins font-semibold text-lg text-black">
              Log out
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
