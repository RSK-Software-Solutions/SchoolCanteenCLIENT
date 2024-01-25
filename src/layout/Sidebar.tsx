import { navLinks } from "@/layout/static/NavbarNavigationLinks";
import { SidebarLinks } from "@/layout/static/SidebarNavigationLinks";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { SetStateAction } from "react";
import rskLogo from "@/assets/Software-removebg-preview.png"
import { Link } from "react-router-dom";
import { LogoutButton } from "@/features/authentication/logout/LogoutButton";


type TSidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, setIsOpen }: TSidebarProps) => {
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
          <div className="flex w-full justify-center select-none">
            <Link to='/dashboard' className="flex justify-center">
              <img src={rskLogo} alt="RSK Logo" className="relative top-0 h-[200px]" />
            </Link>
            <div className="flex  justify-end">
              <div>
                <button onClick={() => setIsOpen(!isOpen)}  >
                  <X className="size-8" />
                </button>
              </div>
            </div>
          </div>
          <nav className="w-full flex justify-center flex-col gap-y-5 resize-x select-none">
            {SidebarLinks.map((sidebarStatic) => (
              <Link
                key={sidebarStatic.element}
                className="flex hover:bg-gray-300 hover:underline pl-5 py-2 text-lg"
                to={sidebarStatic.path}
              >
                {sidebarStatic.element}
              </Link>
            ))}
            {navLinks.map((mobileStatic) => (
              <Link
                key={mobileStatic.element}
                to={mobileStatic.path}
                className="flex hover:bg-gray-300  hover:underline pl-5 py-2 text-lg sm:hidden max-sm:block"
              >
                {mobileStatic.element}
              </Link>
            ))}
          </nav>
          <div className="w-full text-center">
            <LogoutButton />
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
