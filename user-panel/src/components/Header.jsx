import { useState } from "react";
import { FaBell, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const activeMenu = useSelector((state) => state.navigation.activeMenu);

  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:px-8">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">{activeMenu}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-slate-600 hover:bg-slate-100"
        >
          <FaBell size={19} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
          JD
        </div>
      </div>
    </header>
  );
}

export default Header;
