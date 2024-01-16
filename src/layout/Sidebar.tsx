import { navLinks } from "@/data/navbarStaticData/NavbarNavigationLinks";
import { SidebarLinks } from "@/data/sidebarStaticData/SidebarNavigationLinks";
import { AnimatePresence, motion } from "framer-motion";
import { X, Link } from "lucide-react";
import React, { SetStateAction } from "react";


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
          <div className="flex w-full justify-end">
            <button onClick={() => setIsOpen(!isOpen)}>
              <X className="size-8" />
            </button>
          </div>
          <nav className="w-full flex justify-center flex-col gap-y-5 resize-x">
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
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
