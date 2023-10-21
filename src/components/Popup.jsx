import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const Popup = ({ setActive }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate()

  const form = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !number) {
      return alert("Please fill all the fields");
    }
    emailjs
      .sendForm(
        "service_i6nvoir",
        "template_1n0cbmk",
        form.current,
        "aJQttG4CBb1GiKyn_"
      )
      .then(
        (result) => {
            console.log(result.text)
        },
        (error) => {
            alert(error.text);
        }
        );
        setIsSubmitted(true);
  }
  function handleClick(e){
    e.preventDefault();
    navigate('/')
    setActive(false)
  }
  return (
    <div
      className="h-screen w-screen bg-black/60 flex justify-center items-center absolute"
      onClick={() => setActive(false)}
    >
      <form
        ref={form}
        action=""
        className="bg-[#282828] px-10 py-12 flex flex-col items-center justify-center gap-4 w-96 rounded-lg"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        {!isSubmitted ? (
          <>
            {" "}
            <h3 className="font-semibold text-lg mb-5">Request a call back</h3>
            <input
              type="text"
              className="w-full bg-transparent border border-white/30 p-2 rounded-lg"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
            <input
              type="number"
              className="w-full bg-transparent border border-white/30 p-2 rounded-lg"
              placeholder="Mobile Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              name="number"
            />
            <button className="mt-5 font-semibold bg-white text-black px-12 py-2 rounded-full">
              Request a Call Back
            </button>
          </>
        ) : (<>
        <i className="fa-regular fa-circle-check text-6xl text-green-400"></i>
          <h3 className="font-semibold text-2xl mb-3">
            Request a call back
          </h3>
          <p className="text-white/60">Our Team will call you shortly in 12-24 hrs</p>
          <p className="text-white/60">Can't you wait for call?</p>
          <button onClick={handleClick} className="px-12 py-3 rounded-full mt-3 text-lg font-medium bg-orange-600">Check another video <i className="fa-solid fa-arrow-right ml-2"></i></button></>
        )}
      </form>
    </div>
  );
};

export default Popup;
