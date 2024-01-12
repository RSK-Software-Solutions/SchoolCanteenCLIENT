import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "./NavbarLinks";
import { AlignJustify } from "lucide-react";

const Navbar = ({ setIsOpen }) => {
  const handleMenuToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="h-[80px] border-b flex text-xl shadow-md">
      <div className=" flex w-full justify-between self-center">
        <div onClick={handleMenuToggle} className="ml-5">
          <span>
            <AlignJustify size={30} />
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
