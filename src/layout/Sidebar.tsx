import { navLinks } from "@/layout/static/NavbarNavigationLinks";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { SetStateAction } from "react";
import rskLogo from "@/assets/Software-removebg-preview.png"
import { Link } from "react-router-dom";
import { LogoutButton } from "@/features/authentication/logout/LogoutButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { adminManagmentOptionsPickerData } from "./static/adminManagmentOptions";
import { warehouseData } from "./static/warehouse-naviagation";


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
          <div className="flex justify-between select-none">
            <Link to='/dashboard'
              onClick={() => setIsOpen(false)}
              className="flex justify-center">
              <img src={rskLogo} alt="RSK Logo" className="ml-5 relative h-[160px]" />
            </Link>

            <div className="text-end  justify-end">
              <button onClick={() => setIsOpen(!isOpen)}  >
                <X className="size-8" />
              </button>
            </div>

          </div>
          <nav className="w-full flex justify-center flex-col gap-y-5 resize-x select-none">
            {navLinks.map((mobileStatic) => (
              <React.Fragment key={mobileStatic.label}>
                {mobileStatic.label === "Panel admina" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Link to={''}
                        onClick={() => setIsOpen(false)}
                        className="flex hover:bg-gray-300 pl-5 py-2 text-lg sm:hidden max-sm:block">{mobileStatic.label}</Link>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {adminManagmentOptionsPickerData.map((options) => (
                        <DropdownMenuRadioItem value={options.label} key={options.label}><Link to={options.path}
                          onClick={() => setIsOpen(false)}>{options.label}</Link></DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : mobileStatic.label === "Magazyn" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Link to={''}
                        onClick={() => setIsOpen(false)}
                        className="flex hover:bg-gray-300 pl-5 py-2 text-lg sm:hidden max-sm:block">{mobileStatic.label}</Link>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {warehouseData.map((options) => (
                        <DropdownMenuRadioItem value={options.label} key={options.label}><Link to={options.path}
                          onClick={() => setIsOpen(false)}>{options.label}</Link></DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={mobileStatic.label}
                    to={mobileStatic.path}
                    onClick={() => setIsOpen(false)}
                    className="flex hover:bg-gray-300  hover:underline pl-5 py-2 text-lg sm:hidden max-sm:block"
                  >
                    {mobileStatic.label}
                  </Link>)}
              </React.Fragment>
            ))}
          </nav>
          <div className="w-full text-center">
            <LogoutButton />
          </div>
        </motion.section>
      )
      }
    </AnimatePresence >
  );
};

export default Sidebar;
