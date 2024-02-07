import React, { SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { navLinks } from "@/layout/static/NavbarNavigationLinks";
import rskLogo from "@/assets/Software-removebg-preview.png"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { adminManagmentOptionsPickerData } from "./static/adminManagmentOptions";
import { warehouseData } from "./static/warehouse-naviagation";
import { myAccountData } from "./static/my-accountData";
import useAuthContext from "@/context/AuthContext";
type NavbarProps = {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ setIsOpen }: NavbarProps) => {
  const user = useAuthContext();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      if (selectedOption === "wyloguj") {
        await user.clearSession();
        navigate('/login')
        // Perform any additional actions after the session is cleared
      }
    };

    handleLogout();
  }, [selectedOption, user, navigate]);

  return (
    <div className="h-[80px] border-b flex text-xl shadow-md self-center select-none">
      <div className=" flex w-full justify-between self-center">
        <div onClick={() => setIsOpen((prev: boolean) => !prev)} className="ml-5 flex self-center">
          <span className="flex sm:hidden">
            <HamburgerMenuIcon className="size-8" />
          </span>
        </div>
        <div className="flex justify-evenly w-full self-center">
          <Link to={"/dashboard"} onClick={() => setIsOpen(false)}>
            <img src={rskLogo} alt="RSK Logo" className="self-center h-[160px] mt-4" />
          </Link>
          {navLinks.map((el) => (
            <div key={el.path} className="sm:flex hidden">
              <div className="flex self-center">
                <nav>
                  {el.label === "Panel admina" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Link to={''}
                          onClick={() => setIsOpen(false)}>{el.label}</Link>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        {adminManagmentOptionsPickerData.map((options) => (
                          <DropdownMenuRadioItem key={options.label} value={options.label}><Link to={options.path} onClick={() => setIsOpen(false)}>{options.label}</Link></DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : el.label === "Magazyn" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Link to={''}
                          onClick={() => setIsOpen(false)}>{el.label}</Link>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        {warehouseData.map((options) => (
                          <DropdownMenuRadioItem key={options.label} value={options.label}><Link to={options.path} onClick={() => setIsOpen(false)}>{options.label}</Link></DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : el.label === "Moje Konto" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Link to={''}
                          onClick={() => setIsOpen(false)}>{el.label}</Link>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        {myAccountData.map((options) => (
                          <React.Fragment key={options.label}>
                            <DropdownMenuRadioItem value={options.label} onClick={() => setSelectedOption(options.label)}><Link to={options.path} onClick={() => setIsOpen(false)}>{options.label}</Link></DropdownMenuRadioItem>
                          </React.Fragment>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) :
                    (
                      <Link to={el.path}>{el.label}</Link>
                    )}
                </nav>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default Navbar;
