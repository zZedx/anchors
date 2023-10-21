import { useState } from "react";
import Popup from "../components/Popup";

const Navbar = () => {
  const [active, setActive] = useState(false);
  return (
    <>
    {active && <Popup setActive={setActive}/>}
    <div className="px-36 py-6 flex justify-between">
      <img src="anchorslogo.png" alt="" className="h-10"/>
      <button className="px-3 rounded-full border" onClick={()=> setActive(true)}>Request a call back</button>
    </div>
    </>
  );
};

export default Navbar;
