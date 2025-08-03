import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7 bg-gray-500/20 backdrop-blur-md shadow-lg rounded-xl px-5 py-3 transition-all duration-300">
      {/* Left Side */}
      <div className="flex items-center gap-5">
        <button
          className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-transform duration-300 hover:scale-105"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        <div className="relative">
          <input
            type="search"
            placeholder="Type to search"
            className="pl-10 pr-4 py-2 w-60 md:w-80 border border-gray-300 bg-white/80 rounded-lg focus:outline-none focus:border-blue-500 shadow-inner transition-all duration-300"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <button
          onClick={toggleDarkMode}
          className="transition-transform duration-300 hover:scale-110"
        >
          {isDarkMode ? (
            <Sun className="cursor-pointer text-yellow-400" size={22} />
          ) : (
            <Moon className="cursor-pointer text-gray-500" size={22} />
          )}
        </button>

        <div className="hidden md:flex items-center gap-5">
          <div className="relative">
            <Bell
              className="cursor-pointer text-gray-500 hover:text-blue-500 transition-colors duration-300"
              size={22}
            />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-[0.2rem] text-xs font-semibold leading-none text-white bg-red-500 rounded-full shadow">
              3
            </span>
          </div>

          <hr className="h-6 border-l border-gray-300" />

          <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity duration-300">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-white font-bold shadow-inner">
              T
            </div>
            <span className="font-medium text-gray-700">Tanvir</span>
          </div>
        </div>

        <Link href="/settings">
          <Settings
            className="cursor-pointer text-gray-500 hover:text-blue-500 transition-colors duration-300"
            size={22}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
