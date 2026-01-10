import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b"
      >
        <div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src={assets.logo}
            alt="logo"
            className="h-8 md:h-9"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-80 mt-3"
          >
            {t("footer.description")}
          </motion.p>

          {/* Footer Left Portion */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mt-6"
          >
            <a href="">
              <img
                src={assets.facebook_logo}
                className="w-5 h-5"
                alt="facebook"
              />
            </a>
            <a href="">
              <img
                src={assets.instagram_logo}
                className="w-5 h-5"
                alt="instagram"
              />
            </a>
            <a href="">
              <img
                src={assets.twitter_logo}
                className="w-5 h-5"
                alt="twitter"
              />
            </a>
            <a href="">
              <img src={assets.gmail_logo} className="w-5 h-5" alt="gmail" />
            </a>
          </motion.div>
        </div>

        {/* Footer Right Portion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-between w-1/2 gap-8"
        >
          {/* Column-1 */}
          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">
              {t("footer.company")}
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <a href="/">{t("navbar.home")}</a>
              </li>
              <li>
                <a href="/cars">{t("navbar.cars")}</a>
              </li>
              <li>
                <a href="#">{t("banner.button")}</a>
              </li>
              <li>
                <a href="#">{t("footer.about")}</a>
              </li>
            </ul>
          </div>

          {/* Column-2 */}
          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">
              {t("footer.support")}
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <a href="#">{t("footer.contact")}</a>
              </li>
              <li>
                <a href="#">{t("footer.terms")}</a>
              </li>
              <li>
                <a href="#">{t("footer.privacy")}</a>
              </li>
              <li>
                <a href="#">{t("footer.insurance")}</a>

              </li>
            </ul>
          </div>

          {/* Column-3 */}
          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">
              {t("footer.contact")}
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <a href="#">1234 Luxury Drive</a>
              </li>
              <li>
                <a href="#">San Franciso, CA 94107</a>
              </li>
              <li>
                <a href="#">+1 234 56789</a>
              </li>
              <li>
                <a href="#">info@example.com</a>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Copyright Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
      >
        <p>© {new Date().getFullYear()} SwiftDrive. {t("footer.allRights")}</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">{t("footer.privacy")}</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">{t("footer.terms")}</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">{t("footer.cookies")}</a>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
