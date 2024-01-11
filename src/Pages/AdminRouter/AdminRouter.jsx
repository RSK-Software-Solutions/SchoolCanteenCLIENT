import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminRightBar from "../../Components/AdminPanel/AdminRightBar/AdminPanelRightBar";
import AdminPanel from "../../Components/AdminPanel/AdminPanel";

const AdminRouter = () => {
  const [selected, setSelected] = useState("");

  console.log(selected);
  const navigate = useNavigate();

  const localStorageToken = localStorage.getItem("token");
  //TODO SPRAWDZ CZY JEST ADMINEM
  useEffect(() => {
    const handleAuthentication = () => {
      if (localStorageToken) {
        navigate("/login");
      }
    };
    handleAuthentication();
  }, [navigate, localStorageToken]);

  return (
    <div className="flex w-full">
      <AdminPanel selected={selected} />
      <div className="flex w-full justify-end">
        <AdminRightBar setSelected={setSelected} />
      </div>
    </div>
  );
};

export default AdminRouter;
