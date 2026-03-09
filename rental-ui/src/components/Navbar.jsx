import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner, search, setSearch } =
    useAppContext();
  const { t } = useTranslation();

  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between px-6 md:px-10 lg:px-16 xl:px-24 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
        location.pathname === "/" && "bg-light"
      }`}
    >
      <Link to="/" className="flex-shrink-0">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt="logo"
          className="h-8"
        />
      </Link>

      <div
        className={`max-lg:fixed max-lg:h-screen max-lg:w-full max-lg:top-16 max-lg:border-t border-borderColor right-0 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 max-lg:p-6 max-lg:pb-24 max-lg:overflow-y-auto transition-all duration-300 z-50 ${
          location.pathname === "/" ? "bg-light" : "bg-white"
        } ${open ? "max-lg:translate-x-0" : "max-lg:translate-x-full"}`}
      >
        {menuLinks.map((link, idx) => {
          const linkNameMap = {
            "Home": "home",
            "Cars": "cars",
            "My Bookings": "myBookings"
          };
          const translationKey = linkNameMap[link.name] || link.name.toLowerCase();
          return (
            <Link key={idx} to={link.path} className="font-medium hover:text-primary transition-colors">
              {t(`navbar.${translationKey}`)}
            </Link>
          );
        })}

        <div className="hidden xl:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (location.pathname !== "/cars") navigate("/cars");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && location.pathname !== "/cars") {
                navigate("/cars");
              }
            }}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder={t("navbar.searchPlaceholder")}
          />
          <img src={assets.search_icon} alt="search" className="cursor-pointer" onClick={() => navigate("/cars")} />
        </div>

        <div className="flex max-lg:flex-col items-start lg:items-center gap-6">
          <button
            onClick={() => {
              isOwner ? navigate("/owner") : changeRole();
            }}
            className="cursor-pointer font-medium hover:text-primary transition-colors"
          >
            {isOwner ? t("navbar.dashboard") : t("navbar.listCars")}
          </button>
          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg font-medium"
          >
            {user ? t("navbar.logout") : t("navbar.login")}
          </button>
          <LanguageSwitcher />
        </div>
      </div>

      <button
        className="lg:hidden cursor-pointer"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </motion.div>
  );
};

export default Navbar;
