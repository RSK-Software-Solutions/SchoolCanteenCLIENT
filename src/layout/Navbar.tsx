import React, { SetStateAction } from "react";
import { Link } from "react-router-dom";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { navLinks } from "@/data/navbarStaticData/NavbarNavigationLinks";
import rskLogo from "@/assets/Software-removebg-preview.png"
type NavbarProps = {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ setIsOpen }: NavbarProps) => {
  return (
    <div className="h-[80px] border-b flex text-xl shadow-md self-center select-none">
      <div className=" flex w-full justify-between self-center">
        <div onClick={() => setIsOpen((prev: boolean) => !prev)} className="ml-5 flex self-center">
          <span>
            <HamburgerMenuIcon className="size-8" />
          </span>
        </div>
        <div className="flex justify-evenly w-full self-center">
          <div className="sm:hidden xl:flex">
            <Link to={"/dashboard"}>
              <img src={rskLogo} alt="RSK Logo" className="self-center h-[160px] mt-4" />
            </Link>
          </div>
          {navLinks.map((el) => (
            <div key={el.path} className="sm:flex hidden">
              <div className="flex self-center">
                <Link to={el.path}>{el.element}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
