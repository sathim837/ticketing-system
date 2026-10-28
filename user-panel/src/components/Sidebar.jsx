import { useState } from "react";

import {
  FaTicketAlt,
  FaTachometerAlt,
  FaPlus,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu } from "../features/navigation/navigationSlice";
import { useNavigate } from "react-router";

// import { useNavigate } from "react-router-dom";

function Sidebar() {
 const dispatch = useDispatch();
const navigate = useNavigate();

  const handleClick = (label, url) => {
    dispatch(setActiveMenu(label));
    navigate(url);
  }

  const activeMenu = useSelector(
    (state) => state.navigation.activeMenu 
  )

  // const navigate = (label) => {
  //   setActiveMenu(label);
  // };

  const menuItems = [
    { label: "Dashboard", icon: FaTachometerAlt, url: "dashboard" },
    { label: "My Tickets", icon: FaTicketAlt, url: "tickets" },
    { label: "Create Ticket", icon: FaPlus, url: "tickets/create" },
    { label: "Profile", icon: FaUser, url: "profile" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gradient-to-b from-blue-950 to-blue-900 text-white transition-transform duration-300 translate-x-0 md:translate-x-0">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-500 p-2.5">
            <FaTicketAlt size={22} />
          </div>
          <span className="text-lg font-bold">Ticketing System</span>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {menuItems.map(({ label, icon: Icon, url }) => (
          <button
            key={label}
            onClick={() => handleClick(label, url)}
            className={`flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left text-sm font-medium transition ${
              activeMenu === label
                ? "bg-blue-600 text-white shadow-lg shadow-blue-950/20"
                : "text-blue-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
            {label === "My Tickets" }
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-white/10 p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold">
          JD
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">John Doe</p>
          <p className="truncate text-xs text-blue-200">john.doe@example.com</p>
        </div>
        <button
          title="Logout"
          onClick={() => alert("Connect your logout API here.")}
          className="text-blue-200 hover:text-white"
        >
          <FaSignOutAlt size={17} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
