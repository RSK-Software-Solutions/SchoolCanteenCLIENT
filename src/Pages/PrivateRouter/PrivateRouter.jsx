import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";

const PrivateRoutes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useContext(AuthContext);
  if (!isAuthenticated.token) {
    navigate("/login");
  }
  return (
    <div>
      <Navbar setIsOpen={setIsOpen} />
      <div className="flex w-full">
        <Sidebar isOpen={isOpen} />
        <div className="flex w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PrivateRoutes;
