import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/BILETICK.svg";
import { navbarItems } from "../static/index";
import { FaRegMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [dark, setDark] = useState(localStorage.getItem("dark-mode") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (dark === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark-mode", dark);
  }, [dark]);

  const handleDarkMode = () => {
    setDark((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="header__container mx-auto flex h-[80px] justify-between items-center p-4 relative">
      <NavLink to={"/"} className="text-2xl font-medium flex items-center gap-2">
        <img src={logo} alt="Logo" />
      </NavLink>

      <div className="hidden sm:flex items-center gap-8">
        {navbarItems?.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors duration-200 ${isActive ? "text-primary" : "text-[#A1A1A1]"
              }`
            }
          >
            <div className="flex flex-col gap-[6px] items-center">
              <item.icon className="min-h-6 min-w-6" />
              <p className="font-medium text-[12px]">{item.name}</p>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="cursor-pointer text-2xl" onClick={handleDarkMode}>
          {dark === "light" ? <FaRegMoon /> : <BsSun />}
        </button>

        <button onClick={toggleMenu} className="flex sm:hidden text-2xl">
          {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-[#0000007b] bg-opacity-50 transition-opacity ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={toggleMenu}
      >
        <div
          className={`fixed top-0 right-0 w-[200px] h-full bg-white dark:bg-slate-950 shadow-lg transform transition-transform ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end p-4">
            <IoClose className="text-2xl cursor-pointer" onClick={toggleMenu} />
          </div>
          <nav className="flex flex-col items-start gap-7 p-4">
            {navbarItems?.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-black dark:text-gray-300 py-2 px-3 rounded-lg hover:text-red-400 transition ${isActive ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                <item.icon className="text-xl" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
