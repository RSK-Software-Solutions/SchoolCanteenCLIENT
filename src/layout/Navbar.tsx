import React, { SetStateAction } from "react";
import { Link } from "react-router-dom";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { navLinks } from "@/data/navbarStaticData/NavbarNavigationLinks";

type NavbarProps = {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ setIsOpen }: NavbarProps) => {
  return (
    <div className="h-[80px] border-b flex text-xl shadow-md">
      <div className=" flex w-full justify-between self-center">
        <div onClick={() => setIsOpen((prev: boolean) => !prev)} className="ml-5">
          <span>
            <HamburgerMenuIcon className="size-8"/>
          </span>
        </div>
        <div className="flex justify-evenly w-full self-center">
          <Link to={"/dashboard"} className="sm:hidden xl:flex">
            logo
          </Link>
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
