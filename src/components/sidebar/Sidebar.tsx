import React, { SetStateAction } from "react";
import sidebarLinks from "./content/SidebarLinks";
import { Link } from "react-router-dom";
import { navLinks } from "../navbar/NavbarLinks";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: "just", ease: "easeInOut" }}
          className="fixed left-0 top-0 z-50 h-screen w-[250px] border-r bg-white"
        >
          <div className="flex w-full justify-end">
            <button onClick={() => setIsOpen(!isOpen)}>
              <CloseIcon fontSize="large" />
            </button>
          </div>
          <nav className="w-full flex justify-center flex-col gap-y-5 resize-x">
            {sidebarLinks.map((sidebarContent) => (
              <Link
                key={sidebarContent.main}
                className="flex hover:bg-gray-300 hover:underline pl-5 py-2 text-lg"
                to={sidebarContent.link}
              >
                {sidebarContent.main}
              </Link>
            ))}
            {navLinks.map((navOnMobile) => (
              <Link
                key={navOnMobile.element}
                to={navOnMobile.path}
                className="flex hover:bg-gray-300  hover:underline pl-5 py-2 text-lg sm:hidden max-sm:block"
              >
                {navOnMobile.element}
              </Link>
            ))}
          </nav>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
