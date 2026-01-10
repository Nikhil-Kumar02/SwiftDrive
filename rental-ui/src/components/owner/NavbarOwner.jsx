import React from "react";
import { useTranslation } from 'react-i18next';
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const {user} = useAppContext();
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
      <Link to="/">
        <img src={assets.logo} alt="" className="h-7" />
      </Link>
      <p>{t('owner.welcome')}, {user?.name || t('owner.ownerLabel')}</p>
    </div>
  );
};

export default NavbarOwner;
