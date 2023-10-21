import { useState } from "react";

const Popup = ({ setActive }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !number) {
      return alert("Please fill all the fields");
    }
    alert(`Name: ${name} Mobile: ${number}`);
    setIsSubmitted(true);
  }
  return (
    <div
      className="h-screen w-screen bg-black/60 flex justify-center items-center absolute"
      onClick={() => setActive(false)}
    >
      <form
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
            />
            <input
              type="number"
              className="w-full bg-transparent border border-white/30 p-2 rounded-lg"
              placeholder="Mobile Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <button className="mt-5 font-semibold bg-white text-black px-12 py-2 rounded-full">
              Request a Call Back
            </button>
          </>
        ) : (
          <h3 className="font-semibold text-lg mb-5">
            Thank you for submitting your details. We will get back to you soon.
          </h3>
        )}
      </form>
    </div>
  );
};

export default Popup;
