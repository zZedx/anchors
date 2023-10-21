import { useState } from "react";
import Popup from "../components/Popup";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Loader />
      {active && <Popup setActive={setActive} />}
      <div className="px-36 py-6 flex justify-between">
        <img
          src="anchorslogo.png"
          onClick={() => navigate("/")}
          alt=""
          className="h-10 cursor-pointer"
        />
        <button
          className="px-3 rounded-full border hover:bg-white hover:text-black transition-all"
          onClick={() => setActive(true)}
        >
          <i className="fa-solid fa-phone text-sm mr-2"></i> Request a call back
        </button>
      </div>
    </>
  );
};

export default Navbar;
