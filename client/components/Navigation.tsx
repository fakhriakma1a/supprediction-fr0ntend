import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import UserDropdown from "./UserDropdown";
import RangeDropdown from "./RangeDropdown";

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "sto-manage",
    label: "STO Manage",
    path: "/sto-manage",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 11L12 2L23 11" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M5 13V20C5 21.105 5.895 22 7 22H17C18.105 22 19 21.105 19 20V13" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
        <path d="M12 22V18" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
      </svg>
    ),
  },
  {
    id: "warehouse-manage",
    label: "Warehouse Manage",
    path: "/warehouse-manage",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 4.875L6.75 7.5L12 4.875" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M6.75 7.5V13.875" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M12 4.875L6.75 2.24925L1.5 4.875V11.25L6.75 13.875L12 11.25V4.875Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
        <path d="M12 4.875L17.25 7.5L22.5 4.875" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M17.25 7.5V13.875" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M22.5 4.875L17.25 2.24925L12 4.875V11.25L17.25 13.875L22.5 11.25V4.875Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
        <path d="M6.75 13.875L12 16.5L17.25 13.875" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M12 16.5V22.875" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M17.25 13.875L12 11.2493L6.75 13.875V20.25L12 22.875L17.25 20.25V13.875Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
      </svg>
    ),
  },
  {
    id: "input",
    label: "Input",
    path: "/input",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4.5V19.5C3 21.225 7.22325 22.5 12 22.5C16.7767 22.5 21 21.225 21 19.5V4.5" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M21 12C21 13.725 16.7767 15 12 15C7.22325 15 3 13.725 3 12" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
        <path d="M21 4.5C21 6.225 16.7767 7.5 12 7.5C7.22325 7.5 3 6.225 3 4.5C3 2.775 7.22325 1.5 12 1.5C16.7767 1.5 21 2.775 21 4.5Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
      </svg>
    ),
  },
  {
    id: "reports",
    label: "Reports",
    path: "/reports",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2H9L4 7V20C4 21.105 4.895 22 6 22H18C19.105 22 20 21.105 20 20V4C20 2.895 19.105 2 18 2Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
        <path d="M4 7H9V2" fill="currentColor"/>
        <path d="M4 7H9V2" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M13 9H16" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
        <path d="M8 13H16" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
        <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
      </svg>
    ),
  },
];

export default function Navigation() {
  const location = useLocation();
  const [selectedRange, setSelectedRange] = useState("Range");

  return (
    <header className="bg-white border-b-0">
      {/* Top Section with Brand and User */}
      <div className="flex items-center justify-between px-8 py-6">
        {/* Brand */}
        <h1 className="font-poppins text-5xl font-bold">
          <span className="text-sup-red">SUP</span>
          <span className="text-black">Prediction</span>
        </h1>

        {/* User Section */}
        <div className="flex items-center gap-4">
          <RangeDropdown 
            value={selectedRange} 
            onChange={setSelectedRange}
          />
          <UserDropdown />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mx-8 mb-6">
        <div className="flex items-center justify-center bg-white border-4 border-sup-gray rounded-[40px] p-2 h-[88px]">
          <div className="flex items-center gap-8">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <div key={item.id} className="flex flex-col items-center">
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center gap-2 px-4 py-2 rounded-lg transition-colors group ${
                      isActive 
                        ? "text-sup-red" 
                        : "text-black hover:text-sup-red"
                    }`}
                  >
                    <div className={`${isActive ? "text-sup-red" : "text-black group-hover:text-sup-red"}`}>
                      {item.icon}
                    </div>
                    <span className="font-poppins font-semibold text-base text-center leading-tight">
                      {item.label}
                    </span>
                  </Link>
                  {/* Active indicator line */}
                  {isActive && (
                    <div className="w-full h-1 bg-sup-red rounded-t-lg mt-2"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
